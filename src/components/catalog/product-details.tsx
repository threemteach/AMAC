"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductDetail } from "../../content/catalog/product-details";
import { ProductEnquiryDialog } from "./product-enquiry-dialog";
import { ProductOverview } from "./product-overview";
import { ProductSpecifications } from "./product-specifications";

export function ProductDetails({ product }: { product: ProductDetail }) {
  const { id, title, copy, cuts, sizes, defaultCut, defaultSize, enquiry } = product;
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

  return (
    <>
      <ProductOverview
        product={product}
        cutIndex={cutIndex}
        hasChangedCut={hasChangedCut}
        size={size}
        saved={saved}
        formatSize={formatSize}
        chooseCut={chooseCut}
        setSize={setSize}
        openEnquiry={openEnquiry}
        toggleSavedSelection={toggleSavedSelection}
      />
      <ProductEnquiryDialog
        heading={copy.enquire}
        enquiry={enquiry}
        enquiryDialog={enquiryDialog}
        messageField={messageField}
        message={message}
        copyStatus={copyStatus}
        onMessageChange={(value) => { setMessage(value); setCopyStatus(""); }}
        copyEnquiry={copyEnquiry}
      />
      <ProductSpecifications product={product} format={format} />
    </>
  );
}
