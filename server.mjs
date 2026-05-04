import { createServer } from "node:http";
import { pbkdf2Sync, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { networkInterfaces } from "node:os";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const dataDir = join(rootDir, "data");
const usersFile = join(dataDir, "authorized-users.json");
const dashboardDataFile = join(dataDir, "dashboard-data.json");
const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 8080);

await loadEnvFile(join(rootDir, ".env"));

const baserow = {
  apiUrl: process.env.BASEROW_API_URL?.replace(/\/$/, "") || "",
  token: process.env.BASEROW_TOKEN || "",
  authUsersTableId: process.env.BASEROW_AUTH_USERS_TABLE_ID || "",
  installBaseTableId: process.env.BASEROW_INSTALL_BASE_TABLE_ID || "",
  productTableId: process.env.BASEROW_PRODUCT_TABLE_ID || "",
  customerTableId: process.env.BASEROW_CUSTOMER_TABLE_ID || "",
  salesPartnerTableId: process.env.BASEROW_SALES_PARTNER_TABLE_ID || ""
};

const hasBaserow = Boolean(baserow.apiUrl && baserow.token);
const dashboardImportSource = "Dashboard Excel Import";
const passwordHashIterations = 100000;
const sessionCookieName = "getinge_dashboard_session";
const sessionTtlMs = 1000 * 60 * 60 * 12;
const sessions = new Map();
const bootstrapUsers = [
  { username: "Maquet", password: "123win", displayName: "系统管理员", role: "系统管理员" },
  { username: "Tomwu", password: "maquet", displayName: "Tom Wu", role: "Sr.Manager" },
  { username: "Jayding", password: "maquet", displayName: "Jay Ding", role: "Sr.Director SW" },
  { username: "Evanwang", password: "maquet", displayName: "Evan Wang", role: "Head of marketing" },
  { username: "Violajin", password: "maquet", displayName: "Viola Jin", role: "Head of marketing" },
  { username: "Leoyu", password: "maquet", displayName: "Leo Yu", role: "Head of marketing" },
  { username: "ChrisZhang", password: "maquet", displayName: "Chris Zhang", role: "Marketing Director" },
  { username: "Xiangzhu", password: "maquet", displayName: "Xiang Zhu", role: "Project manager" }
];

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

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
};

async function loadEnvFile(path) {
  try {
    const raw = await readFile(path, "utf8");
    raw.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return;
      }
      const separator = trimmed.indexOf("=");
      if (separator === -1) {
        return;
      }
      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim();
      process.env[key] = process.env[key] || value;
    });
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

function sendJson(response, statusCode, payload, headers = {}) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers
  });
  response.end(JSON.stringify(payload));
}

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const digest = pbkdf2Sync(password, Buffer.from(salt, "hex"), passwordHashIterations, 64, "sha256").toString("hex");
  return `pbkdf2$${salt}$${digest}`;
}

function isPasswordHash(value) {
  return /^(pbkdf2|scrypt)\$/.test(String(value || ""));
}

