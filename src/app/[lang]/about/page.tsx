import { notFound } from "next/navigation";
import { AboutPage, getAboutMetadata } from "../../../components/about/about-page";
import { additionalLocales } from "../../../content/locale";

export const dynamicParams = false;

export function generateStaticParams() {
  return additionalLocales.map((lang) => ({ lang }));
}

async function getLocale(params: PageProps<"/[lang]/about">["params"]) {
  const { lang } = await params;
  const locale = additionalLocales.find((candidate) => candidate === lang);
  if (!locale) notFound();
  return locale;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  return getAboutMetadata(await getLocale(params));
}

export default async function Page({ params }: PageProps<"/[lang]/about">) {
  return <AboutPage locale={await getLocale(params)} />;
}
