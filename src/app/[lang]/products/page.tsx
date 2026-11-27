import { notFound } from "next/navigation";
import { CatalogPage } from "../../../components/catalog/catalog-page";
import { getCatalogMetadata } from "../../../content/catalog-metadata";
import { additionalLocales } from "../../../content/locale";

async function getLocale(params: PageProps<"/[lang]/products">["params"]) {
  const { lang } = await params;
  const locale = additionalLocales.find((candidate) => candidate === lang);
  if (!locale) notFound();
  return locale;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/products">) {
  return getCatalogMetadata(await getLocale(params));
}

export default async function Page({ params, searchParams }: PageProps<"/[lang]/products">) {
  const [locale, filters] = await Promise.all([getLocale(params), searchParams]);
  return <CatalogPage locale={locale} category={filters.category} />;
}
