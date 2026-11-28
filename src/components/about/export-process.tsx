import type { getAboutCopy } from "../../content/about";
import { bricolage } from "../shared/site-fonts";
import styles from "./about.module.css";

export function ExportProcess({ copy }: { copy: Pick<ReturnType<typeof getAboutCopy>, "steps" | "processHeading"> }) {
  return (
    <section className={`${styles.process} ${bricolage.variable}`} aria-labelledby="process-title">
      <h2 id="process-title" data-reveal>
        {copy.processHeading.map((line) => <span key={line}>{line}{" "}</span>)}
      </h2>
      <ol className={styles.steps}>
        {copy.steps.map(([title, description], index) => (
          <li key={title} data-reveal>
            <span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{title}</h3><p>{description}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
