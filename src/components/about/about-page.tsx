import type { Metadata } from "next";
import { getAboutCopy } from "../../content/about";
import { aboutPath, homePaths, type Locale } from "../../content/locale";
import { ContactBanner } from "../shared/contact-banner";
import { SiteMotion } from "../shared/site-motion";
import { OurStory } from "../shared/our-story";
import { QualityConfidence } from "../shared/quality-confidence";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";
import { AboutHero } from "./about-hero";
import { CompanyOverview } from "./company-overview";
import { ExportProcess } from "./export-process";
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
        <AboutHero copy={copy} />
        <OurStory locale={locale} actionHref="#who-we-are" />

        <CompanyOverview copy={copy} />

        <CoreValues heading={copy.valuesHeading} values={copy.values} />

        <ExportProcess copy={copy} />

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
