import { notFound } from "next/navigation";
import { additionalLocales } from "../../content/locale";
import { getHomeMetadata } from "../../content/home-metadata";
import { Document } from "../document";
import "@fontsource-variable/onest/wght.css";

async function getLocale(params: LayoutProps<"/[lang]">["params"]) {
  const { lang } = await params;
  const locale = additionalLocales.find((candidate) => candidate === lang);
  if (!locale) notFound();
  return locale;
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">) {
  return getHomeMetadata(await getLocale(params));
}

export default async function Layout({ children, params }: LayoutProps<"/[lang]">) {
  return <Document locale={await getLocale(params)}>{children}</Document>;
}
