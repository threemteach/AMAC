import type { Metadata } from "next";
import Image from "next/image";
import { getAboutCopy } from "../../content/about";
import { aboutPath, homePaths, type Locale } from "../../content/locale";
import { ContactBanner } from "../shared/contact-banner";
import { bricolage } from "../shared/site-fonts";
import { SiteMotion } from "../shared/site-motion";
import { OurStory } from "../shared/our-story";
import { QualityConfidence } from "../shared/quality-confidence";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";
import { CoreValues } from "./core-values";
import styles from "./about.module.css";

export function getAboutMetadata(locale: Locale): Metadata {
  const { title, intro } = getAboutCopy(locale);
  const languages = Object.fromEntries((Object.keys(homePaths) as Locale[]).map((lang) => [lang, aboutPath(lang)]));
  return {
    title: title + " | AMAC Group",
    description: intro,
    alternates: { canonical: aboutPath(locale), languages: { ...languages, "x-default": aboutPath("en") } },
  };
}

export function AboutPage({ locale }: { locale: Locale }) {
  const copy = getAboutCopy(locale);

  return (
    <>
      <SiteHeader locale={locale} view="about" />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="about-title">
          <p className={styles.eyebrow}>AMAC GROUP</p>
          <h1 id="about-title" data-reveal>{copy.title}</h1>
          <p className={styles.intro} data-reveal>{copy.intro}</p>
        </section>
        <OurStory locale={locale} actionHref="#who-we-are" />

        <section id="who-we-are" className={styles.company} aria-labelledby="company-title">
          <Image className={styles.watermark} src="/images/fields-watermark.svg" width={520} height={546} alt="" unoptimized />
          <div className={styles.companyInner} data-reveal>
            <h2 id="company-title">{copy.companyHeading}</h2>
            {copy.company.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className={`${styles.values} ${bricolage.variable}`} aria-labelledby="values-title">
          <h2 id="values-title" data-reveal>{copy.valuesHeading}</h2>
          <CoreValues values={copy.values} />
        </section>

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

        <QualityConfidence locale={locale} />
        <ContactBanner
          locale={locale}
          message={{ heading: copy.contactHeading, description: copy.contactDescription, detail: copy.partner }}
        />
      </main>
      <SiteFooter locale={locale} />
      <SiteMotion />
    </>
  );
}
