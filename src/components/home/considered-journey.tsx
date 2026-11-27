import Image from "next/image";
import { getHomeContent } from "../../content/home-localized";
import type { Locale } from "../../content/locale";
import { bricolage, myriadPro } from "./home-fonts";
import styles from "./considered-journey.module.css";

export function ConsideredJourney({ locale }: { locale: Locale }) {
  const { journey } = getHomeContent(locale);
  return (
    <section
      id="considered-journey"
      className={`${styles.section} ${bricolage.variable} ${myriadPro.variable}`}
      aria-labelledby="journey-heading"
    >
      <p className={styles.eyebrow}>{journey.eyebrow}</p>
      <h2 data-reveal id="journey-heading" className={styles.heading}>
        {journey.heading.map((line) => <span key={line}>{line}{" "}</span>)}
      </h2>
      <p className={styles.description}>{journey.description}</p>

      <ol className={styles.steps}>
        {journey.steps.map((step, index) => (
          <li className={styles.step} key={step.stage}>
            <div className={styles.copy}>
              <p className={styles.stage}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")} / </span>
                {step.stage}
              </p>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
            <div className={styles.iconPanel} aria-hidden="true">
              <Image className={styles.icon} {...step.icon} alt="" unoptimized />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
