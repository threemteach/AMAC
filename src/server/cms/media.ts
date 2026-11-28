import "server-only";

import { createHash, randomUUID } from "node:crypto";
import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { CmsContent } from "./schema";
import { cmsDirectory } from "./store";

export function storeMedia(data: Buffer) {
  const name = createHash("sha256").update(data).digest("hex") + ".webp";
  const directory = join(cmsDirectory, "media");
  mkdirSync(directory, { recursive: true });
  const path = join(directory, name);
  if (!existsSync(path)) {
    const temp = join(directory, randomUUID() + ".tmp");
    try {
      writeFileSync(temp, data);
      renameSync(temp, path);
    } finally {
      rmSync(temp, { force: true });
    }
  }
  return name;
}

export function missingImage(content: CmsContent) {
  const images = [
    ...Object.values(content.media), ...content.certificates.map(({ image }) => image),
    ...content.products.flatMap((product) => [product.image, product.featuredImage, ...product.cuts.map(({ image }) => image)]),
    ...content.articles.map(({ image }) => image),
  ];
  return [...new Set(images)].find((path) => path && !existsSync(path.startsWith("/media/") ? join(cmsDirectory, path) : join(process.cwd(), "public", path)));
}

export async function serveMedia(name: string) {
  if (!/^[a-f0-9]{64}\.webp$/.test(name)) return new Response(null, { status: 404 });
  try {
    const image = await readFile(join(cmsDirectory, "media", name));
    return new Response(new Uint8Array(image), {
      headers: {
        "Content-Type": "image/webp", "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return new Response(null, { status: 404 });
    throw error;
  }
}
