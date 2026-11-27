import { homePaths, type Locale } from "./locale";

export const categoryIds = ["fruits", "vegetables"] as const;
export type Category = (typeof categoryIds)[number];

export function productsPath(locale: Locale) {
  return locale === "en" ? "/products" : homePaths[locale] + "/products";
}

export function categoryPath(locale: Locale, category: Category) {
  return productsPath(locale) + "?category=" + category + "#collection";
}

export function readCategory(value: string | string[] | undefined): Category | "all" {
  return categoryIds.find((category) => category === value) ?? "all";
}
