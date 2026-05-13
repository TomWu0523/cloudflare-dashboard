import { clearSessionCookie, jsonResponse, readSessionUser } from "./_auth.js";

const dashboardImportSource = "Dashboard Excel Import";

const provinceNameMap = {
  Shanghai: "上海市",
  Zhejiang: "浙江省",
  Jiangsu: "江苏省",
  Guangdong: "广东省",
  Sichuan: "四川省",
  Hubei: "湖北省",
  Hunan: "湖南省",
  Chongqing: "重庆市",
  Fujian: "福建省",
  Anhui: "安徽省",
  Guangxi: "广西壮族自治区",
  Yunnan: "云南省",
  Guizhou: "贵州省",
  Jiangxi: "江西省",
  Hainan: "海南省",
  Beijing: "北京市",
  Tianjin: "天津市",
  Hebei: "河北省",
  Shanxi: "山西省",
  "Inner Mongolia": "内蒙古自治区",
  Liaoning: "辽宁省",
  Jilin: "吉林省",
  Heilongjiang: "黑龙江省",
  Shandong: "山东省",
  Henan: "河南省",
  Tibet: "西藏自治区",
  Shaanxi: "陕西省",
  Gansu: "甘肃省",
  Qinghai: "青海省",
  Ningxia: "宁夏回族自治区",
  Xinjiang: "新疆维吾尔自治区"
};

const provinceCoordinates = {
  "上海市": [121.47, 31.23],
  "浙江省": [120.15, 30.28],
  "江苏省": [118.76, 32.06],
  "广东省": [113.27, 23.13],
  "四川省": [104.06, 30.67],
  "湖北省": [114.3, 30.59],
  "湖南省": [112.98, 28.19],
  "重庆市": [106.55, 29.56],
  "福建省": [119.3, 26.08],
  "安徽省": [117.28, 31.86],
  "广西壮族自治区": [108.32, 22.82],
  "云南省": [102.71, 25.04],
  "贵州省": [106.71, 26.58],
  "江西省": [115.86, 28.68],
  "海南省": [110.35, 20.02],
  "北京市": [116.41, 39.9],
  "天津市": [117.2, 39.12],
  "河北省": [114.48, 38.03],
  "山西省": [112.53, 37.87],
  "内蒙古自治区": [111.67, 40.82],
  "辽宁省": [123.43, 41.8],
  "吉林省": [125.32, 43.9],
  "黑龙江省": [126.63, 45.75],
  "山东省": [117, 36.65],
  "河南省": [113.62, 34.75],
  "西藏自治区": [91.13, 29.65],
  "陕西省": [108.94, 34.34],
  "甘肃省": [103.82, 36.06],
  "青海省": [101.78, 36.62],
  "宁夏回族自治区": [106.27, 38.47],
  "新疆维吾尔自治区": [87.62, 43.82]
};

function baserowConfig(env) {
  return {
    apiUrl: (env.BASEROW_API_URL || "https://api.baserow.io").replace(/\/$/, ""),
    token: env.BASEROW_TOKEN || "",
    installBaseTableId: env.BASEROW_INSTALL_BASE_TABLE_ID || "",
    productTableId: env.BASEROW_PRODUCT_TABLE_ID || "",
    customerTableId: env.BASEROW_CUSTOMER_TABLE_ID || "",
    salesPartnerTableId: env.BASEROW_SALES_PARTNER_TABLE_ID || ""
  };
}

