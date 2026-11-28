import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJournal } from "../../content/journal";
import { journalPath, type JournalArticle } from "../../content/journal-routes";
import { homePaths, type Locale } from "../../content/locale";
import { ContactBanner } from "../shared/contact-banner";
import { SiteMotion } from "../shared/site-motion";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";
import { JournalArticleBody } from "./journal-article-body";
import { JournalArticleHeader } from "./journal-article-header";
import { JournalHero } from "./journal-hero";
import { JournalList } from "./journal-list";
import styles from "./journal.module.css";

export function getJournalMetadata(locale: Locale, id?: JournalArticle): Metadata {
  const { copy, articles } = getJournal(locale);
  const article = articles.find((entry) => entry.id === id);
  if (id && !article) notFound();
  const title = article?.seoTitle || (article?.title ?? copy.title) + " | AMAC Group";
  const description = article?.seoDescription || (article ? article.summary || article.sections[0]?.[1] : copy.intro);
  const path = journalPath(locale, id);
  const languages = Object.fromEntries((article?.locales ?? Object.keys(homePaths) as Locale[]).map((lang) => [lang, journalPath(lang, id)]));
  return {
    title,
    description,
    alternates: { canonical: path, languages: { ...languages, "x-default": journalPath("en", id) } },
    openGraph: article ? {
      type: "article", title, description, url: path,
      images: process.env.AMAC_SITE_URL ? [{ url: article.image, alt: article.imageAlt }] : undefined,
    } : undefined,
  };
}

export function JournalPage({ locale, id }: { locale: Locale; id?: JournalArticle }) {
  const journal = getJournal(locale);
  const { copy, articles } = journal;
  const article = articles.find((entry) => entry.id === id);
  if (id && !article) notFound();

  return (
    <>
      <SiteHeader locale={locale} view={article ? "article" : "journal"} slug={id} availableLocales={article?.locales} />
      <main>
        {article ? (
          <article className={styles.article}>
            <JournalArticleHeader locale={locale} copy={copy} article={article} />
            <JournalArticleBody sections={article.sections} />
          </article>
        ) : (
          <>
            <JournalHero copy={copy} />
            <JournalList locale={locale} journal={journal} />
          </>
        )}
        <ContactBanner locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <SiteMotion key={id ?? "journal"} />
    </>
  );
}
