import { notFound } from "next/navigation";
import { getProductMetadata, ProductPage } from "../../../../components/catalog/product-page";
import { productIds } from "../../../../content/catalog/catalog-routes";
import { additionalLocales } from "../../../../content/locale";

export function generateStaticParams() {
  return additionalLocales.flatMap((lang) => productIds.map((product) => ({ lang, product })));
}

async function getRoute(params: PageProps<"/[lang]/products/[product]">["params"]) {
  const { lang, product } = await params;
  const locale = additionalLocales.find((candidate) => candidate === lang);
  if (!locale) notFound();
  return { locale, id: product };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/products/[product]">) {
  const { locale, id } = await getRoute(params);
  return getProductMetadata(locale, id);
}

export default async function Page({ params }: PageProps<"/[lang]/products/[product]">) {
  const route = await getRoute(params);
  return <ProductPage {...route} />;
}
