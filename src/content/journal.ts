import { getCms } from "../server/cms/store";
import { journalIds } from "./journal-routes";
import { contentText } from "./localized-text";
import { languageNames, type Locale } from "./locale";
import { journalCopy } from "./translations/journal";

export type { JournalCopy } from "./translations/journal";

const categories = ["season", "product", "company"] as const;
const covers = ["farm-to-freezer.webp", "iqf-cover.webp", "export-partner.webp"] as const;

export function getBaseJournal(locale: Locale) {
  const { articles, ...copy } = journalCopy[locale];
  return {
    copy,
    articles: articles.map((article, i) => ({
      ...article,
      id: journalIds[i],
      category: categories[i],
      image: "/images/journal/" + covers[i],
    })),
  };
}

export function getJournal(locale: Locale) {
  const base = getBaseJournal(locale);
  const cms = getCms();
  if (!cms) return {
    ...base, articles: base.articles.map((article) => ({
      ...article, summary: "", imageAlt: "", seoTitle: "", seoDescription: "",
      locales: Object.keys(languageNames) as Locale[],
    })),
  };
  const articles = cms.articles.filter((article) => article.published).flatMap((article) => {
    const locales = (Object.keys(languageNames) as Locale[]).filter((lang) => {
      const sections = article.body[lang];
      return article.title[lang] && sections?.length && sections.every(([title, paragraph]) => title && paragraph);
    });
    const title = article.title[locale];
    const sections = article.body[locale];
    if (!title || !sections || !locales.includes(locale)) return [];
    return [{
      id: article.slug, category: article.category, image: article.image, title, sections,
      summary: article.summary[locale] ?? "", imageAlt: article.imageAlt[locale] ?? "",
      seoTitle: article.seoTitle[locale] ?? "", seoDescription: article.seoDescription[locale] ?? "",
      locales,
    }];
  });
  return {
    copy: {
      ...base.copy, title: contentText(cms.copy.journalTitle, locale, base.copy.title),
      intro: contentText(cms.copy.journalIntro, locale, base.copy.intro),
    },
    articles,
  };
}