async function baserowRequest(env, path, options = {}) {
  const config = baserowConfig(env);
  if (!config.token) {
    throw new Error("Baserow token is not configured");
  }

  const response = await fetch(`${config.apiUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Token ${config.token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(`Baserow request failed ${response.status}: ${(await response.text()).slice(0, 240)}`);
  }

  return response.status === 204 ? null : response.json();
}

async function baserowRows(env, tableId) {
  const { apiUrl } = baserowConfig(env);
  const rows = [];
  let nextPath = `/api/database/rows/table/${tableId}/?user_field_names=true&size=200`;

  while (nextPath) {
    const page = await baserowRequest(env, nextPath);
    rows.push(...(page.results || []));
    nextPath = page.next ? `${new URL(page.next, apiUrl).pathname}${new URL(page.next, apiUrl).search}` : "";
  }

  return rows;
}

async function baserowFieldNames(env, tableId) {
  const fields = await baserowRequest(env, `/api/database/fields/table/${tableId}/`);
  return new Set((fields || []).map((field) => field.name));
}

function payloadForFields(payload, fieldNames) {
  if (!fieldNames?.size) return payload;
  return Object.fromEntries(Object.entries(payload).filter(([key]) => fieldNames.has(key)));
}

async function baserowCreateRow(env, tableId, row) {
  return baserowRequest(env, `/api/database/rows/table/${tableId}/?user_field_names=true`, {
    method: "POST",
    body: JSON.stringify(row)
  });
}

async function baserowUpdateRow(env, tableId, rowId, row) {
  return baserowRequest(env, `/api/database/rows/table/${tableId}/${rowId}/?user_field_names=true`, {
    method: "PATCH",
    body: JSON.stringify(row)
  });
}

function normalizedText(value) {
  return String(value ?? "").trim();
}

function normalizeModelKey(value) {
  return normalizedText(value).toLowerCase().replace(/\s+/g, "").replace(/-/g, "");
}

function canonicalProvince(value) {
  const text = normalizedText(value);
  return provinceNameMap[text] || text;
}

function isoDate(value) {
  if (!value) return "";
  return String(value).slice(0, 10);
}

function firstLinkedId(value) {
  return Array.isArray(value) ? value[0]?.id : null;
}

function firstLinkedName(value) {
  if (Array.isArray(value)) {
    return value[0]?.value || value[0]?.name || "";
  }
  return value?.value || value || "";
}

function selectedValue(value) {
  return value?.value || value || "";
}

function productKeyFromText(...values) {
  const text = values.map((value) => normalizedText(value).toLowerCase()).join(" ");
  if (/funnel|win.?rate|赢率/.test(text)) return "magnus2026Funnel";
  if (/tegris|tigers|voip|classic/.test(text)) return "tegris";
  if (/1180|magnus|\bb[0-5]\b/.test(text)) return "magnus1180";
  if (/ic|mic|s600|novito|s8666|sterilizer|steriliser/.test(text)) return "icMic";
  return "";
}

function lineKeyForRecord(record) {
  const model = normalizeModelKey(record.productModel);
  if (record.productKey === "magnus2026Funnel") {
    const rate = normalizedText(record.winRate || record.productModel).match(/20|40|60|80|100/)?.[0];
    return rate ? `funnel${rate}` : "";
  }
  if (record.productKey === "tegris") {
    if (model.includes("voip")) return "voip";
    if (model.includes("classic")) return "classic";
    if (model.includes("tiger")) return "tigers";
  }
  if (record.productKey === "icMic") {
    if (model.includes("s600")) return "s600";
    if (model.includes("novito")) return "novito";
  }
  if (record.productKey === "magnus1180") {
    const match = model.match(/b[0-5]/);
    return match ? match[0] : "";
  }
  return "";
}

function stableKeyPart(value) {
  return normalizedText(value)
    .toUpperCase()
    .replace(/[^A-Z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 36);
}

function serialForRecord(record) {
  if (record.serialNo) return normalizedText(record.serialNo);
  return [
    "DASH",
    stableKeyPart(record.productKey),
    stableKeyPart(record.productModel),
    stableKeyPart(record.terminalUser),
    stableKeyPart(record.installDate || record.salesDate || "NO-DATE"),
    stableKeyPart(record.channelName)
  ].filter(Boolean).join("-");
}

function testDataMarker(productKey) {
  if (productKey === "magnus1180") return "TEST_DATA_1180";
  if (productKey === "magnus2026Funnel") return "FUNNEL_2026_MAGNUS";
  if (productKey === "icMic") return "TEST_DATA_IC_MIC";
  return "";
}

function recordDate(record, dashboard = {}) {
  if (dashboard.dateBasis === "order") return record.salesDate || record.installDate || "";
  return record.installDate || record.salesDate || "";
}

async function masterMaps(env) {
  const config = baserowConfig(env);
  const [products, customers, partners] = await Promise.all([
    baserowRows(env, config.productTableId),
    baserowRows(env, config.customerTableId),
    baserowRows(env, config.salesPartnerTableId)
  ]);

  return {
    productsById: new Map(products.map((row) => [row.id, row])),
    productsByName: new Map(products.map((row) => [normalizeModelKey(row.Product_Model), row])),
    customersById: new Map(customers.map((row) => [row.id, row])),
    customersByName: new Map(customers.map((row) => [normalizedText(row.End_Customer).toLowerCase(), row])),
    partnersById: new Map(partners.map((row) => [row.id, row])),
    partnersByName: new Map(partners.map((row) => [normalizedText(row.Name).toLowerCase(), row]))
  };
}

function sumRecords(records) {
  return records.reduce((sum, record) => sum + (Number(record.quantity) || 0), 0);
}

function topGrouped(records, keyGetter, provinceGetter) {
  const map = new Map();
  records.forEach((record) => {
    const key = keyGetter(record);
    if (!key) return;
    const item = map.get(key) || { name: key, province: provinceGetter(record), value: 0 };
    item.value += Number(record.quantity) || 0;
    map.set(key, item);
  });
  return [...map.values()].sort((a, b) => b.value - a.value).slice(0, 8);
}

function dateValue(record, dashboard = {}) {
  return new Date(recordDate(record, dashboard) || "1970-01-01").getTime();
}

function provinceData(records, dashboard = {}) {
  const map = new Map();
  records.forEach((record) => {
    const province = canonicalProvince(record.installProvince);
    if (!province) return;
    const item = map.get(province) || {
      name: province,
      value: 0,
      latestSite: record.terminalUser,
      latestDate: recordDate(record, dashboard),
      coord: provinceCoordinates[province] || [104.2, 35.8],
      latestTime: 0
    };
    item.value += Number(record.quantity) || 0;
    const time = dateValue(record, dashboard);
    if (time >= item.latestTime) {
      item.latestSite = record.terminalUser;
      item.latestDate = recordDate(record, dashboard);
      item.latestTime = time;
    }
    map.set(province, item);
  });
  return [...map.values()].sort((a, b) => b.value - a.value).map(({ latestTime, ...item }) => item);
}

function latestUpdates(records, dashboard = {}) {
  return [...records].sort((a, b) => dateValue(b, dashboard) - dateValue(a, dashboard)).slice(0, 6).map((record) => ({
    date: (recordDate(record, dashboard) || "--").slice(5) || "--",
    status: dashboard.dateBasis === "order" ? "下单" : (record.installDate ? "装机" : "签约"),
    text: `${record.terminalUser || "未填写终端用户"} 完成 ${record.productModel || "设备"} ${record.quantity || 1} 台`
  }));
}

function monthlyTrend(records, dashboard = {}) {
  const dated = records.filter((record) => recordDate(record, dashboard));
  const months = dashboard.funnelTrendYear
    ? Array.from({ length: 12 }, (_, index) => `${dashboard.funnelTrendYear}-${String(index + 1).padStart(2, "0")}`)
    : (() => {
      const end = dated.length ? new Date(Math.max(...dated.map((record) => dateValue(record, dashboard)))) : new Date();
      const rollingMonths = [];
      for (let index = 11; index >= 0; index -= 1) {
        const date = new Date(end.getFullYear(), end.getMonth() - index, 1);
        rollingMonths.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`);
      }
      return rollingMonths;
    })();
  const totals = new Map(months.map((month) => [month, 0]));
  dated.forEach((record) => {
    const key = recordDate(record, dashboard).slice(0, 7);
    if (totals.has(key)) totals.set(key, totals.get(key) + (Number(record.quantity) || 0));
  });
  return months.map((month) => ({ month, installed: totals.get(month) || 0 }));
}

