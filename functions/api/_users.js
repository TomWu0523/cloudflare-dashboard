import { normalizeStoredUser, normalizedText } from "./_auth.js";

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

function userInputFromRow(row) {
  let notes = {};
  try {
    notes = row.Notes ? JSON.parse(row.Notes) : {};
  } catch (error) {
    notes = {};
  }

  return {
    username: row.Username || notes.username || row.Name,
    passwordHash: row.PasswordHash || notes.passwordHash || row.Password || notes.password,
    displayName: row.Name || notes.displayName || notes.name,
    role: row.Role || notes.role || notes.position
  };
}

export async function readUsers(env) {
  const rows = await baserowRows(env);
  const users = [];
  for (const row of rows) {
    if (row.Active === false) {
      continue;
    }
    const user = await normalizeStoredUser(userInputFromRow(row));
    if (user) {
      users.push(user);
    }
  }
  return users;
}

export async function saveUsers(env, users) {
  const { tableId } = baserowConfig(env);
  const nextUsers = [];
  for (const user of users) {
    const normalizedUser = await normalizeStoredUser(user);
    if (normalizedUser) {
      nextUsers.push(normalizedUser);
    }
  }

  const rows = await baserowRows(env);
  await Promise.all(rows.map((row) => (
    baserowRequest(env, `/api/database/rows/table/${tableId}/${row.id}/`, { method: "DELETE" })
  )));

  await Promise.all(nextUsers.map((user) => (
    baserowRequest(env, `/api/database/rows/table/${tableId}/?user_field_names=true`, {
      method: "POST",
      body: JSON.stringify({
        Name: user.displayName || user.username,
        Notes: JSON.stringify({
          username: user.username,
          passwordHash: user.passwordHash,
          role: user.role || "授权用户"
        }),
        Active: true
      })
    })
  )));

  return nextUsers;
}

export async function updateUserPassword(env, username, passwordHash) {
  const users = await readUsers(env);
  const normalizedUsername = normalizedText(username).toLowerCase();
  const nextUsers = users.map((user) => (
    normalizedText(user.username).toLowerCase() === normalizedUsername
      ? { ...user, passwordHash }
      : user
  ));
  return saveUsers(env, nextUsers);
}
