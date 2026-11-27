import { createHash, randomUUID } from "node:crypto";
import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { isAdminConfigured, issueSession, sessionCookie, sessionDuration, validPassword, validSession } from "../../../components/admin/admin-auth";
import { maxUploadBytes, mediaPresets, type MediaPreset } from "../../../content/cms-options";
import { cmsSchema, type CmsContent } from "../../../content/cms-schema";
import { cmsDirectory, publishCms } from "../../../content/cms-store";

const loginWindow = 15 * 60 * 1000;
let login = { start: 0, failures: 0 };

function reply(data: object, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

async function boundedBody(request: NextRequest, limit: number) {
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

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const expected = process.env.AMAC_SITE_URL;
  if (expected && origin === new URL(expected).origin) return true;
  return origin === request.nextUrl.origin || [`https://${request.headers.get("host")}`, `http://${request.headers.get("host")}`].includes(origin);
}

function authorized(request: NextRequest) {
  return validSession(request.cookies.get(sessionCookie)?.value);
}

function cookieOptions(request: NextRequest, maxAge: number) {
  return {
    httpOnly: true, sameSite: "strict" as const, path: "/admin",
    secure: request.headers.get("origin")?.startsWith("https://") ?? true, maxAge,
  };
}

async function signIn(request: NextRequest) {
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

async function upload(request: NextRequest) {
  const raw = await boundedBody(request, maxUploadBytes + 65536);
  const form = await new Response(new Uint8Array(raw), { headers: { "Content-Type": request.headers.get("content-type")! } }).formData();
  const file = form.get("file");
  const type = form.get("preset");
  if (!(file instanceof File) || file.size === 0 || file.size > maxUploadBytes || typeof type !== "string" || !Object.hasOwn(mediaPresets, type)) {
    return reply({ error: "اختَر صورة PNG أو JPEG أو WebP بحجم حتى 8 MB." }, 400);
  }
  const preset = mediaPresets[type as MediaPreset];
  const pipeline = sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 24_000_000 });
  let output;
  try {
    const input = await pipeline.metadata();
    if (!input.format || !["jpeg", "png", "webp"].includes(input.format) || (input.pages ?? 1) !== 1) {
      return reply({ error: "تُقبل الصور الثابتة من نوع PNG أو JPEG أو WebP." }, 400);
    }
    const { width, height } = input.autoOrient;
    if (width < preset.minWidth || height < preset.minHeight) {
      return reply({ error: `مقاس الصورة ${width} × ${height}. الحد الأدنى ${preset.minWidth} × ${preset.minHeight} بكسل.` }, 422);
    }
    output = await pipeline.autoOrient().resize({
      width: preset.width, height: preset.height, fit: "inside", withoutEnlargement: true,
    }).webp({ quality: 86 }).toBuffer({ resolveWithObject: true });
  } catch {
    return reply({ error: "تعذّر قراءة الصورة أو تجاوزت الحد المسموح للأبعاد." }, 422);
  }
  const name = createHash("sha256").update(output.data).digest("hex") + ".webp";
  const directory = join(cmsDirectory, "media");
  mkdirSync(directory, { recursive: true });
  const path = join(directory, name);
  if (!existsSync(path)) {
    const temp = join(directory, randomUUID() + ".tmp");
    try {
      writeFileSync(temp, output.data);
      renameSync(temp, path);
    } finally {
      rmSync(temp, { force: true });
    }
  }
  return reply({ src: "/media/" + name, width: output.info.width, height: output.info.height, bytes: output.info.size });
}

function missingImage(content: CmsContent) {
  const images = [
    ...Object.values(content.media), ...content.certificates.map(({ image }) => image),
    ...content.products.flatMap((product) => [product.image, product.featuredImage, ...product.cuts.map(({ image }) => image)]),
    ...content.articles.map(({ image }) => image),
  ];
  return [...new Set(images)].find((path) => path && !existsSync(path.startsWith("/media/") ? join(cmsDirectory, path) : join(process.cwd(), "public", path)));
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return reply({ error: "الطلب غير مسموح." }, 403);
  try {
    if (request.nextUrl.searchParams.get("action") === "login") return await signIn(request);
    if (!authorized(request)) return reply({ error: "سجّل الدخول مرة أخرى." }, 401);
    return await upload(request);
  } catch (error) {
    if (error instanceof RangeError) return reply({ error: "حجم الطلب أكبر من الحد المسموح." }, 413);
    if (error instanceof SyntaxError || error instanceof TypeError) return reply({ error: "تعذّر قراءة الطلب." }, 400);
    throw error;
  }
}

export async function PUT(request: NextRequest) {
  if (!sameOrigin(request)) return reply({ error: "الطلب غير مسموح." }, 403);
  if (!authorized(request)) return reply({ error: "سجّل الدخول مرة أخرى." }, 401);
  let data: unknown;
  try {
    data = JSON.parse((await boundedBody(request, 6 * 1024 * 1024)).toString("utf8"));
  } catch (error) {
    return reply({ error: "تعذّر قراءة المحتوى أو تجاوز الحجم المسموح." }, error instanceof RangeError ? 413 : 400);
  }
  const checked = cmsSchema.safeParse(data);
  if (!checked.success) {
    const issue = checked.error.issues[0];
    return reply({ error: issue.path.join(" / ") + " — " + issue.message }, 422);
  }
  if (missingImage(checked.data)) return reply({ error: "في صورة مش موجودة. ارفعها مرة أخرى." }, 422);
  const next = publishCms(checked.data);
  if (!next) return reply({ error: "في نسخة أحدث اتنشرت. احتفظ بتعديلاتك وأعد تحميل اللوحة قبل النشر." }, 409);
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  return reply({ revision: next.revision });
}

export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) return reply({ error: "الطلب غير مسموح." }, 403);
  const response = reply({ signedOut: true });
  response.cookies.set(sessionCookie, "", cookieOptions(request, 0));
  return response;
}
