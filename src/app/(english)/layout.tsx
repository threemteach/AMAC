import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Document } from "../document";

export const metadata: Metadata = {
  title: "AMAC Group | Frozen Fruits & Vegetables",
  description: "Egyptian frozen fruits and vegetables from AMAC Group, based in Alexandria.",
  alternates: { languages: { en: "/", ar: "/ar" } },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <Document locale="en">{children}</Document>;
}
