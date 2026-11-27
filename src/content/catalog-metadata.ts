import type { Metadata } from "next";
import { getCatalog } from "./catalog";
import { productsPath } from "./catalog-routes";
import { homePaths, type Locale } from "./locale";

export function getCatalogMetadata(locale: Locale): Metadata {
  const { copy } = getCatalog(locale);
  const languages = Object.fromEntries((Object.keys(homePaths) as Locale[]).map((lang) => [lang, productsPath(lang)]));
  return {
    title: copy.title + " | AMAC Group",
    description: copy.intro,
    alternates: { canonical: productsPath(locale), languages: { ...languages, "x-default": productsPath("en") } },
  };
}
