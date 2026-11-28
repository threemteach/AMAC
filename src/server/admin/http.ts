import "server-only";

import { NextResponse, type NextRequest } from "next/server";
import { sessionCookie, validSession } from "./auth";

export function reply(data: object, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export async function boundedBody(request: NextRequest, limit: number) {
  if (Number(request.headers.get("content-length")) > limit) throw new RangeError();
  const stream = request.body?.getReader();
  const chunks: Buffer[] = [];
  let size = 0;
  if (stream) {
    try {
      for (;;) {
        const { value, done } = await stream.read();
        if (done) break;
        size += value.byteLength;
        if (size > limit) {
          await stream.cancel();
          throw new RangeError();
        }
        chunks.push(Buffer.from(value));
      }
    } finally {
      stream.releaseLock();
    }
  }
  return Buffer.concat(chunks, size);
}

export function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const expected = process.env.AMAC_SITE_URL;
  if (expected && origin === new URL(expected).origin) return true;
  return origin === request.nextUrl.origin || [`https://${request.headers.get("host")}`, `http://${request.headers.get("host")}`].includes(origin);
}

export function authorized(request: NextRequest) {
  return validSession(request.cookies.get(sessionCookie)?.value);
}

export function cookieOptions(request: NextRequest, maxAge: number) {
  return {
    httpOnly: true, sameSite: "strict" as const, path: "/admin",
    secure: process.env.NODE_ENV === "production" || request.headers.get("origin")?.startsWith("https://") === true,
    maxAge,
  };
}
