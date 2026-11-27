"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { enquiryKinds, enquiryPath, type EnquiryKind } from "../../content/enquiry-routes";
import type { Locale } from "../../content/locale";
import { CountryPicker } from "./country-picker";
import type { ContactCopy } from "../../content/contact";
import type { enquiryText } from "../../content/product-details";
import styles from "./contact.module.css";

const fields = [
  { key: "name", autoComplete: "name", required: true },
  { key: "company", autoComplete: "organization" },
  { key: "email", autoComplete: "email", type: "email", required: true },
  { key: "country" },
  { key: "product" },
  { key: "volume" },
  { key: "details" },
];

export function ContactEnquiry({
  locale,
  kind,
  kindLabels,
  recipient,
  generalPlaceholder,
  copy,
  products,
  dialogLabels,
}: {
  locale: Locale;
  kind: EnquiryKind;
  kindLabels: Record<EnquiryKind, string>;
  recipient?: string;
  generalPlaceholder: string;
  copy: ContactCopy;
  products: string[];
  dialogLabels: (typeof enquiryText)["en"];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const previewText = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const title = kindLabels[kind];
  const emailLink = recipient
    ? "mailto:" + encodeURIComponent(recipient).replace("%40", "@") + "?subject=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(message)
    : undefined;

  function preview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = fields.flatMap(({ key }, index) => {
      const content = String(form.get(key) ?? "").trim();
      return content ? [copy.labels[index] + ": " + content] : [];
    });
    setMessage(lines.join("\n"));
    setFeedback("");
    dialog.current?.showModal();
  }

  async function copyEnquiry() {
    try {
      await navigator.clipboard.writeText(message);
      setFeedback(dialogLabels.copied);
    } catch {
      previewText.current?.focus();
      previewText.current?.select();
      setFeedback(dialogLabels.manual);
    }
  }

  return (
    <section className={styles.enquiry} id="enquiry" aria-labelledby="enquiry-title" data-reveal>
      <h2 id="enquiry-title">{title}</h2>
      <ul className={styles.enquiryTypes}>
        {enquiryKinds.map((option) => (
          <li key={option}>
            <Link href={enquiryPath(locale, option)} aria-current={kind === option ? "true" : undefined}>
              {kindLabels[option]}
            </Link>
          </li>
        ))}
      </ul>
      <form className={styles.form} onSubmit={preview}>
        {fields.map(({ key, autoComplete, type, required }, index) => {
          if (kind === "general" && (key === "product" || key === "volume")) return null;
          const label = copy.labels[index];
          const placeholder = copy.placeholders[index];
          if (key === "country") {
            return <CountryPicker key={key} locale={locale} label={label} placeholder={placeholder} />;
          }
          return (
            <label key={key} className={key === "details" ? styles.wideField : undefined}>
              <span>{label}</span>
              {key === "details" ? (
                <textarea name={key} placeholder={kind === "general" ? generalPlaceholder : placeholder} rows={3} maxLength={2000} />
              ) : key === "product" ? (
                <select name={key} defaultValue="">
                  <option value="">{placeholder}</option>
                  {products.map((product) => <option key={product} value={product}>{product}</option>)}
                </select>
              ) : (
                <input name={key} type={type ?? "text"} autoComplete={autoComplete} required={required} placeholder={placeholder} maxLength={180} />
              )}
            </label>
          );
        })}
        <button className={styles.primary} type="submit">{copy.preview}</button>
      </form>
      <dialog className={styles.preview} ref={dialog} aria-labelledby="preview-title">
        <div className={styles.previewHeader}>
          <h2 id="preview-title">{copy.preview}</h2>
          <button type="button" className={styles.close} onClick={() => dialog.current?.close()}>{dialogLabels.close}</button>
        </div>
        <textarea ref={previewText} aria-label={dialogLabels.message} value={message} rows={7} readOnly />
        <div className={styles.previewActions}>
          {emailLink && <a className={styles.primary} href={emailLink}>{copy.email}</a>}
          <button type="button" className={styles.primary} onClick={copyEnquiry}>{dialogLabels.copy}</button>
          <span role="status">{feedback}</span>
        </div>
      </dialog>
    </section>
  );
}
