import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const records = JSON.parse(await readFile(new URL("outputs/1180-import/prepared-1180-records.json", root), "utf8"));
const envText = await readFile(new URL(".env", root), "utf8");
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trim().startsWith("#") && line.includes("="))
    .map((line) => {
      const separator = line.indexOf("=");
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    })
);

const apiUrl = (env.BASEROW_API_URL || "https://api.baserow.io").replace(/\/$/, "");
const token = env.BASEROW_TOKEN;
const tables = {
  install: env.BASEROW_INSTALL_BASE_TABLE_ID,
  product: env.BASEROW_PRODUCT_TABLE_ID,
  customer: env.BASEROW_CUSTOMER_TABLE_ID,
  partner: env.BASEROW_SALES_PARTNER_TABLE_ID
};

if (!token || Object.values(tables).some((value) => !value)) {
  throw new Error("Missing Baserow token or table IDs in .env");
}

function normalized(value) {
  return String(value ?? "").trim();
}

function normalizeModelKey(value) {
  return normalized(value).toLowerCase().replace(/\s+/g, "").replace(/-/g, "");
}

async function request(path, options = {}) {
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Token ${token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    }
  });
  if (!response.ok) {
    throw new Error(`Baserow request failed ${response.status}: ${(await response.text()).slice(0, 500)}`);
  }
  return response.status === 204 ? null : response.json();
}

async function rows(tableId) {
  const output = [];
  let path = `/api/database/rows/table/${tableId}/?user_field_names=true&size=200`;
  while (path) {
    const page = await request(path);
    output.push(...(page.results || []));
    path = page.next ? `${new URL(page.next).pathname}${new URL(page.next).search}` : "";
  }
  return output;
}

async function createRow(tableId, row) {
  return request(`/api/database/rows/table/${tableId}/?user_field_names=true`, {
    method: "POST",
    body: JSON.stringify(row)
  });
}

async function updateRow(tableId, rowId, row) {
  return request(`/api/database/rows/table/${tableId}/${rowId}/?user_field_names=true`, {
    method: "PATCH",
    body: JSON.stringify(row)
  });
}

async function deleteRow(tableId, rowId) {
  return request(`/api/database/rows/table/${tableId}/${rowId}/`, { method: "DELETE" });
}

async function loadMaps() {
  const [products, customers, partners] = await Promise.all([
    rows(tables.product),
    rows(tables.customer),
    rows(tables.partner)
  ]);
  return {
    productsByModel: new Map(products.map((row) => [normalizeModelKey(row.Product_Model), row])),
    customersByName: new Map(customers.map((row) => [normalized(row.End_Customer).toLowerCase(), row])),
    partnersByName: new Map(partners.map((row) => [normalized(row.Name).toLowerCase(), row]))
  };
}

async function findOrCreateProduct(record, maps) {
  const model = record.productModel || "缺省";
  const key = normalizeModelKey(model);
  if (maps.productsByModel.has(key)) return maps.productsByModel.get(key);
  const row = await createRow(tables.product, {
    Product_ID: `AUTO-MAGNUS-${model}-${Date.now()}`,
    Product_Line: "SWP / OT",
    Product_Family: "Magnus",
    Product_Model: model,
    Standard_Config: "",
    Remarks: "1180 user list import 0401"
  });
  maps.productsByModel.set(key, row);
  return row;
}

async function findOrCreateCustomer(record, maps) {
  const key = normalized(record.terminalUser).toLowerCase();
  const existing = maps.customersByName.get(key);
  const payload = {
    End_Customer: record.terminalUser,
    Province: record.installProvince,
    City: record.installCity,
    Remarks: "1180 user list import 0401"
  };
  if (existing) {
    const needsUpdate = normalized(existing.Province) !== record.installProvince
      || normalized(existing.City) !== record.installCity;
    if (needsUpdate) {
      const updated = await updateRow(tables.customer, existing.id, payload);
      maps.customersByName.set(key, updated);
      return updated;
    }
    return existing;
  }
  const row = await createRow(tables.customer, {
    Customer_ID: `AUTO-CUST-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...payload
  });
  maps.customersByName.set(key, row);
  return row;
}

async function findOrCreatePartner(record, maps) {
  const name = record.salesName || "未填写销售";
  const key = normalized(name).toLowerCase();
  const existing = maps.partnersByName.get(key);
  if (existing) return existing;
  const row = await createRow(tables.partner, {
    Party_ID: `AUTO-PARTNER-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    Name: name,
    Type: "Sales / Channel Partner",
    Province: record.installProvince,
    Remarks: "1180 user list import 0401"
  });
  maps.partnersByName.set(key, row);
  return row;
}

const existingInstallRows = await rows(tables.install);
const old1180Rows = existingInstallRows.filter((row) => {
  const serial = normalized(row.Serial_No);
  const remarks = normalized(row.Remarks);
  return serial.startsWith("1180-0401-") || remarks.includes("TEST_DATA_1180");
});

for (const row of old1180Rows) {
  await deleteRow(tables.install, row.id);
}

const maps = await loadMaps();
let imported = 0;

for (const record of records) {
  const [product, customer, partner] = await Promise.all([
    findOrCreateProduct(record, maps),
    findOrCreateCustomer(record, maps),
    findOrCreatePartner(record, maps)
  ]);

  await createRow(tables.install, {
    Serial_No: record.serialNo,
    Product_Family: "Magnus",
    Product_Model: [product.id],
    Product_Config: record.configDescription || "",
    Quantity: Number(record.quantity) || 1,
    Sales: [partner.id],
    End_Customer: [customer.id],
    Channel_Partner: [partner.id],
    Order_Date: record.salesDate || null,
    Installation_Date: record.installDate || null,
    Warranty_Months: "24",
    Warranty_Expiry_Date: record.warrantyExpireDate || null,
    Project_Source: "Dashboard Excel Import",
    Remarks: `TEST_DATA_1180 | SOURCE_1180_0401 | source row ${record.sourceRow}`
  });

  imported += 1;
  if (imported % 50 === 0) {
    console.log(`Imported ${imported}/${records.length}`);
  }
}

console.log(JSON.stringify({
  deletedOld1180Rows: old1180Rows.length,
  importedRows: imported,
  importedQuantity: records.reduce((sum, record) => sum + (Number(record.quantity) || 0), 0)
}));
