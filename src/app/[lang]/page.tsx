import { notFound } from "next/navigation";
import { HomePage } from "../../components/home/home-page";
import { additionalLocales } from "../../content/locale";

export function generateStaticParams() {
  return additionalLocales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const locale = additionalLocales.find((candidate) => candidate === lang);
  if (!locale) notFound();
  return <HomePage locale={locale} />;
}
