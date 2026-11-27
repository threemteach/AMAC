import { notFound } from "next/navigation";
import { ContactPage, getContactMetadata } from "../../../components/contact/contact-page";
import { readEnquiryKind } from "../../../content/enquiry-routes";
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

export default async function Page({ params, searchParams }: PageProps<"/[lang]/contact">) {
  const [locale, query] = await Promise.all([getLocale(params), searchParams]);
  return <ContactPage locale={locale} kind={readEnquiryKind(query.type)} />;
}
