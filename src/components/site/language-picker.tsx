"use client";

import { useRef } from "react";
import { homePaths, languageNames, localeLabels, type Locale } from "../../content/locale";
import styles from "./site-header.module.css";

export function LanguagePicker({ locale }: { locale: Locale }) {
  const picker = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);

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
              href={homePaths[language]}
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
