import { getJournalMetadata, JournalPage } from "../../../../components/journal/journal-page";
import { journalIds } from "../../../../content/journal-routes";

export function generateStaticParams() {
  return journalIds.map((article) => ({ article }));
}

async function getArticle(params: PageProps<"/journal/[article]">["params"]) {
  const { article } = await params;
  return article;
}

export async function generateMetadata({ params }: PageProps<"/journal/[article]">) {
  return getJournalMetadata("en", await getArticle(params));
}

export default async function Page({ params }: PageProps<"/journal/[article]">) {
  return <JournalPage locale="en" id={await getArticle(params)} />;
}
