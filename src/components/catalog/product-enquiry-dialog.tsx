import type { RefObject } from "react";
import type { ProductDetail } from "../../content/catalog/product-details";
import styles from "./product-details.module.css";

export function ProductEnquiryDialog({
  heading, enquiry, enquiryDialog, messageField, message, copyStatus, onMessageChange, copyEnquiry,
}: {
  heading: string;
  enquiry: ProductDetail["enquiry"];
  enquiryDialog: RefObject<HTMLDialogElement | null>;
  messageField: RefObject<HTMLTextAreaElement | null>;
  message: string;
  copyStatus: string;
  onMessageChange: (message: string) => void;
  copyEnquiry: () => Promise<void>;
}) {
  return (
    <dialog className={styles.enquiryDialog} ref={enquiryDialog} aria-labelledby="enquiry-heading">
      <div className={styles.dialogHeader}>
        <h2 id="enquiry-heading">{heading}</h2>
        <button type="button" onClick={() => enquiryDialog.current?.close()}>{enquiry.close}</button>
      </div>
      <label>
        {enquiry.message}
        <textarea ref={messageField} value={message} onChange={(event) => onMessageChange(event.target.value)} />
      </label>
      <div className={styles.dialogActions}>
        <button className={styles.enquire} type="button" onClick={copyEnquiry} disabled={!message.trim()}>{enquiry.copy}</button>
        <span role="status">{copyStatus}</span>
      </div>
    </dialog>
  );
}
