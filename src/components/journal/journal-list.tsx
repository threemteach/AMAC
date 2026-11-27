"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { getJournal } from "../../content/journal";
import { journalPath } from "../../content/journal-routes";
import type { Locale } from "../../content/locale";
import styles from "./journal.module.css";

export function JournalList({ locale, journal }: { locale: Locale; journal: ReturnType<typeof getJournal> }) {
  const { copy, articles } = journal;
  const [filter, setFilter] = useState<"all" | "company" | "season">("all");
  const [order, setOrder] = useState("featured");
  const [limit, setLimit] = useState(3);
  const filtered = articles.filter((article) => filter === "all" || article.category === filter);
  const collator = new Intl.Collator(locale);
  if (order !== "featured") {
    const direction = order === "asc" ? 1 : -1;
    filtered.sort((left, right) => direction * collator.compare(left.title, right.title));
  }

  return (
    <section className={styles.collection} aria-labelledby="journal-collection">
      <h2 id="journal-collection" data-reveal>{copy.heading}</h2>
      <div className={styles.controls}>
        <div className={styles.filters} role="group" aria-label={copy.heading}>
          {(["all", "company", "season"] as const).map((option) => (
            <button key={option} type="button" aria-pressed={filter === option} onClick={() => {
              setFilter(option);
              setLimit(3);
            }}>{copy[option]}</button>
          ))}
        </div>
        <select aria-label={copy.sort} value={order} onChange={(event) => setOrder(event.target.value)}>
          <option value="featured">{copy.featured}</option>
          <option value="asc">A–Z</option>
          <option value="desc">Z–A</option>
        </select>
      </div>
      <ul className={styles.cards}>
        {filtered.slice(0, limit).map((article) => (
          <li className={styles.card} key={article.id} data-reveal>
            <div className={styles.cover}>
              <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 600px) 92vw, (max-width: 920px) 44vw, 410px" />
            </div>
            <div className={styles.cardBody}>
              <p className={styles.tag}>{copy.tag}</p>
              <h3>{article.title}</h3>
              <p className={styles.summary}>{article.summary || copy.summary}</p>
              <Link href={journalPath(locale, article.id)} className={styles.read} aria-label={copy.read + ": " + article.title}>
                {copy.read}
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {filter === "all" && (
        <button type="button" className={styles.more} disabled={limit >= filtered.length} onClick={() => setLimit((current) => current + 3)}>
          {copy.more} <span aria-hidden="true">↘</span>
        </button>
      )}
    </section>
  );
}