function verifyPassword(password, storedValue) {
  if (!storedValue) {
    return false;
  }

  if (!isPasswordHash(storedValue)) {
    return normalizedText(password) === normalizedText(storedValue);
  }

  const [algorithm, salt, digest] = String(storedValue).split("$");
  if (!salt || !digest) {
    return false;
  }

  const candidate = algorithm === "pbkdf2"
    ? pbkdf2Sync(password, Buffer.from(salt, "hex"), passwordHashIterations, 64, "sha256")
    : scryptSync(password, salt, 64);
  const expected = Buffer.from(digest, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

function sanitizeUserProfile(user) {
  return {
    username: user.username,
    displayName: user.displayName || user.username,
    role: user.role || "授权用户"
  };
}

function normalizeStoredUser(user) {
  const username = String(user?.username ?? "").trim();
  const passwordHash = String(user?.passwordHash ?? user?.password ?? "").trim();

  if (!username || !passwordHash) {
    return null;
  }

  return {
    username,
    passwordHash: isPasswordHash(passwordHash) ? passwordHash : hashPassword(passwordHash),
    displayName: String(user?.displayName || user?.name || username).trim(),
    role: String(user?.role || user?.position || "授权用户").trim()
  };
}

function parseCookies(request) {
  return String(request.headers.cookie || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, part) => {
      const separator = part.indexOf("=");
      if (separator === -1) {
        return cookies;
      }
      cookies[part.slice(0, separator)] = decodeURIComponent(part.slice(separator + 1));
      return cookies;
    }, {});
}

function sessionCookie(token, expiresAt = Date.now() + sessionTtlMs) {
  return `${sessionCookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Expires=${new Date(expiresAt).toUTCString()}`;
}

function clearSessionCookie() {
  return `${sessionCookieName}=; Path=/; HttpOnly; SameSite=Lax; Expires=${new Date(0).toUTCString()}`;
}

function createSession(user) {
  const token = randomBytes(24).toString("hex");
  const expiresAt = Date.now() + sessionTtlMs;
  const session = {
    token,
    user: sanitizeUserProfile(user),
    expiresAt
  };
  sessions.set(token, session);
  return session;
}

function getSession(request) {
  const token = parseCookies(request)[sessionCookieName];
  if (!token) {
    return null;
  }

  const session = sessions.get(token);
  if (!session) {
    return null;
  }

  if (session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }

  session.expiresAt = Date.now() + sessionTtlMs;
  return session;
}

function destroySession(request) {
  const token = parseCookies(request)[sessionCookieName];
  if (token) {
    sessions.delete(token);
  }
}

async function baserowRequest(path, options = {}) {
  if (!hasBaserow) {
    throw new Error("Baserow is not configured");
  }

  const response = await fetch(`${baserow.apiUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Token ${baserow.token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Baserow request failed ${response.status}: ${detail.slice(0, 300)}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function baserowRows(tableId) {
  const rows = [];
  let nextPath = `/api/database/rows/table/${tableId}/?user_field_names=true&size=200`;

  while (nextPath) {
    const page = await baserowRequest(nextPath);
    rows.push(...(page.results || []));
    nextPath = page.next ? `${new URL(page.next).pathname}${new URL(page.next).search}` : "";
  }

  return rows;
}

async function baserowCreateRow(tableId, row) {
  return baserowRequest(`/api/database/rows/table/${tableId}/?user_field_names=true`, {
    method: "POST",
    body: JSON.stringify(row)
  });
}

async function baserowDeleteRow(tableId, rowId) {
  return baserowRequest(`/api/database/rows/table/${tableId}/${rowId}/`, {
    method: "DELETE"
  });
}

async function baserowUpdateRow(tableId, rowId, row) {
  return baserowRequest(`/api/database/rows/table/${tableId}/${rowId}/?user_field_names=true`, {
    method: "PATCH",
    body: JSON.stringify(row)
  });
}

function firstLinkedName(value) {
  if (Array.isArray(value)) {
    return value[0]?.value || value[0]?.name || "";
  }
  return value?.value || value || "";
}

function firstLinkedId(value) {
  return Array.isArray(value) ? value[0]?.id : null;
}

function selectedValue(value) {
  return value?.value || value || "";
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
  if (!value) {
    return "";
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value).slice(0, 10);
}

function dateValue(record) {
  return new Date(record.installDate || record.salesDate || "1970-01-01").getTime();
}

function lineKeyForRecord(record) {
  const model = normalizeModelKey(record.productModel);
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

function productKeyFromText(...values) {
  const text = values.map((value) => normalizedText(value).toLowerCase()).join(" ");
  if (/tegris|tigers|voip|classic/.test(text)) return "tegris";
  if (/1180|magnus|\bb[0-5]\b/.test(text)) return "magnus1180";
  if (/ic|mic|s600|novito|s8666|sterilizer|steriliser/.test(text)) return "icMic";
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
  if (record.serialNo) {
    return normalizedText(record.serialNo);
  }

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
  if (productKey === "icMic") return "TEST_DATA_IC_MIC";
  return "";
}

async function readUsers() {
  if (hasBaserow && baserow.authUsersTableId) {
    try {
      const rows = await baserowRows(baserow.authUsersTableId);
      const users = rows.map((row) => {
        let notes = {};
        try {
          notes = row.Notes ? JSON.parse(row.Notes) : {};
        } catch (error) {
          notes = {};
        }

        return normalizeStoredUser({
          username: row.Username || notes.username || row.Name,
          passwordHash: row.PasswordHash || notes.passwordHash || row.Password || notes.password,
          displayName: row.Name || notes.displayName || notes.name,
          role: row.Role || notes.role || notes.position
        });
      }).filter((user, index) => user && rows[index]?.Active !== false);

      if (users.length) {
        await saveLocalUsers(users);
        return users;
      }
    } catch (error) {
      console.warn(`Baserow users unavailable, using local users: ${error.message}`);
    }
  }

  try {
    const raw = await readFile(usersFile, "utf8");
    const parsed = JSON.parse(raw);
    const users = Array.isArray(parsed) ? parsed.map(normalizeStoredUser).filter(Boolean) : [];
    if (users.length) {
      await saveLocalUsers(users);
    }
    return users;
  } catch (error) {
    if (error.code === "ENOENT") {
      const users = bootstrapUsers.map(normalizeStoredUser).filter(Boolean);
      await saveLocalUsers(users);
      return users;
    }
    throw error;
  }
}

async function saveLocalUsers(users) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(usersFile, `${JSON.stringify(users, null, 2)}\n`, "utf8");
}

async function saveUsers(users) {
  const normalizedUsers = users.map(normalizeStoredUser).filter(Boolean);
  await saveLocalUsers(normalizedUsers);

  if (hasBaserow && baserow.authUsersTableId) {
    try {
      const rows = await baserowRows(baserow.authUsersTableId);
      await Promise.all(rows.map((row) => baserowDeleteRow(baserow.authUsersTableId, row.id)));
      await Promise.all(normalizedUsers.map((user) => baserowCreateRow(baserow.authUsersTableId, {
        Name: user.displayName || user.username,
        Notes: JSON.stringify({
          username: user.username,
          passwordHash: user.passwordHash,
          role: user.role || "授权用户"
        }),
        Active: true
      })));
    } catch (error) {
      console.warn(`Unable to sync users to Baserow: ${error.message}`);
    }
  }
}

async function updateUserPassword(username, password) {
  const normalizedUsername = normalizedText(username).toLowerCase();
  if (!normalizedUsername || !normalizedText(password)) {
    throw new Error("用户名和新密码不能为空");
  }

  const users = await readUsers();
  const userIndex = users.findIndex((user) => normalizedText(user.username).toLowerCase() === normalizedUsername);
  if (userIndex < 0) {
    throw new Error("未找到当前用户");
  }

  const nextUsers = users.map((user, index) => (
    index === userIndex ? { ...user, passwordHash: hashPassword(normalizedText(password)) } : user
  ));
  await saveUsers(nextUsers);
  return nextUsers;
}

async function readDashboardData() {
  if (hasBaserow && baserow.installBaseTableId) {
    try {
      const dashboards = await buildDashboardsFromBaserow();
      await saveLocalDashboardData(dashboards);
      return dashboards;
    } catch (error) {
      console.warn(`Baserow dashboard data unavailable, using local data: ${error.message}`);
    }
  }

  const raw = await readFile(dashboardDataFile, "utf8");
  const parsed = JSON.parse(raw);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
}

async function saveLocalDashboardData(dashboards) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dashboardDataFile, `${JSON.stringify(dashboards, null, 2)}\n`, "utf8");
}

async function saveDashboardData(dashboards) {
  await saveLocalDashboardData(dashboards);

  if (hasBaserow && baserow.installBaseTableId) {
    try {
      await syncDashboardsToBaserow(dashboards);
    } catch (error) {
      console.warn(`Unable to sync dashboard data to Baserow: ${error.message}`);
    }
  }
}

async function readLocalDashboardData() {
  const raw = await readFile(dashboardDataFile, "utf8");
  const parsed = JSON.parse(raw);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
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

function provinceData(records) {
  const map = new Map();
  records.forEach((record) => {
    const province = canonicalProvince(record.installProvince);
    if (!province) return;
    const item = map.get(province) || {
      name: province,
      value: 0,
      latestSite: record.terminalUser,
      latestDate: record.installDate || record.salesDate || "",
      coord: provinceCoordinates[province] || [104.2, 35.8],
      latestTime: 0
    };
    item.value += Number(record.quantity) || 0;
    const time = dateValue(record);
    if (time >= item.latestTime) {
      item.latestSite = record.terminalUser;
      item.latestDate = record.installDate || record.salesDate || "";
      item.latestTime = time;
    }
    map.set(province, item);
  });
  return [...map.values()].sort((a, b) => b.value - a.value).map(({ latestTime, ...item }) => item);
}

function latestUpdates(records) {
  return [...records].sort((a, b) => dateValue(b) - dateValue(a)).slice(0, 6).map((record) => ({
    date: (record.installDate || record.salesDate || "--").slice(5) || "--",
    status: record.installDate ? "装机" : "签约",
    text: `${record.terminalUser || "未填写终端用户"} 完成 ${record.productModel || "设备"} ${record.quantity || 1} 台`
  }));
}

function monthlyTrend(records) {
  const dated = records.filter((record) => record.installDate || record.salesDate);
  const end = dated.length ? new Date(Math.max(...dated.map(dateValue))) : new Date();
  const months = [];
  for (let index = 11; index >= 0; index -= 1) {
    const date = new Date(end.getFullYear(), end.getMonth() - index, 1);
    months.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`);
  }
  const totals = new Map(months.map((month) => [month, 0]));
  dated.forEach((record) => {
    const key = (record.installDate || record.salesDate).slice(0, 7);
    if (totals.has(key)) totals.set(key, totals.get(key) + (Number(record.quantity) || 0));
  });
  return months.map((month) => ({ month, installed: totals.get(month) || 0 }));
}

