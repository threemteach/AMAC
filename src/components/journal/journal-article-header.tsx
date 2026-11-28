import Image from "next/image";
import Link from "next/link";
import type { getJournal, JournalCopy } from "../../content/journal";
import { journalPath } from "../../content/journal-routes";
import type { Locale } from "../../content/locale";
import styles from "./journal.module.css";

export function JournalArticleHeader({ locale, copy, article }: {
  locale: Locale;
  copy: Pick<JournalCopy, "back" | "tag">;
  article: Pick<ReturnType<typeof getJournal>["articles"][number], "title" | "image" | "imageAlt">;
}) {
  return (
    <>
      <Link className={styles.back} href={journalPath(locale)}>
        <span aria-hidden="true">{locale === "ar" ? "→" : "←"}</span> {copy.back}
      </Link>
      <p className={styles.eyebrow}>{copy.tag}</p>
      <h1 data-reveal>{article.title}</h1>
      <div className={styles.articlePhoto} data-reveal>
        <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 850px) 92vw, 790px" preload />
      </div>
    </>
  );
}
