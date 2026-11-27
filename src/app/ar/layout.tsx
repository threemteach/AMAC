import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Document } from "../document";
import "@fontsource-variable/readex-pro/wght.css";

export const metadata: Metadata = {
  title: "مجموعة أماك | فواكه وخضروات مجمّدة",
  description: "فواكه وخضروات مصرية مجمّدة للتصدير من مجموعة أماك في الإسكندرية.",
  alternates: { languages: { en: "/", ar: "/ar" } },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <Document locale="ar">{children}</Document>;
}
