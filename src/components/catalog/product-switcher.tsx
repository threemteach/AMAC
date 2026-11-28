"use client";

import { useRouter } from "next/navigation";
import { productPath, type ProductId } from "../../content/catalog/catalog-routes";
import type { Locale } from "../../content/locale";
import { selectLabels } from "../../content/translations/product";
import styles from "./product-details.module.css";

export function ProductSwitcher({
  locale,
  current,
  choices,
}: {
  locale: Locale;
  current: ProductId;
  choices: { id: ProductId; title: string }[];
}) {
  const router = useRouter();

  return (
    <label className={styles.productSwitcher}>
      <span>{selectLabels[locale]}</span>
      <span className={styles.selectControl}>
        <select
          defaultValue={current}
          onChange={(event) => {
            const choice = choices.find(({ id }) => id === event.target.value);
            if (choice && choice.id !== current) router.push(productPath(locale, choice.id), { scroll: false });
          }}
        >
          {choices.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
        </select>
      </span>
    </label>
  );
}