function yearlyTrend(records, dashboard = {}) {
  if (dashboard.hideYearlyTrend) return [];
  const dated = records.filter((record) => recordDate(record, dashboard));
  const endYear = dated.length ? new Date(Math.max(...dated.map((record) => dateValue(record, dashboard)))).getFullYear() : new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => String(endYear - 4 + index));
  const totals = new Map(years.map((year) => [year, 0]));
  dated.forEach((record) => {
    const key = recordDate(record, dashboard).slice(0, 4);
    if (totals.has(key)) totals.set(key, totals.get(key) + (Number(record.quantity) || 0));
  });
  return years.map((year) => ({ year, installed: totals.get(year) || 0 }));
}

function dashboardFromRecords(baseDashboard, records) {
  const { productLineData, sourceRecords, ...dashboardBase } = baseDashboard;
  return {
    ...dashboardBase,
    provinceData: provinceData(records, dashboardBase),
    users: topGrouped(records, (record) => record.terminalUser, (record) => record.installProvince),
    partners: topGrouped(records, (record) => record.channelName, (record) => record.installProvince),
    updates: latestUpdates(records, dashboardBase),
    monthlyTrend: monthlyTrend(records, dashboardBase),
    yearlyTrend: yearlyTrend(records, dashboardBase),
    totalUnits: sumRecords(records),
    quarterUnits: 0,
    sourceRecords: records
  };
}

