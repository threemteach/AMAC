import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { cache } from "react";
import type { Locale } from "./locale";
import type { CmsContent, LocalizedText } from "./cms-schema";

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

export function contentText(value: LocalizedText | undefined, locale: Locale, fallback = "") {
  return value?.[locale] || fallback || value?.en || "";
}

export function lines(value: string) {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

export function enquiryRecipient(kind: "general" | "export" | "product") {
  const contacts = getCms()?.contacts;
  if (contacts) return (kind === "general" ? contacts.general : contacts.export) || undefined;
  return kind === "general"
    ? process.env.AMAC_GENERAL_EMAIL?.trim()
    : process.env.AMAC_EXPORT_EMAIL?.trim();
}
