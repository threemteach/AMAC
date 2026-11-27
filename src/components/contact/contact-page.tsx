import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { catalogCopy } from "../../content/catalog-copy";
import { contactCopy } from "../../content/contact";
import { enquiryPath, type EnquiryKind } from "../../content/enquiry-routes";
import { contactPath, homePaths, type Locale } from "../../content/locale";
import { enquiryText } from "../../content/product-details";
import { getFooterContent } from "../../content/site";
import { ContactBanner } from "../home/contact-banner";
import { HomeMotion } from "../home/home-motion";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";
import { ContactEnquiry } from "./contact-enquiry";
import styles from "./contact.module.css";

export function getContactMetadata(locale: Locale): Metadata {
  const copy = contactCopy[locale];
  const languages = Object.fromEntries((Object.keys(homePaths) as Locale[]).map((lang) => [lang, contactPath(lang)]));
  return {
    title: copy.title + " | AMAC Group",
    description: copy.intro,
    alternates: { canonical: contactPath(locale), languages: { ...languages, "x-default": contactPath("en") } },
  };
}

export function ContactPage({ locale, kind }: { locale: Locale; kind: EnquiryKind }) {
  const copy = contactCopy[locale];
  const { location: city, contacts: [generalLabel, exportLabel] } = getFooterContent(locale);
  const kindLabels = { general: generalLabel, export: exportLabel, product: copy.formTitle };
  const recipient = (kind === "general" ? process.env.AMAC_GENERAL_EMAIL : process.env.AMAC_EXPORT_EMAIL)?.trim();
  const channels = [
    { icon: "location", title: copy.location, lines: [city, copy.address] },
    { icon: "email", title: copy.email, lines: [] },
    { icon: "phone", title: copy.phone, lines: [copy.phoneNote] },
  ];

  return (
    <>
      <SiteHeader locale={locale} view="contact" enquiryKind={kind} />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="contact-title">
          <p className={styles.eyebrow}>AMAC GROUP</p>
          <h1 id="contact-title" data-reveal>{copy.title}</h1>
          <p className={styles.intro} data-reveal>{copy.intro}</p>
        </section>

        <div className={styles.layout}>
          <section className={styles.details} aria-labelledby="conversation-title" data-reveal>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h2 id="conversation-title">{copy.heading.map((line) => <span key={line}>{line}{" "}</span>)}</h2>
            <ul className={styles.channels}>
              {channels.map(({ icon, title, lines }) => (
                <li key={icon}>
                  <span className={styles.icon}>
                    <Image src={"/images/contact/" + icon + ".svg"} width={30} height={30} alt="" unoptimized />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    {lines.map((line) => <p key={line}>{line}</p>)}
                    {icon === "email" && (
                      <>
                        <p><Link href={enquiryPath(locale, "general")}>{generalLabel}</Link></p>
                        <p><Link href={enquiryPath(locale, "export")}>{exportLabel}</Link></p>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <ContactEnquiry
            key={kind}
            locale={locale}
            kind={kind}
            kindLabels={kindLabels}
            recipient={recipient}
            copy={copy}
            products={catalogCopy[locale].productTitles}
            dialogLabels={enquiryText[locale]}
          />
        </div>

        <section className={styles.location} aria-labelledby="location-title">
          <div data-reveal>
            <p>{copy.location}</p>
            <h2 id="location-title">{city}</h2>
            <p>{copy.locationDescription}</p>
          </div>
        </section>

        <ContactBanner locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <HomeMotion />
    </>
  );
}
