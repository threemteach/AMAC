import { getHomeMetadata } from "../../content/home-metadata";
import type { ReactNode } from "react";
import { Document } from "../document";
import "@fontsource-variable/readex-pro/wght.css";

export function generateMetadata() { return getHomeMetadata("ar"); }

export default function Layout({ children }: { children: ReactNode }) {
  return <Document locale="ar">{children}</Document>;
}
