"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { getProductDetails } from "../../content/catalog/product-details";
import styles from "./product-details.module.css";

export function ProductDetails({ product }: { product: NonNullable<ReturnType<typeof getProductDetails>> }) {
  const { id, title, botanicalName, copy, cuts, sizes, defaultCut, defaultSize, enquiry } = product;
  const savedProductKey = "amac:saved-" + id;
  const [cutIndex, setCutIndex] = useState(defaultCut);
  const [hasChangedCut, setHasChangedCut] = useState(false);
  const [size, setSize] = useState<number | undefined>(defaultSize);
  const [savedSelection, setSavedSelection] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const enquiryDialog = useRef<HTMLDialogElement>(null);
  const messageField = useRef<HTMLTextAreaElement>(null);
  const cut = cuts[cutIndex];
  const selection = cut.id + ":" + (size ?? "");
  const saved = savedSelection === selection;
  const formatSize = (value: number) => value + " " + copy.unit;
  const format = size === undefined ? cut.label : cut.label + " · " + formatSize(size);

  useEffect(() => {
    try {
      const record = window.localStorage.getItem(savedProductKey);
      if (!record) return;
      const [savedCut, savedSize] = record.split(":");
      const index = cuts.findIndex((option) => option.id === savedCut);
      const matchedSize = sizes.find((option) => String(option) === savedSize);
      if (index === -1 || (sizes.length > 0 && matchedSize === undefined)) return;

      setCutIndex(index);
      setSize(matchedSize);
      setSavedSelection(record);
    } catch {
      // The selectors and save button also work for this visit with storage disabled.
    }
  }, [cuts, savedProductKey, sizes]);

  function chooseCut(index: number) {
    if (index === cutIndex) return;
    setHasChangedCut(true);
    setCutIndex(index);
  }

  function toggleSavedSelection() {
    const next = saved ? null : selection;
    setSavedSelection(next);
    try {
      if (next) window.localStorage.setItem(savedProductKey, next);
      else window.localStorage.removeItem(savedProductKey);
    } catch {
      // The current visit still retains the user's selection.
    }
  }

  function openEnquiry() {
    setMessage(title + "\n" + copy.specs[2] + ": " + format + "\n\n");
    setCopyStatus("");
    enquiryDialog.current?.showModal();
  }

  async function copyEnquiry() {
    try {
      await navigator.clipboard.writeText(message.trim());
      setCopyStatus(enquiry.copied);
    } catch {
      messageField.current?.focus();
      messageField.current?.select();
      setCopyStatus(enquiry.manual);
    }
  }

  const values = [copy.range, copy.origin, format, copy.packaging, copy.availability];

  return (
    <>
      <section className={styles.overview} aria-labelledby="product-title" data-gallery={cuts.length > 1 ? "multiple" : "single"}>
        <figure data-reveal className={styles.gallery} aria-label={copy.gallery}>
          <div className={styles.mainPhoto}>
            <Image
              key={cut.id}
              className={hasChangedCut ? styles.cutPhoto : undefined}
              onLoad={(event) => { event.currentTarget.dataset.ready = "true"; }}
              src={cut.image}
              alt={title + " · " + cut.label}
              fill
              loading="eager"
              sizes={cuts.length > 1 ? "(max-width: 760px) 92vw, (max-width: 1440px) 38vw, 540px" : "(max-width: 760px) 92vw, 46vw"}
              style={{ objectPosition: cut.position }}
            />
            {cut.illustrative && <span className={styles.photoNote}>{copy.referencePhoto}</span>}
          </div>
          {cuts.length > 1 && (
            <ul className={styles.thumbnails}>
              {cuts.map((option, index) => (
                <li key={option.id}>
                  <button
                    type="button"
                    aria-label={option.label}
                    aria-pressed={cutIndex === index}
                    onClick={() => chooseCut(index)}
                  >
                    <Image src={option.image} alt="" fill sizes="100px" style={{ objectPosition: option.position }} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </figure>

        <div className={styles.productInfo} data-reveal>
          <p className={styles.eyebrow}>{copy.category}</p>
          <h1 id="product-title" className={styles.title}>{title}</h1>
          {botanicalName && <p className={styles.botanicalName}><i lang="la" dir="ltr">{botanicalName}</i></p>}
          <p className={styles.description}>{copy.description}</p>

          {cuts.length > 1 ? (
            <fieldset className={styles.options}>
              <legend><span aria-hidden="true">01 — </span>{copy.cutLabel}</legend>
              <div className={styles.optionList}>
                {cuts.map((option, index) => (
                  <label className={styles.option} key={option.id}>
                    <input type="radio" name="product-cut" value={option.id} checked={cutIndex === index} onChange={() => chooseCut(index)} />
                    <span className={styles.optionPhoto}>
                      <Image src={option.image} alt="" fill sizes="36px" style={{ objectPosition: option.position }} />
                    </span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : (
            <dl className={styles.format}>
              <dt>{copy.specs[2]}</dt>
              <dd>{cut.label}</dd>
            </dl>
          )}

          {sizes.length > 0 && (
            <fieldset className={styles.options}>
              <legend><span aria-hidden="true">02 — </span>{copy.sizeLabel}</legend>
              <div className={styles.optionList}>
                {sizes.map((option) => (
                  <label className={styles.option} key={option}>
                    <input type="radio" name="product-size" value={option} checked={size === option} onChange={() => setSize(option)} />
                    <span>{formatSize(option)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className={styles.actions}>
            <button type="button" className={styles.enquire} onClick={openEnquiry}>{copy.enquire}</button>
            <button type="button" className={styles.save} aria-pressed={saved} onClick={toggleSavedSelection}>
              {saved ? copy.saved : copy.save}
            </button>
          </div>
        </div>
      </section>

      <dialog className={styles.enquiryDialog} ref={enquiryDialog} aria-labelledby="enquiry-heading">
        <div className={styles.dialogHeader}>
          <h2 id="enquiry-heading">{copy.enquire}</h2>
          <button type="button" onClick={() => enquiryDialog.current?.close()}>{enquiry.close}</button>
        </div>
        <label>
          {enquiry.message}
          <textarea ref={messageField} value={message} onChange={(event) => {
            setMessage(event.target.value);
            setCopyStatus("");
          }} />
        </label>
        <div className={styles.dialogActions}>
          <button className={styles.enquire} type="button" onClick={copyEnquiry} disabled={!message.trim()}>{enquiry.copy}</button>
          <span role="status">{copyStatus}</span>
        </div>
      </dialog>

      <section className={styles.specifications} aria-labelledby="specifications-heading">
        <div className={styles.specificationCopy}>
          <p className={styles.eyebrow}>{copy.detailsLabel}</p>
          <h2 id="specifications-heading" data-reveal>{copy.detailsHeading}</h2>
          <table data-reveal className={styles.specTable} aria-labelledby="specifications-heading">
            <tbody>
              {copy.specs.map((label, index) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{values[index]}</td>
                </tr>
              ))}
              {product.attributes.map(({ id, label, values }) => (
                <tr key={id}><th scope="row">{label}</th><td>{values.map((value) => value.label).join(" · ")}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside data-reveal className={styles.requirements}>
          <h2>{copy.requirementsHeading.map((line) => <span key={line}>{line}</span>)}</h2>
          <p>{copy.requirements}</p>
        </aside>
      </section>
    </>
  );
}
