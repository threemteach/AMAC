import Image from "next/image";
import { homeContent } from "../../content/home";
import { bricolage, myriadPro } from "./home-fonts";
import styles from "./contact-banner.module.css";

const { contactBanner } = homeContent;

export function ContactBanner() {
  return (
    <section
      id="lets-connect"
      className={`${styles.section} ${bricolage.variable} ${myriadPro.variable}`}
      aria-labelledby="contact-banner-label contact-banner-heading"
    >
      <Image
        className={styles.watermark}
        src={contactBanner.watermark}
        width={520}
        height={546}
        alt=""
        unoptimized
      />
      <p id="contact-banner-label" className={styles.eyebrow}>{contactBanner.eyebrow}</p>
      <h2 data-reveal id="contact-banner-heading" className={styles.heading}>
        {contactBanner.heading.map((line) => <span key={line}>{line}{" "}</span>)}
      </h2>
      <p className={styles.description}>{contactBanner.description}</p>
      <span className={styles.action} aria-disabled="true">{contactBanner.actionLabel}</span>
    </section>
  );
}
