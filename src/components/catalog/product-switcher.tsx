"use client";

import { useRouter } from "next/navigation";
import { productPath, type ProductId } from "../../content/catalog/catalog-routes";
import type { Locale } from "../../content/locale";
import styles from "./product-details.module.css";

const selectLabels: Record<Locale, string> = {
  en: "Choose a product",
  ar: "اختر المنتج",
  fr: "Choisir un produit",
  de: "Produkt auswählen",
  it: "Scegli un prodotto",
  ru: "Выберите продукт",
  es: "Elige un producto",
};

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
