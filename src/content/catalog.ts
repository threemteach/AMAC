import type { StaticImageData } from "next/image";
import { getHomeContent } from "./home-localized";
import { catalogCopy } from "./catalog-copy";
import { categoryIds, type Category } from "./catalog-routes";
import { languageNames, type Locale } from "./locale";

type CatalogProduct = {
  id: string;
  category: Category;
  image: string | StaticImageData;
  keywords?: string[];
};

const searchTranslations = (Object.keys(languageNames) as Locale[]).map((locale) => ({
  home: getHomeContent(locale),
  titles: catalogCopy[locale].productTitles,
}));

const categoryKeywords: Record<Category, string[]> = {
  fruits: ["فواكه", "فاكهة", "فاكهه", "fruit"],
  vegetables: ["خضار", "خضروات", "vegetable"],
};

export function getCatalog(locale: Locale) {
  const home = getHomeContent(locale);
  const copy = catalogCopy[locale];
  const harvest = home.featuredHarvest.products;
  const products: CatalogProduct[] = [
    { id: "strawberries", category: "fruits", image: harvest[0].image, keywords: ["strawberry", "فريز", "فراولة", "فراوله", "fragola", "Erdbeere"] },
    { id: "broccoli", category: "vegetables", image: "/images/catalog/broccoli.webp", keywords: ["brocoli", "بروكولي"] },
    { id: "mango", category: "fruits", image: harvest[2].image, keywords: ["منجا", "مانغا", "манго"] },
    { id: "green-beans", category: "vegetables", image: "/images/catalog/green-beans.webp" },
  ];

  return {
    copy,
    categories: home.ingredientCollections.cards.map((card, index) => ({ ...card, id: categoryIds[index] })),
    products: products.map(({ keywords, ...product }, index) => ({
      ...product,
      title: copy.productTitles[index],
      terms: [
        product.category,
        ...categoryKeywords[product.category],
        ...(keywords ?? []),
        ...searchTranslations.flatMap(({ home, titles }) => [
          titles[index],
          home.featuredHarvest.products[index].name,
          home.featuredHarvest.products[index].category,
          home.ingredientCollections.cards[categoryIds.indexOf(product.category)].title,
        ]),
      ],
    })),
  };
}
