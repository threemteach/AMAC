import { bricolage, myriadPro } from "../shared/site-fonts";
import Image from "next/image";
import { getHomeContent } from "../../content/home-localized";
import type { Locale } from "../../content/locale";
import styles from "./fields-intro.module.css";

export function FieldsIntro({ locale }: { locale: Locale }) {
  const { fieldsIntro } = getHomeContent(locale);
  return (
    <section
      className={`${styles.section} ${bricolage.variable} ${myriadPro.variable}`}
      aria-labelledby="fields-heading"
    >
      <Image
        className={styles.watermark}
        src={fieldsIntro.watermark}
        width={520}
        height={546}
        alt=""
        unoptimized
      />
      <div className={styles.content} data-reveal>
        <p className={styles.eyebrow}>{fieldsIntro.eyebrow}</p>
        <h2 id="fields-heading" className={styles.heading}>
          {fieldsIntro.heading.map((line) => <span key={line}>{line}{" "}</span>)}
        </h2>
        <p className={styles.description}>
          {fieldsIntro.description.map((line) => <span key={line}>{line}{" "}</span>)}
        </p>
        <a className={styles.action} href="#ingredient-collections">{fieldsIntro.actionLabel}</a>
      </div>
    </section>
  );
}
