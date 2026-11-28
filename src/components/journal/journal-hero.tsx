import type { JournalCopy } from "../../content/journal";
import styles from "./journal.module.css";

export function JournalHero({ copy }: { copy: Pick<JournalCopy, "title" | "intro"> }) {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>AMAC GROUP</p>
      <h1 data-reveal>{copy.title}</h1>
      <p className={styles.intro} data-reveal>{copy.intro}</p>
    </section>
  );
}
