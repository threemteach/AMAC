import { contactPath, type Locale } from "./locale";

export const enquiryKinds = ["general", "export", "product"] as const;
export type EnquiryKind = (typeof enquiryKinds)[number];

export function readEnquiryKind(value: string | string[] | undefined): EnquiryKind {
  return value === "general" || value === "export" ? value : "product";
}

export function enquiryPath(locale: Locale, kind: EnquiryKind) {
  const query = kind === "product" ? "" : "?type=" + kind;
  return contactPath(locale) + query + "#enquiry";
}
