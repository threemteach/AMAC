import type { getJournal } from "../../content/journal";
import styles from "./journal.module.css";

export function JournalArticleBody({ sections }: { sections: ReturnType<typeof getJournal>["articles"][number]["sections"] }) {
  return (
    <div className={styles.articleBody}>
      {sections.map(([heading, paragraph]) => (
        <section key={heading} data-reveal><h2>{heading}</h2><p>{paragraph}</p></section>
      ))}
    </div>
  );
}
