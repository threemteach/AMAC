"use client";

import { useRef, useState, type FormEvent } from "react";
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
  copy,
  products,
  dialogLabels,
}: {
  locale: Locale;
  copy: ContactCopy;
  products: string[];
  dialogLabels: (typeof enquiryText)["en"];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const previewText = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

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
      <h2 id="enquiry-title">{copy.formTitle}</h2>
      <form className={styles.form} onSubmit={preview}>
        {fields.map(({ key, autoComplete, type, required }, index) => key === "country" ? (
          <CountryPicker key={key} locale={locale} label={copy.labels[index]} placeholder={copy.placeholders[index]} />
        ) : (
          <label key={key} className={key === "details" ? styles.wideField : undefined}>
            <span>{copy.labels[index]}</span>
            {key === "details" ? (
              <textarea name={key} placeholder={copy.placeholders[index]} rows={3} maxLength={2000} />
            ) : key === "product" ? (
              <select name={key} defaultValue="">
                <option value="">{copy.placeholders[index]}</option>
                {products.map((product) => <option key={product} value={product}>{product}</option>)}
              </select>
            ) : (
              <input name={key} type={type ?? "text"} autoComplete={autoComplete} required={required} placeholder={copy.placeholders[index]} maxLength={180} />
            )}
          </label>
        ))}
        <button className={styles.primary} type="submit">{copy.preview}</button>
      </form>
      <dialog className={styles.preview} ref={dialog} aria-labelledby="preview-title">
        <div className={styles.previewHeader}>
          <h2 id="preview-title">{copy.preview}</h2>
          <button type="button" className={styles.close} onClick={() => dialog.current?.close()}>{dialogLabels.close}</button>
        </div>
        <textarea ref={previewText} aria-label={dialogLabels.message} value={message} rows={7} readOnly />
        <div className={styles.previewActions}>
          <button type="button" className={styles.primary} onClick={copyEnquiry}>{dialogLabels.copy}</button>
          <span role="status">{feedback}</span>
        </div>
      </dialog>
    </section>
  );
}
