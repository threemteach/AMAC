import { CatalogPage } from "../../../components/catalog/catalog-page";
import { getCatalogMetadata } from "../../../content/catalog-metadata";

export function generateMetadata() { return getCatalogMetadata("en"); }

export default async function Page({ searchParams }: PageProps<"/products">) {
  return <CatalogPage locale="en" category={(await searchParams).category} />;
}
