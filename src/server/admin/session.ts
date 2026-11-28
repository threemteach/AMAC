import "server-only";

import type { NextRequest } from "next/server";
import { isAdminConfigured, issueSession, revokeSession, sessionCookie, sessionDuration, validPassword } from "./auth";
import { boundedBody, cookieOptions, reply } from "./http";

const loginWindow = 15 * 60 * 1000;
let login = { start: 0, failures: 0 };

export async function signIn(request: NextRequest) {
  if (!isAdminConfigured()) return reply({ error: "لوحة الإدارة تحتاج إعداد كلمة المرور." }, 503);
  const now = Date.now();
  if (now - login.start > loginWindow) login = { start: now, failures: 0 };
  if (login.failures >= 8) return reply({ error: "محاولات كثيرة. جرّب بعد 15 دقيقة." }, 429);
  const body = JSON.parse((await boundedBody(request, 2048)).toString("utf8"));
  if (!validPassword(body?.password)) {
    login.failures++;
    return reply({ error: "كلمة المرور غير صحيحة." }, 401);
  }
  login.failures = 0;
  const response = reply({ signedIn: true });
  response.cookies.set(sessionCookie, issueSession(), cookieOptions(request, sessionDuration));
  return response;
}

export function signOut(request: NextRequest) {
  revokeSession(request.cookies.get(sessionCookie)?.value);
  const response = reply({ signedOut: true });
  response.cookies.set(sessionCookie, "", cookieOptions(request, 0));
  return response;
}
