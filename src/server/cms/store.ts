import "server-only";

import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { cache } from "react";
import type { CmsContent } from "./schema";

export const cmsDirectory = resolve(/* turbopackIgnore: true */ process.env.AMAC_CONTENT_DIR || ".amac-content");
const contentFile = join(cmsDirectory, "content.json");

export function readCms() {
  try {
    return JSON.parse(readFileSync(contentFile, "utf8")) as CmsContent;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export const getCms = cache(readCms);

export function publishCms(content: CmsContent) {
  const revision = readCms()?.revision ?? 0;
  if (content.revision !== revision) return null;
  const next = { ...content, revision: revision + 1 };
  mkdirSync(cmsDirectory, { recursive: true });
  const temp = join(cmsDirectory, randomUUID() + ".tmp");
  try {
    writeFileSync(temp, JSON.stringify(next, null, 2), { mode: 0o600 });
    renameSync(temp, contentFile);
  } finally {
    rmSync(temp, { force: true });
  }
  return next;
}
