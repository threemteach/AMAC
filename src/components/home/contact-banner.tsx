import Image from "next/image";
import Link from "next/link";
import { getHomeContent } from "../../content/home-localized";
import { contactPath, type Locale } from "../../content/locale";
import { bricolage, myriadPro } from "./home-fonts";
import styles from "./contact-banner.module.css";

export function ContactBanner({ locale, message }: {
  locale: Locale;
  message?: { heading: string[]; description: string; detail: string };
}) {
  const { contactBanner } = getHomeContent(locale);
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
        {(message?.heading ?? contactBanner.heading).map((line) => <span key={line}>{line}{" "}</span>)}
      </h2>
      <p className={styles.description}>
        {message?.description ?? contactBanner.description}
        {message && <><br />{message.detail}</>}
      </p>
      <Link className={styles.action} href={contactPath(locale) + "#enquiry"}>{contactBanner.actionLabel}</Link>
    </section>
  );
}