function yearlyTrend(records) {
  const dated = records.filter((record) => record.installDate || record.salesDate);
  const endYear = dated.length ? new Date(Math.max(...dated.map(dateValue))).getFullYear() : new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => String(endYear - 4 + index));
  const totals = new Map(years.map((year) => [year, 0]));
  dated.forEach((record) => {
    const key = (record.installDate || record.salesDate).slice(0, 4);
    if (totals.has(key)) totals.set(key, totals.get(key) + (Number(record.quantity) || 0));
  });
  return years.map((year) => ({ year, installed: totals.get(year) || 0 }));
}

function dashboardFromRecords(baseDashboard, records) {
  const { productLineData, sourceRecords, ...dashboardBase } = baseDashboard;
  return {
    ...dashboardBase,
    provinceData: provinceData(records),
    users: topGrouped(records, (record) => record.terminalUser, (record) => record.installProvince),
    partners: topGrouped(records, (record) => record.channelName, (record) => record.installProvince),
    updates: latestUpdates(records),
    monthlyTrend: monthlyTrend(records),
    yearlyTrend: yearlyTrend(records),
    totalUnits: sumRecords(records),
    quarterUnits: sumRecords(records.filter((record) => {
      const date = record.installDate || record.salesDate;
      if (!date) return false;
      const now = new Date();
      const value = new Date(date);
      return value.getFullYear() === now.getFullYear() && Math.floor(value.getMonth() / 3) === Math.floor(now.getMonth() / 3);
    })),
    sourceRecords: records
  };
}

