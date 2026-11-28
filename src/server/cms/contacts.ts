import "server-only";

import { getCms } from "./store";

export function enquiryRecipient(kind: "general" | "export" | "product") {
  const contacts = getCms()?.contacts;
  if (contacts) return (kind === "general" ? contacts.general : contacts.export) || undefined;
  return kind === "general"
    ? process.env.AMAC_GENERAL_EMAIL?.trim()
    : process.env.AMAC_EXPORT_EMAIL?.trim();
}
