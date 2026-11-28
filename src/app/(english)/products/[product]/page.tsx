import { getProductMetadata, ProductPage } from "../../../../components/catalog/product-page";
import { productIds } from "../../../../content/catalog/catalog-routes";

export function generateStaticParams() {
  return productIds.map((product) => ({ product }));
}

async function getId(params: PageProps<"/products/[product]">["params"]) {
  const { product } = await params;
  return product;
}

export async function generateMetadata({ params }: PageProps<"/products/[product]">) {
  return getProductMetadata("en", await getId(params));
}

export default async function Page({ params }: PageProps<"/products/[product]">) {
  return <ProductPage locale="en" id={await getId(params)} />;
}
