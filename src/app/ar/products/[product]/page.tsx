import { getProductMetadata, ProductPage } from "../../../../components/catalog/product-page";
import { productIds } from "../../../../content/catalog/catalog-routes";

export function generateStaticParams() {
  return productIds.map((product) => ({ product }));
}

async function getId(params: PageProps<"/ar/products/[product]">["params"]) {
  const { product } = await params;
  return product;
}

export async function generateMetadata({ params }: PageProps<"/ar/products/[product]">) {
  return getProductMetadata("ar", await getId(params));
}

export default async function Page({ params }: PageProps<"/ar/products/[product]">) {
  return <ProductPage locale="ar" id={await getId(params)} />;
}
