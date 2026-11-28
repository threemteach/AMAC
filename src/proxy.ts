import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { contentSecurityPolicy, isProduction } from "./server/security-headers.mjs";

export function proxy(request: NextRequest) {
  if (!isProduction) return NextResponse.next();

  // The dashboard is already dynamic, so Next can apply a fresh nonce to its scripts.
  const policy = contentSecurityPolicy(randomBytes(16).toString("base64"));
  const headers = new Headers(request.headers);
  headers.set("Content-Security-Policy", policy);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", policy);
  return response;
}

export const config = { matcher: ["/admin"] };
