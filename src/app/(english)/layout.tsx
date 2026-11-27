import { getHomeMetadata } from "../../content/home-metadata";
import type { ReactNode } from "react";
import { Document } from "../document";

export const metadata = getHomeMetadata("en");

export default function Layout({ children }: { children: ReactNode }) {
  return <Document locale="en">{children}</Document>;
}
