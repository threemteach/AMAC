import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cmsDirectory } from "../../../content/cms-store";

export async function GET(_request: Request, { params }: RouteContext<"/media/[name]">) {
  const { name } = await params;
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
