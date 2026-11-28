import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getHomeContent } from "../../content/home-localized";
import { localeLabels, type Locale } from "../../content/locale";
import { enquiryPath } from "../../content/enquiry-routes";
import { bricolage, myriadPro } from "./site-fonts";
import styles from "./quality-confidence.module.css";

const logoRepeats = 8;

export function QualityConfidence({ locale }: { locale: Locale }) {
  const { qualityConfidence } = getHomeContent(locale);
  return (
    <section
      id="quality-confidence"
      className={`${styles.section} ${bricolage.variable} ${myriadPro.variable}`}
      aria-labelledby="quality-heading"
    >
      <p className={styles.eyebrow}>{qualityConfidence.eyebrow}</p>
      <h2 data-reveal id="quality-heading" className={styles.heading}>
        {qualityConfidence.heading.map((line) => <span key={line}>{line}{" "}</span>)}
      </h2>
      <p className={styles.description}>{qualityConfidence.description}</p>

      {qualityConfidence.standards.length > 0 && <div className={styles.marquee} data-reveal>
        <div
          className={styles.track}
          style={{ "--logo-repeats": logoRepeats } as CSSProperties}
        >
          {Array.from({ length: logoRepeats }, (_, repeat) => (
            <ul
              className={styles.logos}
              key={repeat}
              aria-label={localeLabels[locale].standards}
              aria-hidden={repeat > 0}
            >
              {qualityConfidence.standards.map((standard) => (
                <li className={standard.shape === "seal" ? styles.seal : styles.wordmark} key={standard.name}>
                  <Image
                    className={styles.logo}
                    src={standard.image}
                    alt={repeat === 0 ? standard.name : ""}
                    width={300}
                    height={164}
                    unoptimized
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>}

      <p className={styles.note}>{qualityConfidence.standardsNote}</p>
      <Link className={styles.action} href={enquiryPath(locale, "general")}>{qualityConfidence.actionLabel}</Link>
    </section>
  );
}
