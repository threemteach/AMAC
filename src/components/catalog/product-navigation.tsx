import Link from "next/link";
import { getCatalog } from "../../content/catalog/catalog";
import { productsPath, type ProductId } from "../../content/catalog/catalog-routes";
import { getHomeContent } from "../../content/home-localized";
import { homePaths, type Locale } from "../../content/locale";
import { ProductSwitcher } from "./product-switcher";
import styles from "./product-details.module.css";

export function ProductNavigation({ locale, id, title }: { locale: Locale; id: ProductId; title: string }) {
  const [homeLabel, productsLabel] = getHomeContent(locale).header.navigation;
  const choices = getCatalog(locale).products.map(({ id, title }) => ({ id, title }));

  return (
    <div className={styles.productNavigation}>
      <nav className={styles.breadcrumb} aria-label={productsLabel}>
        <ol>
          <li><Link href={homePaths[locale]}>{homeLabel}</Link></li>
          <li><Link href={productsPath(locale)}>{productsLabel}</Link></li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <ProductSwitcher key={id} locale={locale} current={id} choices={choices} />
    </div>
  );
}
