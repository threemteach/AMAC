import { notFound } from "next/navigation";
import { getJournalMetadata, JournalPage } from "../../../../components/journal/journal-page";
import { isJournalArticle, journalIds } from "../../../../content/journal-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return journalIds.map((article) => ({ article }));
}

async function getArticle(params: PageProps<"/journal/[article]">["params"]) {
  const { article } = await params;
  if (!isJournalArticle(article)) notFound();
  return article;
}

export async function generateMetadata({ params }: PageProps<"/journal/[article]">) {
  return getJournalMetadata("en", await getArticle(params));
}

export default async function Page({ params }: PageProps<"/journal/[article]">) {
  return <JournalPage locale="en" id={await getArticle(params)} />;
}
