import type { ContactCopy } from "../../content/contact";
import styles from "./contact.module.css";

export function ContactHero({ copy }: { copy: Pick<ContactCopy, "title" | "intro"> }) {
  return (
    <section className={styles.hero} aria-labelledby="contact-title">
      <p className={styles.eyebrow}>AMAC GROUP</p>
      <h1 id="contact-title" data-reveal>{copy.title}</h1>
      <p className={styles.intro} data-reveal>{copy.intro}</p>
    </section>
  );
}
