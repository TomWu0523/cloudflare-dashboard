const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store"
};

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: jsonHeaders
  });
}

function baserowConfig(env) {
  return {
    apiUrl: (env.BASEROW_API_URL || "https://api.baserow.io").replace(/\/$/, ""),
    token: env.BASEROW_TOKEN || "",
    tableId: env.BASEROW_AUTH_USERS_TABLE_ID || ""
  };
}

async function baserowRequest(env, path, options = {}) {
  const config = baserowConfig(env);
  if (!config.token || !config.tableId) {
    throw new Error("Baserow users API is not configured");
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

async function baserowRows(env) {
  const { apiUrl, tableId } = baserowConfig(env);
  const rows = [];
  let nextPath = `/api/database/rows/table/${tableId}/?user_field_names=true&size=200`;

  while (nextPath) {
    const page = await baserowRequest(env, nextPath);
    rows.push(...(page.results || []));
    nextPath = page.next ? `${new URL(page.next, apiUrl).pathname}${new URL(page.next, apiUrl).search}` : "";
  }

  return rows;
}

function sanitizeUser(user) {
  const username = String(user?.username ?? "").trim();
  const password = String(user?.password ?? "").trim();

  if (!username || !password) {
    return null;
  }

  return {
    username,
    password,
    displayName: String(user?.displayName || user?.name || username).trim(),
    role: String(user?.role || user?.position || "授权用户").trim()
  };
}

function userFromBaserowRow(row) {
  let notes = {};
  try {
    notes = row.Notes ? JSON.parse(row.Notes) : {};
  } catch (error) {
    notes = {};
  }

  return sanitizeUser({
    username: row.Username || notes.username || row.Name,
    password: row.Password || notes.password,
    displayName: row.Name || notes.displayName || notes.name,
    role: row.Role || notes.role || notes.position
  });
}

export async function onRequestGet({ env }) {
  try {
    const rows = await baserowRows(env);
    const users = rows
      .filter((row) => row.Active !== false)
      .map(userFromBaserowRow)
      .filter(Boolean);

    return jsonResponse({ users });
  } catch (error) {
    return jsonResponse({ users: [], error: error.message }, 500);
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const { tableId } = baserowConfig(env);
    const body = await request.json();
    const users = Array.isArray(body.users) ? body.users.map(sanitizeUser).filter(Boolean) : [];
    const rows = await baserowRows(env);

    await Promise.all(rows.map((row) => (
      baserowRequest(env, `/api/database/rows/table/${tableId}/${row.id}/`, { method: "DELETE" })
    )));

    await Promise.all(users.map((user) => (
      baserowRequest(env, `/api/database/rows/table/${tableId}/?user_field_names=true`, {
        method: "POST",
        body: JSON.stringify({
          Name: user.displayName || user.username,
          Notes: JSON.stringify({
            username: user.username,
            password: user.password,
            role: user.role || "授权用户"
          }),
          Active: true
        })
      })
    )));

    return jsonResponse({ users });
  } catch (error) {
    return jsonResponse({ users: [], error: error.message }, 500);
  }
}
