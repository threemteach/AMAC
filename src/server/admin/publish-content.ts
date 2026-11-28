import "server-only";

import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { missingImage } from "../cms/media";
import { cmsSchema } from "../cms/schema";
import { publishCms } from "../cms/store";
import { boundedBody, reply } from "./http";

export async function publishContent(request: NextRequest) {
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
