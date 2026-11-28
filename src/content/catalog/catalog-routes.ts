import { homePaths, type Locale } from "../locale";

export const categoryIds = ["fruits", "vegetables"] as const;
export type Category = (typeof categoryIds)[number];
export type CategoryFilter = Category | "all";

export function productsPath(locale: Locale) {
  return locale === "en" ? "/products" : homePaths[locale] + "/products";
}

export function categoryPath(locale: Locale, category: Category) {
  return productsPath(locale) + "?category=" + category + "#collection";
}

export function readCategory(value: string | string[] | undefined): CategoryFilter {
  return categoryIds.find((category) => category === value) ?? "all";
}

export const productIds = ["strawberries", "broccoli", "mango", "green-beans"] as const;
export type ProductId = string;

export function productPath(locale: Locale, product: ProductId) {
  return productsPath(locale) + "/" + product;
}

export type SiteView = "home" | "about" | "contact" | "products" | "journal" | "product" | "article";
