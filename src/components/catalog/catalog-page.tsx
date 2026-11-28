import { getCatalog } from "../../content/catalog/catalog";
import { readCategory } from "../../content/catalog/catalog-routes";
import type { Locale } from "../../content/locale";
import { ContactBanner } from "../shared/contact-banner";
import { SiteMotion } from "../shared/site-motion";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";
import { CatalogBrowser } from "./catalog-browser";

export function CatalogPage({ locale, category }: { locale: Locale; category: string | string[] | undefined }) {
  return (
    <>
      <SiteHeader locale={locale} view="products" />
      <main>
        <CatalogBrowser locale={locale} catalog={getCatalog(locale)} initialCategory={readCategory(category)} />
        <ContactBanner locale={locale} kind="product" />
      </main>
      <SiteFooter locale={locale} />
      <SiteMotion />
    </>
  );
}
