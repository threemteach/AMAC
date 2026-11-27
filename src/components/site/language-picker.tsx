"use client";

import { useRef } from "react";
import { productsPath, productPath, type SiteView } from "../../content/catalog-routes";
import { enquiryPath, type EnquiryKind } from "../../content/enquiry-routes";
import { journalPath } from "../../content/journal-routes";
import { aboutPath, contactPath, homePaths, languageNames, localeLabels, type Locale } from "../../content/locale";
import styles from "./site-header.module.css";

export function LanguagePicker({ locale, view, slug, enquiryKind, availableLocales }: {
  locale: Locale; view: SiteView; slug?: string; enquiryKind?: EnquiryKind; availableLocales?: Locale[];
}) {
  const picker = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  function link(language: Locale) {
    if (view === "home") return homePaths[language];
    if (view === "products") return productsPath(language);
    if (view === "about") return aboutPath(language);
    if (view === "contact") return enquiryKind && enquiryKind !== "product" ? enquiryPath(language, enquiryKind) : contactPath(language);
    if (view === "journal" || view === "article") return journalPath(language, availableLocales?.includes(language) ? slug : undefined);
    return slug ? productPath(language, slug) : productsPath(language);
  }

  return (
    <details
      ref={picker}
      className={styles.languagePicker}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !picker.current?.open) return;
        event.preventDefault();
        picker.current.open = false;
        trigger.current?.focus();
      }}
    >
      <summary ref={trigger} className={styles.language} aria-label={localeLabels[locale].language}>
        {languageNames[locale]}
      </summary>
      <ul className={styles.languageOptions}>
        {(Object.keys(languageNames) as Locale[]).map((language) => (
          <li key={language}>
            <a
              href={link(language)}
              hrefLang={language}
              lang={language}
              dir={language === "ar" ? "rtl" : "ltr"}
              aria-current={language === locale ? "page" : undefined}
            >
              {languageNames[language]}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
