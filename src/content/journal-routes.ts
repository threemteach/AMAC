import { homePaths, type Locale } from "./locale";

export const journalIds = ["farm-to-freezer", "iqf", "export-partner"] as const;
export type JournalArticle = string;

export function journalPath(locale: Locale, article?: JournalArticle) {
  const base = locale === "en" ? "/journal" : homePaths[locale] + "/journal";
  return article ? base + "/" + article : base;
}
