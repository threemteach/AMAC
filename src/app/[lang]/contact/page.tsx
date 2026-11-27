import { notFound } from "next/navigation";
import { ContactPage, getContactMetadata } from "../../../components/contact/contact-page";
import { additionalLocales } from "../../../content/locale";

export const dynamicParams = false;

export function generateStaticParams() {
  return additionalLocales.map((lang) => ({ lang }));
}

async function getLocale(params: PageProps<"/[lang]/contact">["params"]) {
  const { lang } = await params;
  const locale = additionalLocales.find((candidate) => candidate === lang);
  if (!locale) notFound();
  return locale;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  return getContactMetadata(await getLocale(params));
}

export default async function Page({ params }: PageProps<"/[lang]/contact">) {
  return <ContactPage locale={await getLocale(params)} />;
}
