import type { StaticImageData } from "next/image";
import { getBaseHomeContent, getHomeContent } from "../home-localized";
import { catalogCopy } from "./catalog-copy";
import { categoryIds, type Category, type ProductId } from "./catalog-routes";
import { languageNames, type Locale } from "../locale";
import { contentText } from "../localized-text";
import { getCms } from "../../server/cms/store";
import { strawberryCopy, strawberryCuts, strawberrySizes } from "./strawberry";

type CatalogProduct = {
  id: ProductId;
  category: Category;
  image: string | StaticImageData;
  title: string;
  terms: string[];
  cuts: { id: string; image?: string | StaticImageData; position?: string; label: string; illustrative: boolean }[];
  sizes: readonly number[];
  palette?: readonly string[];
  featured: boolean;
  featuredImage?: string;
  attributes: { id: string; label: string; values: { id: string; label: string }[] }[];
};

const searchTranslations = (Object.keys(languageNames) as Locale[]).map((locale) => ({
  home: getBaseHomeContent(locale),
  titles: catalogCopy[locale].productTitles,
}));

const categoryKeywords: Record<Category, string[]> = {
  fruits: ["فواكه", "فاكهة", "فاكهه", "fruit"],
  vegetables: ["خضار", "خضروات", "vegetable"],
};

const formats = {
  en: ["Florets", "Pieces", "Cut"], ar: ["زهيرات", "قطع", "مقطّعة"],
  fr: ["Fleurettes", "Morceaux", "Coupés"], de: ["Röschen", "Stücke", "Geschnitten"],
  it: ["Cimette", "Pezzi", "Tagliati"], ru: ["Соцветия", "Кусочки", "Нарезанные"],
  es: ["Floretes", "Trozos", "Cortadas"],
} satisfies Record<Locale, [string, string, string]>;

export function getBaseProducts(locale: Locale): CatalogProduct[] {
  const home = getBaseHomeContent(locale);
  const harvest = home.featuredHarvest.products;
  const products: { id: ProductId; category: Category; image: string | StaticImageData; keywords?: string[] }[] = [
    { id: "strawberries", category: "fruits", image: harvest[0].image, keywords: ["strawberry", "فريز", "فراولة", "فراوله", "fragola", "Erdbeere"] },
    { id: "broccoli", category: "vegetables", image: "/images/catalog/broccoli.webp", keywords: ["brocoli", "بروكولي"] },
    { id: "mango", category: "fruits", image: harvest[2].image, keywords: ["منجا", "مانغا", "манго"] },
    { id: "green-beans", category: "vegetables", image: "/images/catalog/green-beans.webp" },
  ];

  return products.map(({ keywords, ...product }, index) => ({
      ...product,
      featured: true,
      attributes: [],
      title: catalogCopy[locale].productTitles[index],
      sizes: index === 0 ? strawberrySizes : [],
      cuts: index === 0
        ? strawberryCuts.map((cut, i) => ({ ...cut, label: strawberryCopy[locale].cuts[i], illustrative: cut.id !== "diced" }))
        : [{ id: "standard", image: harvest[index].image, position: harvest[index].imagePosition, label: formats[locale][index - 1], illustrative: false }],
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
    }));
}

export function getCatalog(locale: Locale) {
  const home = getHomeContent(locale);
  const cms = getCms();
  const base = getBaseProducts(locale);
  const copy = {
    ...catalogCopy[locale],
    title: contentText(cms?.copy.catalogTitle, locale, catalogCopy[locale].title),
    intro: contentText(cms?.copy.catalogIntro, locale, catalogCopy[locale].intro),
  };
  const products: CatalogProduct[] = cms ? cms.products.filter((entry) => entry.published).map((entry) => {
    const previous = base.find((product) => product.id === entry.slug);
    return {
      id: entry.slug, category: entry.category, title: contentText(entry.title, locale),
      image: entry.image, featured: entry.featured, featuredImage: entry.featuredImage,
      palette: entry.palette, sizes: entry.sizes,
      attributes: entry.attributes.map((attribute) => ({
        id: attribute.id, label: contentText(attribute.label, locale),
        values: attribute.values.map((value) => ({ id: value.id, label: contentText(value.label, locale) })),
      })),
      cuts: entry.cuts.map((cut) => ({
        ...cut, label: contentText(cut.label, locale),
        position: previous?.cuts.find((option) => option.id === cut.id)?.position,
      })),
      terms: [...Object.values(entry.title), ...entry.aliases, ...categoryKeywords[entry.category],
        ...entry.cuts.flatMap((cut) => Object.values(cut.label)),
        ...entry.attributes.flatMap(({ values }) => values.flatMap(({ label }) => Object.values(label)))],
    };
  }) : base;
  return {
    copy,
    categories: home.ingredientCollections.cards.map((card, index) => ({ ...card, id: categoryIds[index] })),
    products,
  };
}

export type CatalogData = ReturnType<typeof getCatalog>;
