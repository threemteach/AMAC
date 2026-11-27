import type { CSSProperties } from "react";
import Image from "next/image";
import { homeContent } from "../../content/home";
import { bricolage, myriadPro } from "./home-fonts";
import styles from "./quality-confidence.module.css";

const { qualityConfidence } = homeContent;
const logoRepeats = 8;

export function QualityConfidence() {
  return (
    <section
      id="quality-confidence"
      className={`${styles.section} ${bricolage.variable} ${myriadPro.variable}`}
      aria-labelledby="quality-heading"
    >
      <p className={styles.eyebrow}>{qualityConfidence.eyebrow}</p>
      <h2 id="quality-heading" className={styles.heading}>
        {qualityConfidence.heading.map((line) => <span key={line}>{line}{" "}</span>)}
      </h2>
      <p className={styles.description}>{qualityConfidence.description}</p>

      <div className={styles.marquee}>
        <div
          className={styles.track}
          style={{ "--logo-repeats": logoRepeats } as CSSProperties}
        >
          {Array.from({ length: logoRepeats }, (_, repeat) => (
            <ul
              className={styles.logos}
              key={repeat}
              aria-label="Industry standards shown for reference"
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
      </div>

      <p className={styles.note}>{qualityConfidence.standardsNote}</p>
      <span className={styles.action} aria-disabled="true">{qualityConfidence.actionLabel}</span>
    </section>
  );
}
