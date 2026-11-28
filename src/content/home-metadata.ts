import type { Metadata } from "next";
import { homeDescriptions } from "./translations/home";
import { homePaths, type Locale } from "./locale";
import { contentText } from "./localized-text";
import { getCms } from "../server/cms/store";

export function getHomeMetadata(locale: Locale): Metadata {
  const [title, description] = homeDescriptions[locale];
  const seo = getCms()?.seo;
  const siteUrl = process.env.AMAC_SITE_URL;
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: contentText(seo?.title, locale, title),
    description: contentText(seo?.description, locale, description),
    keywords: contentText(seo?.keywords, locale).split(/[,،\n]/).map((keyword) => keyword.trim()).filter(Boolean),
    alternates: { canonical: homePaths[locale], languages: { ...homePaths, "x-default": homePaths.en } },
  };
}
