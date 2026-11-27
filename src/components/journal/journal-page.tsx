import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getJournal } from "../../content/journal";
import { journalPath, type JournalArticle } from "../../content/journal-routes";
import { homePaths, type Locale } from "../../content/locale";
import { ContactBanner } from "../home/contact-banner";
import { HomeMotion } from "../home/home-motion";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";
import { JournalList } from "./journal-list";
import styles from "./journal.module.css";

export function getJournalMetadata(locale: Locale, id?: JournalArticle): Metadata {
  const { copy, articles } = getJournal(locale);
  const article = articles.find((entry) => entry.id === id);
  const title = (article?.title ?? copy.title) + " | AMAC Group";
  const description = article?.sections[0]?.[1] ?? copy.intro;
  const path = journalPath(locale, id);
  const languages = Object.fromEntries((Object.keys(homePaths) as Locale[]).map((lang) => [lang, journalPath(lang, id)]));
  return {
    title,
    description,
    alternates: { canonical: path, languages: { ...languages, "x-default": journalPath("en", id) } },
    openGraph: article ? { type: "article", title, description, url: path } : undefined,
  };
}

export function JournalPage({ locale, id }: { locale: Locale; id?: JournalArticle }) {
  const journal = getJournal(locale);
  const { copy, articles } = journal;
  const article = articles.find((entry) => entry.id === id);

  return (
    <>
      <SiteHeader locale={locale} view={id ?? "journal"} />
      <main>
        {article ? (
          <article className={styles.article}>
            <Link className={styles.back} href={journalPath(locale)}>
              <span aria-hidden="true">{locale === "ar" ? "→" : "←"}</span> {copy.back}
            </Link>
            <p className={styles.eyebrow}>{copy.tag}</p>
            <h1 data-reveal>{article.title}</h1>
            <div className={styles.articlePhoto} data-reveal>
              <Image src={article.image} alt="" fill sizes="(max-width: 850px) 92vw, 790px" preload />
            </div>
            <div className={styles.articleBody}>
              {article.sections.map(([heading, paragraph]) => (
                <section key={heading} data-reveal><h2>{heading}</h2><p>{paragraph}</p></section>
              ))}
            </div>
          </article>
        ) : (
          <>
            <section className={styles.hero}>
              <p className={styles.eyebrow}>AMAC GROUP</p>
              <h1 data-reveal>{copy.title}</h1>
              <p className={styles.intro} data-reveal>{copy.intro}</p>
            </section>
            <JournalList locale={locale} journal={journal} />
          </>
        )}
        <ContactBanner locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <HomeMotion key={id ?? "journal"} />
    </>
  );
}
