import { notFound } from "next/navigation";
import { getJournalMetadata, JournalPage } from "../../../../components/journal/journal-page";
import { isJournalArticle, journalIds } from "../../../../content/journal-routes";
import { additionalLocales } from "../../../../content/locale";

export const dynamicParams = false;

export function generateStaticParams() {
  return additionalLocales.flatMap((lang) => journalIds.map((article) => ({ lang, article })));
}

async function getRoute(params: PageProps<"/[lang]/journal/[article]">["params"]) {
  const { lang, article } = await params;
  const locale = additionalLocales.find((candidate) => candidate === lang);
  if (!locale || !isJournalArticle(article)) notFound();
  return { locale, id: article };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/journal/[article]">) {
  const { locale, id } = await getRoute(params);
  return getJournalMetadata(locale, id);
}

export default async function Page({ params }: PageProps<"/[lang]/journal/[article]">) {
  const route = await getRoute(params);
  return <JournalPage {...route} />;
}
