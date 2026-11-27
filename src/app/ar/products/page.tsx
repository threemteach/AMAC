import { CatalogPage } from "../../../components/catalog/catalog-page";
import { getCatalogMetadata } from "../../../content/catalog-metadata";

export const metadata = getCatalogMetadata("ar");

export default async function Page({ searchParams }: PageProps<"/ar/products">) {
  return <CatalogPage locale="ar" category={(await searchParams).category} />;
}
