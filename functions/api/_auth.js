const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store"
};

const sessionCookieName = "getinge_dashboard_session";
const sessionTtlMs = 1000 * 60 * 60 * 12;
const passwordHashIterations = 100000;

export function jsonResponse(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...jsonHeaders,
      ...headers
    }
  });
}

export function normalizedText(value) {
  return String(value ?? "").trim();
}

function hexFromBytes(bytes) {
  return [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("");
}

function bytesFromHex(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
}

function base64UrlEncode(text) {
  const encoded = btoa(text);
  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(text) {
  const padded = text.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(text.length / 4) * 4, "=");
  return atob(padded);
}

async function pbkdf2Digest(password, saltHex) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({
    name: "PBKDF2",
    salt: bytesFromHex(saltHex),
    iterations: passwordHashIterations,
    hash: "SHA-256"
  }, key, 512);
  return hexFromBytes(new Uint8Array(bits));
}

export async function hashPassword(password, saltHex = hexFromBytes(crypto.getRandomValues(new Uint8Array(16)))) {
  return `pbkdf2$${saltHex}$${await pbkdf2Digest(password, saltHex)}`;
}

export async function verifyPassword(password, storedValue) {
  if (!storedValue) {
    return false;
  }

  if (!/^(pbkdf2)\$/.test(String(storedValue))) {
    return normalizedText(password) === normalizedText(storedValue);
  }

  const [, saltHex, digest] = String(storedValue).split("$");
  if (!saltHex || !digest) {
    return false;
  }

  return await pbkdf2Digest(password, saltHex) === digest;
}

export async function normalizeStoredUser(user) {
  const username = normalizedText(user?.username);
  const passwordHash = normalizedText(user?.passwordHash ?? user?.password);
  if (!username || !passwordHash) {
    return null;
  }

  return {
    username,
    passwordHash: passwordHash.startsWith("pbkdf2$") ? passwordHash : await hashPassword(passwordHash),
    displayName: normalizedText(user?.displayName || user?.name || username),
    role: normalizedText(user?.role || user?.position || "授权用户")
  };
}

export function sanitizeUserProfile(user) {
  return {
    username: user.username,
    displayName: user.displayName || user.username,
    role: user.role || "授权用户"
  };
}

export function isAdminUser(user) {
  const text = `${user?.username || ""} ${user?.displayName || ""} ${user?.role || ""}`.toLowerCase();
  return normalizedText(user?.username).toLowerCase() === "maquet"
    || text.includes("系统管理员")
    || text.includes("admin");
}

function parseCookies(request) {
  return String(request.headers.get("cookie") || "")
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .reduce((cookies, item) => {
      const separator = item.indexOf("=");
      if (separator === -1) {
        return cookies;
      }
      cookies[item.slice(0, separator)] = decodeURIComponent(item.slice(separator + 1));
      return cookies;
    }, {});
}

function sessionSecret(env) {
  return env.SESSION_SECRET || env.BASEROW_TOKEN || "getinge-dashboard-dev-secret";
}

async function signText(text, env) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(sessionSecret(env)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(text));
  return hexFromBytes(new Uint8Array(signature));
}

export async function createSessionCookie(user, env) {
  const payload = base64UrlEncode(JSON.stringify({
    user: sanitizeUserProfile(user),
    exp: Date.now() + sessionTtlMs
  }));
  const signature = await signText(payload, env);
  return `${sessionCookieName}=${encodeURIComponent(`${payload}.${signature}`)}; Path=/; HttpOnly; SameSite=Lax; Expires=${new Date(Date.now() + sessionTtlMs).toUTCString()}`;
}

export function clearSessionCookie() {
  return `${sessionCookieName}=; Path=/; HttpOnly; SameSite=Lax; Expires=${new Date(0).toUTCString()}`;
}

export async function readSessionUser(request, env) {
  const raw = parseCookies(request)[sessionCookieName];
  if (!raw) {
    return null;
  }

  const [payload, signature] = String(raw).split(".");
  if (!payload || !signature) {
    return null;
  }

  if (await signText(payload, env) !== signature) {
    return null;
  }

  const parsed = JSON.parse(base64UrlDecode(payload));
  if (!parsed?.exp || parsed.exp <= Date.now()) {
    return null;
  }

  return parsed.user || null;
}
