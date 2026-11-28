import type { Metadata } from "next";
import { getCatalog } from "../../content/catalog/catalog";
import { getContactCopy } from "../../content/contact";
import { generalEnquiryPlaceholder } from "../../content/translations/contact";
import { contentText } from "../../content/localized-text";
import { getCms } from "../../server/cms/store";
import { enquiryRecipient } from "../../server/cms/contacts";
import type { EnquiryKind } from "../../content/enquiry-routes";
import { contactPath, homePaths, type Locale } from "../../content/locale";
import { enquiryText } from "../../content/translations/product";
import { getFooterContent } from "../../content/site";
import { ContactBanner } from "../shared/contact-banner";
import { SiteMotion } from "../shared/site-motion";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";
import { ContactDetails } from "./contact-details";
import { ContactHero } from "./contact-hero";
import { ContactLocation } from "./contact-location";
import { ContactEnquiry } from "./contact-enquiry";
import styles from "./contact.module.css";

export function getContactMetadata(locale: Locale): Metadata {
  const copy = getContactCopy(locale);
  const languages = Object.fromEntries((Object.keys(homePaths) as Locale[]).map((lang) => [lang, contactPath(lang)]));
  return {
    title: copy.title + " | AMAC Group",
    description: copy.intro,
    alternates: { canonical: contactPath(locale), languages: { ...languages, "x-default": contactPath("en") } },
  };
}

export function ContactPage({ locale, kind }: { locale: Locale; kind: EnquiryKind }) {
  const copy = getContactCopy(locale);
  const footer = getFooterContent(locale);
  const city = contentText(getCms()?.copy.footerLocation, locale, footer.location);
  const [generalLabel, exportLabel] = footer.contacts;
  const kindLabels = { general: generalLabel, export: exportLabel, product: copy.formTitle };
  const recipient = enquiryRecipient(kind);

  return (
    <>
      <SiteHeader locale={locale} view="contact" enquiryKind={kind} />
      <main className={styles.page}>
        <ContactHero copy={copy} />

        <div className={styles.layout}>
          <ContactDetails copy={copy} city={city} locale={locale} generalLabel={generalLabel} exportLabel={exportLabel} />
          <ContactEnquiry
            key={kind}
            locale={locale}
            kind={kind}
            kindLabels={kindLabels}
            recipient={recipient}
            generalPlaceholder={generalEnquiryPlaceholder[locale]}
            copy={copy}
            products={getCatalog(locale).products.map(({ title }) => title)}
            dialogLabels={enquiryText[locale]}
          />
        </div>

        <ContactLocation copy={copy} city={city} />

        <ContactBanner locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <SiteMotion />
    </>
  );
}
