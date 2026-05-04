import { isAdminUser, jsonResponse, readSessionUser, sanitizeUserProfile } from "./_auth.js";
import { readUsers, saveUsers } from "./_users.js";

export async function onRequestGet({ request, env }) {
  const sessionUser = await readSessionUser(request, env);
  if (!sessionUser) {
    return jsonResponse({ error: "请先登录。" }, 401, { "Set-Cookie": "getinge_dashboard_session=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT" });
  }
  if (!isAdminUser(sessionUser)) {
    return jsonResponse({ error: "仅管理员可执行此操作。" }, 403);
  }

  const users = await readUsers(env);
  return jsonResponse({ users: users.map(sanitizeUserProfile) });
}

export async function onRequestPost({ request, env }) {
  const sessionUser = await readSessionUser(request, env);
  if (!sessionUser) {
    return jsonResponse({ error: "请先登录。" }, 401, { "Set-Cookie": "getinge_dashboard_session=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT" });
  }
  if (!isAdminUser(sessionUser)) {
    return jsonResponse({ error: "仅管理员可执行此操作。" }, 403);
  }

  const body = await request.json().catch(() => ({}));
  const users = await saveUsers(env, Array.isArray(body.users) ? body.users : []);
  return jsonResponse({ users: users.map(sanitizeUserProfile) });
}