function applyRecordsToDashboards(baseDashboards, records) {
  const next = JSON.parse(JSON.stringify(baseDashboards));
  Object.keys(next).forEach((productKey) => {
    const productRecords = records.filter((record) => record.productKey === productKey);
    if (!productRecords.length) return;
    next[productKey] = dashboardFromRecords(next[productKey], productRecords);
    next[productKey].productLineData = {};
    (next[productKey].productLineOptions || []).filter((option) => option.value !== "all").forEach((option) => {
      const lineRecords = productRecords.filter((record) => lineKeyForRecord(record) === option.value);
      next[productKey].productLineData[option.value] = dashboardFromRecords({ ...next[productKey], productLineOptions: [] }, lineRecords);
    });
  });
  return next;
}

async function baseDashboardsFromAssets(request, env) {
  const assetUrl = new URL("/data/dashboard-data.json", request.url);
  const response = await env.ASSETS.fetch(new Request(assetUrl));
  if (!response.ok) throw new Error("Unable to load dashboard base data");
  return response.json();
}

async function dashboardsFromBaserow(request, env) {
  const config = baserowConfig(env);
  const [baseDashboards, installRows, maps] = await Promise.all([
    baseDashboardsFromAssets(request, env),
    baserowRows(env, config.installBaseTableId),
    masterMaps(env)
  ]);

  const records = installRows.map((row) => {
    const product = maps.productsById.get(firstLinkedId(row.Product_Model));
    const customer = maps.customersById.get(firstLinkedId(row.End_Customer));
    const sales = maps.partnersById.get(firstLinkedId(row.Sales));
    const channel = maps.partnersById.get(firstLinkedId(row.Channel_Partner));
    const productModel = product?.Product_Model || firstLinkedName(row.Product_Model) || row.Product_Family || "";
    const productKey = productKeyFromText(product?.Product_Line, product?.Product_Family, productModel, selectedValue(row.Product_Line), row.Product_Family);
    if (!productKey) return null;
    return {
      serialNo: row.Serial_No || "",
      productKey,
      productModel,
      quantity: Number(row.Quantity) || 1,
      configDescription: row.Product_Config || product?.Standard_Config || "",
      installProvince: canonicalProvince(customer?.Province || selectedValue(row.Province)),
      installCity: row.City || customer?.City || "",
      salesRegion: selectedValue(row.Region),
      terminalUser: customer?.End_Customer || firstLinkedName(row.End_Customer) || "未填写终端用户",
      channelName: channel?.Name || firstLinkedName(row.Channel_Partner) || "未填写渠道",
      salesName: sales?.Name || firstLinkedName(row.Sales) || "未填写销售",
      salesDate: isoDate(row.Order_Date),
      installDate: isoDate(row.Installation_Date || row.Acceptance_Date),
      warrantyExpireDate: isoDate(row.Warranty_Expiry_Date),
      winRate: row.Funnel_Win_Rate || "",
      gforceSystemId: row.Gforce_System_ID || ""
    };
  }).filter(Boolean);

  return applyRecordsToDashboards(baseDashboards, records);
}

function baserowProductDefaults(productKey, model) {
  if (productKey === "tegris") return { Product_Line: "OR Digital", Product_Family: "TEGRIS", Product_Model: model };
  if (productKey === "magnus1180") return { Product_Line: "SWP / OT", Product_Family: "Magnus", Product_Model: model };
  if (productKey === "magnus2026Funnel") return { Product_Line: "SWP / OT", Product_Family: "Magnus Funnel", Product_Model: model };
  if (productKey === "icMic") return { Product_Line: "IC / MIC", Product_Family: "IC MIC", Product_Model: model };
  return { Product_Line: "", Product_Family: "", Product_Model: model };
}

async function findOrCreateProduct(env, record, maps) {
  const config = baserowConfig(env);
  const key = normalizeModelKey(record.productModel);
  if (maps.productsByName.has(key)) return maps.productsByName.get(key);
  const defaults = baserowProductDefaults(record.productKey, record.productModel);
  const row = await baserowCreateRow(env, config.productTableId, {
    Product_ID: `AUTO-${Date.now()}`,
    Product_Line: defaults.Product_Line,
    Product_Family: defaults.Product_Family,
    Product_Model: defaults.Product_Model,
    Standard_Config: record.configDescription || "",
    Remarks: dashboardImportSource
  });
  maps.productsByName.set(key, row);
  maps.productsById.set(row.id, row);
  return row;
}

