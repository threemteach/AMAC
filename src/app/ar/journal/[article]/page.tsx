import { getJournalMetadata, JournalPage } from "../../../../components/journal/journal-page";
import { journalIds } from "../../../../content/journal-routes";

export function generateStaticParams() {
  return journalIds.map((article) => ({ article }));
}

async function getArticle(params: PageProps<"/ar/journal/[article]">["params"]) {
  const { article } = await params;
  return article;
}

export async function generateMetadata({ params }: PageProps<"/ar/journal/[article]">) {
  return getJournalMetadata("ar", await getArticle(params));
}

export default async function Page({ params }: PageProps<"/ar/journal/[article]">) {
  return <JournalPage locale="ar" id={await getArticle(params)} />;
}
