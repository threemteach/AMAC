import { notFound } from "next/navigation";
import { getProductMetadata, ProductPage } from "../../../../components/catalog/product-page";
import { productIds } from "../../../../content/catalog-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return productIds.map((product) => ({ product }));
}

async function getId(params: PageProps<"/products/[product]">["params"]) {
  const { product } = await params;
  const id = productIds.find((candidate) => candidate === product);
  if (!id) notFound();
  return id;
}

export async function generateMetadata({ params }: PageProps<"/products/[product]">) {
  return getProductMetadata("en", await getId(params));
}

export default async function Page({ params }: PageProps<"/products/[product]">) {
  return <ProductPage locale="en" id={await getId(params)} />;
}
