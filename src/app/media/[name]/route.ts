import { serveMedia } from "../../../server/cms/media";

export async function GET(_request: Request, { params }: RouteContext<"/media/[name]">) {
  const { name } = await params;
  return serveMedia(name);
}
