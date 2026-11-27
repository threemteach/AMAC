import type { MetadataRoute } from "next";
import { getCatalog } from "../content/catalog";
import { productPath, productsPath } from "../content/catalog-routes";
import { getJournal } from "../content/journal";
import { journalPath } from "../content/journal-routes";
import { aboutPath, contactPath, homePaths, type Locale } from "../content/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.AMAC_SITE_URL;
  if (!origin) return [];
  return (Object.keys(homePaths) as Locale[]).flatMap((locale) => [
    homePaths[locale], productsPath(locale), aboutPath(locale), contactPath(locale), journalPath(locale),
    ...getCatalog(locale).products.map(({ id }) => productPath(locale, id)),
    ...getJournal(locale).articles.map(({ id }) => journalPath(locale, id)),
  ]).map((path) => ({ url: new URL(path, origin).href }));
}
