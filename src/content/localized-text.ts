import type { LocalizedText } from "../server/cms/schema";
import type { Locale } from "./locale";

export function contentText(value: LocalizedText | undefined, locale: Locale, fallback = "") {
  return value?.[locale] || fallback || value?.en || "";
}

export function lines(value: string) {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}
