import "server-only";

import type { NextRequest } from "next/server";
import sharp from "sharp";
import { maxUploadBytes, mediaPresets, type MediaPreset } from "../../content/cms-options";
import { storeMedia } from "../cms/media";
import { boundedBody, reply } from "./http";

export async function uploadMedia(request: NextRequest) {
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
  const name = storeMedia(output.data);
  return reply({ src: "/media/" + name, width: output.info.width, height: output.info.height, bytes: output.info.size });
}
