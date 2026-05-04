import {
  clearSessionCookie,
  createSessionCookie,
  hashPassword,
  jsonResponse,
  normalizedText,
  readSessionUser,
  sanitizeUserProfile,
  verifyPassword
} from "./_auth.js";
import { readUsers, updateUserPassword } from "./_users.js";

export async function onRequestGet({ request, env }) {
  try {
    const user = await readSessionUser(request, env);
    if (!user) {
      return jsonResponse({ error: "未登录。" }, 401, { "Set-Cookie": clearSessionCookie() });
    }
    return jsonResponse({ user });
  } catch (error) {
    return jsonResponse({ error: error.message || "会话读取失败。" }, 500);
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = normalizedText(body.username).toLowerCase();
    const password = normalizedText(body.password);
    const users = await readUsers(env);
    const matchedUser = users.find((user) => normalizedText(user.username).toLowerCase() === username);

    if (!matchedUser || !(await verifyPassword(password, matchedUser.passwordHash))) {
      return jsonResponse({ error: "用户名或密码不正确。" }, 401);
    }

    return jsonResponse(
      { user: sanitizeUserProfile(matchedUser) },
      200,
      { "Set-Cookie": await createSessionCookie(matchedUser, env) }
    );
  } catch (error) {
    return jsonResponse({ error: error.message || "登录失败。" }, 500);
  }
}

export async function onRequestDelete() {
  return jsonResponse({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
}

export async function onRequestPatch({ request, env }) {
  try {
    const sessionUser = await readSessionUser(request, env);
    if (!sessionUser) {
      return jsonResponse({ error: "请先登录。" }, 401, { "Set-Cookie": clearSessionCookie() });
    }

    const body = await request.json().catch(() => ({}));
    const password = normalizedText(body.password);
    if (password.length < 4) {
      return jsonResponse({ error: "新密码至少需要 4 个字符。" }, 400);
    }

    await updateUserPassword(env, sessionUser.username, await hashPassword(password));
    return jsonResponse({ user: sanitizeUserProfile(sessionUser) });
  } catch (error) {
    return jsonResponse({ error: error.message || "密码更新失败。" }, 500);
  }
}