function applyRecordsToDashboards(baseDashboards, records) {
  const next = JSON.parse(JSON.stringify(baseDashboards));
  Object.keys(next).forEach((productKey) => {
    const productRecords = records.filter((record) => record.productKey === productKey);
    if (!productRecords.length) {
      return;
    }
    next[productKey] = dashboardFromRecords(next[productKey], productRecords);
    next[productKey].productLineData = {};
    (next[productKey].productLineOptions || []).filter((option) => option.value !== "all").forEach((option) => {
      const lineRecords = productRecords.filter((record) => lineKeyForRecord(record) === option.value);
      next[productKey].productLineData[option.value] = dashboardFromRecords({ ...next[productKey], productLineOptions: [] }, lineRecords);
    });
  });
  return next;
}

async function masterMaps() {
  const [products, customers, partners] = await Promise.all([
    baserow.productTableId ? baserowRows(baserow.productTableId) : [],
    baserow.customerTableId ? baserowRows(baserow.customerTableId) : [],
    baserow.salesPartnerTableId ? baserowRows(baserow.salesPartnerTableId) : []
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

async function buildDashboardsFromBaserow() {
  const [baseDashboards, installRows, maps] = await Promise.all([
    readLocalDashboardData(),
    baserowRows(baserow.installBaseTableId),
    masterMaps()
  ]);
  const records = installRows.map((row) => {
    const product = maps.productsById.get(firstLinkedId(row.Product_Model));
    const customer = maps.customersById.get(firstLinkedId(row.End_Customer));
    const sales = maps.partnersById.get(firstLinkedId(row.Sales));
    const channel = maps.partnersById.get(firstLinkedId(row.Channel_Partner));
    const productModel = product?.Product_Model || firstLinkedName(row.Product_Model) || row.Product_Family || "";
    const productKey = productKeyFromText(
      product?.Product_Line,
      product?.Product_Family,
      productModel,
      selectedValue(row.Product_Line),
      row.Product_Family
    );

    if (!productKey) {
      return null;
    }

    return {
      serialNo: row.Serial_No || "",
      productKey,
      productModel,
      quantity: Number(row.Quantity) || 1,
      configDescription: row.Product_Config || product?.Standard_Config || "",
      installProvince: canonicalProvince(customer?.Province || selectedValue(row.Province)),
      terminalUser: customer?.End_Customer || firstLinkedName(row.End_Customer) || "未填写终端用户",
      channelName: channel?.Name || firstLinkedName(row.Channel_Partner) || "未填写渠道",
      salesName: sales?.Name || firstLinkedName(row.Sales) || "未填写销售",
      salesDate: isoDate(row.Order_Date),
      installDate: isoDate(row.Installation_Date || row.Acceptance_Date),
      warrantyExpireDate: isoDate(row.Warranty_Expiry_Date)
    };
  }).filter(Boolean);

  return applyRecordsToDashboards(baseDashboards, records);
}

function baserowProductDefaults(productKey, model) {
  if (productKey === "tegris") return { Product_Line: "OR Digital", Product_Family: "TEGRIS", Product_Model: model };
  if (productKey === "magnus1180") return { Product_Line: "SWP / OT", Product_Family: "Magnus", Product_Model: model };
  if (productKey === "icMic") return { Product_Line: "IC / MIC", Product_Family: "IC MIC", Product_Model: model };
  return { Product_Line: "", Product_Family: "", Product_Model: model };
}

async function findOrCreateProduct(record, maps) {
  const key = normalizeModelKey(record.productModel);
  if (maps.productsByName.has(key)) return maps.productsByName.get(key);
  const defaults = baserowProductDefaults(record.productKey, record.productModel);
  const row = await baserowCreateRow(baserow.productTableId, {
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

async function findOrCreateCustomer(record, maps) {
  const key = normalizedText(record.terminalUser).toLowerCase();
  if (maps.customersByName.has(key)) return maps.customersByName.get(key);
  const row = await baserowCreateRow(baserow.customerTableId, {
    Customer_ID: `AUTO-${Date.now()}`,
    End_Customer: record.terminalUser,
    Province: record.installProvince,
    Remarks: dashboardImportSource
  });
  maps.customersByName.set(key, row);
  maps.customersById.set(row.id, row);
  return row;
}

async function findOrCreatePartner(name, type, province, maps) {
  const key = normalizedText(name).toLowerCase();
  if (maps.partnersByName.has(key)) return maps.partnersByName.get(key);
  const row = await baserowCreateRow(baserow.salesPartnerTableId, {
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

async function syncDashboardsToBaserow(dashboards) {
  const records = Object.entries(dashboards).flatMap(([productKey, dashboard]) => (
    (dashboard.sourceRecords || []).map((record) => ({ ...record, productKey }))
  ));

  if (!records.length) {
    return;
  }

  const rows = await baserowRows(baserow.installBaseTableId);
  const rowsBySerial = new Map(rows.map((row) => [normalizedText(row.Serial_No), row]).filter(([serial]) => serial));
  const maps = await masterMaps();
  for (const record of records) {
    const [product, customer, sales, channel] = await Promise.all([
      findOrCreateProduct(record, maps),
      findOrCreateCustomer(record, maps),
      findOrCreatePartner(record.salesName || "未填写销售", "Sales", record.installProvince, maps),
      findOrCreatePartner(record.channelName || "未填写渠道", "Channel Partner", record.installProvince, maps)
    ]);

    const serialNo = serialForRecord(record);
    const marker = testDataMarker(record.productKey);
    const remarks = [record.configDescription, marker].filter(Boolean).join(" | ");
    const payload = {
      Serial_No: serialNo,
      Product_Family: product.Product_Family || "",
      Product_Model: [product.id],
      Product_Config: record.configDescription || "",
      Quantity: Number(record.quantity) || 1,
      Sales: [sales.id],
      End_Customer: [customer.id],
      Channel_Partner: [channel.id],
      Order_Date: record.salesDate || null,
      Installation_Date: record.installDate || null,
      Warranty_Expiry_Date: record.warrantyExpireDate || null,
      Project_Source: dashboardImportSource,
      Remarks: remarks
    };

    const existingRow = rowsBySerial.get(serialNo);
    if (existingRow) {
      await baserowUpdateRow(baserow.installBaseTableId, existingRow.id, payload);
    } else {
      await baserowCreateRow(baserow.installBaseTableId, payload);
    }
  }
}

async function readRequestBody(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > 1024 * 1024) {
      throw new Error("Request body is too large");
    }
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}

function isAdminUser(user) {
  const text = `${user?.username || ""} ${user?.displayName || ""} ${user?.role || ""}`.toLowerCase();
  return normalizedText(user?.username).toLowerCase() === "maquet"
    || text.includes("系统管理员")
    || text.includes("admin");
}

async function requireSession(request, response) {
  const session = getSession(request);
  if (!session) {
    sendJson(response, 401, { error: "请先登录。" }, { "Set-Cookie": clearSessionCookie() });
    return null;
  }
  return session;
}

async function requireAdminSession(request, response) {
  const session = await requireSession(request, response);
  if (!session) {
    return null;
  }
  if (!isAdminUser(session.user)) {
    sendJson(response, 403, { error: "仅管理员可执行此操作。" });
    return null;
  }
  return session;
}

async function authenticateUser(username, password) {
  const normalizedUsername = normalizedText(username).toLowerCase();
  const normalizedPassword = normalizedText(password);
  if (!normalizedUsername || !normalizedPassword) {
    return null;
  }

  const users = await readUsers();
  const matchedUser = users.find((user) => normalizedText(user.username).toLowerCase() === normalizedUsername);
  if (!matchedUser || !verifyPassword(normalizedPassword, matchedUser.passwordHash)) {
    return null;
  }

  return matchedUser;
}

async function handleSessionApi(request, response) {
  if (request.method === "GET") {
    const session = getSession(request);
    if (!session) {
      sendJson(response, 401, { error: "未登录。" }, { "Set-Cookie": clearSessionCookie() });
      return;
    }
    sendJson(response, 200, { user: session.user });
    return;
  }

  if (request.method === "POST") {
    const body = JSON.parse(await readRequestBody(request) || "{}");
    const user = await authenticateUser(body.username, body.password);
    if (!user) {
      sendJson(response, 401, { error: "用户名或密码不正确。" });
      return;
    }

    const session = createSession(user);
    sendJson(response, 200, { user: session.user }, { "Set-Cookie": sessionCookie(session.token, session.expiresAt) });
    return;
  }

  if (request.method === "DELETE") {
    destroySession(request);
    sendJson(response, 200, { ok: true }, { "Set-Cookie": clearSessionCookie() });
    return;
  }

  if (request.method === "PATCH" && request.url?.startsWith("/api/session/password")) {
    const session = await requireSession(request, response);
    if (!session) {
      return;
    }

    const body = JSON.parse(await readRequestBody(request) || "{}");
    const nextPassword = normalizedText(body.password);
    if (nextPassword.length < 4) {
      sendJson(response, 400, { error: "新密码至少需要 4 个字符。" });
      return;
    }

    await updateUserPassword(session.user.username, nextPassword);
    sendJson(response, 200, { user: session.user });
    return;
  }

  sendJson(response, 405, { error: "Method not allowed" });
}

async function handleUsersApi(request, response) {
  const session = request.method === "GET" ? await requireAdminSession(request, response) : await requireAdminSession(request, response);
  if (!session) {
    return;
  }

  if (request.method === "GET") {
    sendJson(response, 200, { users: (await readUsers()).map(sanitizeUserProfile) });
    return;
  }

  if (request.method === "POST") {
    const body = JSON.parse(await readRequestBody(request) || "{}");
    const incomingUsers = Array.isArray(body.users) ? body.users : [];
    const nextUsers = incomingUsers.map(normalizeStoredUser).filter(Boolean);
    await saveUsers(nextUsers);
    sendJson(response, 200, { users: nextUsers.map(sanitizeUserProfile) });
    return;
  }

  sendJson(response, 405, { error: "Method not allowed" });
}

async function handleDashboardDataApi(request, response) {
  const session = await requireSession(request, response);
  if (!session) {
    return;
  }

  if (request.method === "GET") {
    sendJson(response, 200, { dashboards: await readDashboardData() });
    return;
  }

  if (request.method === "POST") {
    const body = JSON.parse(await readRequestBody(request) || "{}");
    const dashboards = body.dashboards && typeof body.dashboards === "object" && !Array.isArray(body.dashboards)
      ? body.dashboards
      : {};
    await saveDashboardData(dashboards);
    sendJson(response, 200, { dashboards });
    return;
  }

  sendJson(response, 405, { error: "Method not allowed" });
}

async function serveStatic(request, response) {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = normalize(join(rootDir, relativePath));

  if (!filePath.startsWith(rootDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const content = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream"
    });
    response.end(content);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" ? 404 : 500, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    response.end(error.code === "ENOENT" ? "Not found" : "Server error");
  }
}

const server = createServer(async (request, response) => {
  try {
    if (request.url?.startsWith("/api/session/password")) {
      await handleSessionApi(request, response);
      return;
    }

    if (request.url?.startsWith("/api/session")) {
      await handleSessionApi(request, response);
      return;
    }

    if (request.url?.startsWith("/api/users")) {
      await handleUsersApi(request, response);
      return;
    }

    if (request.url?.startsWith("/api/dashboard-data")) {
      await handleDashboardDataApi(request, response);
      return;
    }

    await serveStatic(request, response);
  } catch (error) {
    sendJson(response, 500, { error: error.message || "Server error" });
  }
});

function localNetworkUrls() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((network) => network && network.family === "IPv4" && !network.internal)
    .map((network) => `http://${network.address}:${port}`);
}

server.listen(port, host, () => {
  console.log(`Dashboard server running at http://localhost:${port}`);
  localNetworkUrls().forEach((url) => {
    console.log(`LAN access: ${url}`);
  });
});