async function findOrCreateCustomer(env, record, maps) {
  const config = baserowConfig(env);
  const key = normalizedText(record.terminalUser).toLowerCase();
  if (maps.customersByName.has(key)) return maps.customersByName.get(key);
  const row = await baserowCreateRow(env, config.customerTableId, {
    Customer_ID: `AUTO-${Date.now()}`,
    End_Customer: record.terminalUser,
    Province: record.installProvince,
    City: record.installCity || "",
    Remarks: dashboardImportSource
  });
  maps.customersByName.set(key, row);
  maps.customersById.set(row.id, row);
  return row;
}

async function findOrCreatePartner(env, name, type, province, maps) {
  const config = baserowConfig(env);
  const key = normalizedText(name).toLowerCase();
  if (maps.partnersByName.has(key)) return maps.partnersByName.get(key);
  const row = await baserowCreateRow(env, config.salesPartnerTableId, {
    Party_ID: `AUTO-${Date.now()}`,
    Name: name,
    Type: type,
    Province: province,
    Remarks: dashboardImportSource
  });
  maps.partnersByName.set(key, row);
  maps.partnersById.set(row.id, row);
  return row;
}

async function syncDashboardsToBaserow(env, dashboards) {
  const config = baserowConfig(env);
  const records = Object.entries(dashboards).flatMap(([productKey, dashboard]) => (
    (dashboard.sourceRecords || []).map((record) => ({ ...record, productKey }))
  ));
  if (!records.length) return;

  const [rows, maps, installFieldNames] = await Promise.all([
    baserowRows(env, config.installBaseTableId),
    masterMaps(env),
    baserowFieldNames(env, config.installBaseTableId).catch(() => new Set())
  ]);
  const rowsBySerial = new Map(rows.map((row) => [normalizedText(row.Serial_No), row]).filter(([serial]) => serial));

  for (const record of records) {
    const [product, customer, sales, channel] = await Promise.all([
      findOrCreateProduct(env, record, maps),
      findOrCreateCustomer(env, record, maps),
      findOrCreatePartner(env, record.salesName || "未填写销售", "Sales", record.installProvince, maps),
      findOrCreatePartner(env, record.channelName || "未填写渠道", "Channel Partner", record.installProvince, maps)
    ]);
    const serialNo = serialForRecord(record);
    const marker = testDataMarker(record.productKey);
    const remarks = [record.configDescription, marker].filter(Boolean).join(" | ");
    const payload = payloadForFields({
      Serial_No: serialNo,
      Product_Family: product.Product_Family || "",
      Product_Model: [product.id],
      Product_Config: record.configDescription || "",
      Quantity: Number(record.quantity) || 1,
      Sales: [sales.id],
      End_Customer: [customer.id],
      Channel_Partner: [channel.id],
      Region: record.salesRegion || null,
      Province: record.installProvince || null,
      City: record.installCity || null,
      Order_Date: record.salesDate || null,
      Installation_Date: record.installDate || null,
      Warranty_Expiry_Date: record.warrantyExpireDate || null,
      Funnel_Win_Rate: record.winRate ? Number(String(record.winRate).match(/20|40|60|80|100/)?.[0] || record.winRate) : null,
      Gforce_System_ID: record.gforceSystemId || null,
      Project_Source: dashboardImportSource,
      Remarks: remarks
    }, installFieldNames);
    const existingRow = rowsBySerial.get(serialNo);
    if (existingRow) {
      await baserowUpdateRow(env, config.installBaseTableId, existingRow.id, payload);
    } else {
      await baserowCreateRow(env, config.installBaseTableId, payload);
    }
  }
}

export async function onRequestGet({ request, env }) {
  const sessionUser = await readSessionUser(request, env);
  if (!sessionUser) {
    return jsonResponse({ error: "请先登录。" }, 401, { "Set-Cookie": clearSessionCookie() });
  }

  try {
    return jsonResponse({ dashboards: await dashboardsFromBaserow(request, env) });
  } catch (error) {
    return jsonResponse({ dashboards: {}, error: error.message }, 500);
  }
}

export async function onRequestPost({ request, env }) {
  const sessionUser = await readSessionUser(request, env);
  if (!sessionUser) {
    return jsonResponse({ error: "请先登录。" }, 401, { "Set-Cookie": clearSessionCookie() });
  }

  try {
    const body = await request.json();
    const dashboards = body.dashboards && typeof body.dashboards === "object" && !Array.isArray(body.dashboards)
      ? body.dashboards
      : {};
    await syncDashboardsToBaserow(env, dashboards);
    return jsonResponse({ dashboards });
  } catch (error) {
    return jsonResponse({ dashboards: {}, error: error.message }, 500);
  }
}
