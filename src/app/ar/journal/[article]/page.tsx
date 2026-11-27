import { notFound } from "next/navigation";
import { getJournalMetadata, JournalPage } from "../../../../components/journal/journal-page";
import { isJournalArticle, journalIds } from "../../../../content/journal-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return journalIds.map((article) => ({ article }));
}

async function getArticle(params: PageProps<"/ar/journal/[article]">["params"]) {
  const { article } = await params;
  if (!isJournalArticle(article)) notFound();
  return article;
}

export async function generateMetadata({ params }: PageProps<"/ar/journal/[article]">) {
  return getJournalMetadata("ar", await getArticle(params));
}

export default async function Page({ params }: PageProps<"/ar/journal/[article]">) {
  return <JournalPage locale="ar" id={await getArticle(params)} />;
}
