import Image from "next/image";
import { getHomeContent } from "../../content/home-localized";
import type { Locale } from "../../content/locale";
import { bricolage, myriadPro } from "./home-fonts";
import styles from "./our-story.module.css";

export function OurStory({ locale }: { locale: Locale }) {
  const { story } = getHomeContent(locale);
  return (
    <section
      id="our-story"
      className={`${styles.section} ${bricolage.variable} ${myriadPro.variable}`}
      aria-labelledby="story-heading"
    >
      <div className={styles.layout} data-reveal>
        <div className={styles.frame}>
          <Image
            className={styles.photo}
            src={story.image}
            alt={story.imageAlt}
            fill
            sizes="(max-width: 820px) 53vw, (max-width: 1400px) 47vw, 648px"
          />
        </div>

        <div className={styles.content}>
          <div>
            <p className={styles.eyebrow}>{story.eyebrow}</p>
            <h2 id="story-heading" className={styles.heading}>
              {story.heading.map((line) => <span key={line}>{line}{" "}</span>)}
            </h2>
          </div>
          <ol className={styles.points}>
            {story.points.map((point, index) => (
              <li key={point} className={styles.point}>
                <span className={styles.number} aria-hidden="true">{index + 1}</span>
                <p>{point}</p>
              </li>
            ))}
          </ol>
          <span className={styles.action} aria-disabled="true">{story.actionLabel}</span>
        </div>
      </div>
    </section>
  );
}
