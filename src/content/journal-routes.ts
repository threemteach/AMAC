import { homePaths, type Locale } from "./locale";

export const journalIds = ["farm-to-freezer", "iqf", "export-partner"] as const;
export type JournalArticle = (typeof journalIds)[number];

export function isJournalArticle(value: string): value is JournalArticle {
  return journalIds.some((article) => article === value);
}

export function journalPath(locale: Locale, article?: JournalArticle) {
  const base = locale === "en" ? "/journal" : homePaths[locale] + "/journal";
  return article ? base + "/" + article : base;
}
