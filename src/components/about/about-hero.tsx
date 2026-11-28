import type { getAboutCopy } from "../../content/about";
import styles from "./about.module.css";

export function AboutHero({ copy }: { copy: Pick<ReturnType<typeof getAboutCopy>, "title" | "intro"> }) {
  return (
    <section className={styles.hero} aria-labelledby="about-title">
      <p className={styles.eyebrow}>AMAC GROUP</p>
      <h1 id="about-title" data-reveal>{copy.title}</h1>
      <p className={styles.intro} data-reveal>{copy.intro}</p>
    </section>
  );
}
