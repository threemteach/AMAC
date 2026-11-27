import { notFound } from "next/navigation";
import { getJournalMetadata, JournalPage } from "../../../components/journal/journal-page";
import { additionalLocales } from "../../../content/locale";

export const dynamicParams = false;

export function generateStaticParams() {
  return additionalLocales.map((lang) => ({ lang }));
}

async function getLocale(params: PageProps<"/[lang]/journal">["params"]) {
  const { lang } = await params;
  const locale = additionalLocales.find((candidate) => candidate === lang);
  if (!locale) notFound();
  return locale;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/journal">) {
  return getJournalMetadata(await getLocale(params));
}

export default async function Page({ params }: PageProps<"/[lang]/journal">) {
  return <JournalPage locale={await getLocale(params)} />;
}
