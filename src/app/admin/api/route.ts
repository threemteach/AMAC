import type { NextRequest } from "next/server";
import { authorized, reply, sameOrigin } from "../../../server/admin/http";
import { publishContent } from "../../../server/admin/publish-content";
import { signIn, signOut } from "../../../server/admin/session";
import { uploadMedia } from "../../../server/admin/upload-media";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return reply({ error: "الطلب غير مسموح." }, 403);
  try {
    if (request.nextUrl.searchParams.get("action") === "login") return await signIn(request);
    if (!authorized(request)) return reply({ error: "سجّل الدخول مرة أخرى." }, 401);
    return await uploadMedia(request);
  } catch (error) {
    if (error instanceof RangeError) return reply({ error: "حجم الطلب أكبر من الحد المسموح." }, 413);
    if (error instanceof SyntaxError || error instanceof TypeError) return reply({ error: "تعذّر قراءة الطلب." }, 400);
    throw error;
  }
}

export async function PUT(request: NextRequest) {
  if (!sameOrigin(request)) return reply({ error: "الطلب غير مسموح." }, 403);
  if (!authorized(request)) return reply({ error: "سجّل الدخول مرة أخرى." }, 401);
  return publishContent(request);
}

export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) return reply({ error: "الطلب غير مسموح." }, 403);
  return signOut(request);
}
