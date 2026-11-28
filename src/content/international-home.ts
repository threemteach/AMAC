import type { AdditionalLocale } from "./locale";
import { en, internationalHomeCopies } from "./translations/home";

type ProductCopy = Pick<(typeof en.featuredHarvest.products)[number], "name" | "category" | "description">;
type StepCopy = Pick<(typeof en.journey.steps)[number], "stage" | "title" | "description">;
type RouteCopy = Pick<(typeof en.shippingRoutes.methods)[number], "title" | "description">;

export type InternationalHomeCopy = {
  header: typeof en.header;
  hero: Omit<typeof en.hero, "image" | "ribbonItems"> & { ribbons: [string, string, string] };
  fieldsIntro: Omit<typeof en.fieldsIntro, "watermark">;
  ingredientCollections: {
    eyebrow: string;
    heading: string;
    titles: [string, string];
    label: string;
    actionLabel: string;
  };
  featuredHarvest: Omit<typeof en.featuredHarvest, "products"> & { products: [ProductCopy, ProductCopy, ProductCopy, ProductCopy] };
  qualityConfidence: Omit<typeof en.qualityConfidence, "standards">;
  story: Omit<typeof en.story, "image">;
  journey: Omit<typeof en.journey, "steps"> & { steps: [StepCopy, StepCopy, StepCopy, StepCopy] };
  factoryProcess: Omit<typeof en.factoryProcess, "cover">;
  shippingRoutes: Omit<typeof en.shippingRoutes, "methods"> & { methods: [RouteCopy, RouteCopy, RouteCopy] };
  contactBanner: Omit<typeof en.contactBanner, "watermark">;
};

export function getInternationalHome(locale: AdditionalLocale): typeof en {
  const copy = internationalHomeCopies[locale];
  const { ribbons, ...hero } = copy.hero;
  const { titles, label, actionLabel, ...collections } = copy.ingredientCollections;

  return {
    ...copy,
    hero: {
      ...en.hero,
      ...hero,
      ribbonItems: en.hero.ribbonItems.map((item, index) => ({ ...item, label: ribbons[index] })),
    },
    fieldsIntro: { ...en.fieldsIntro, ...copy.fieldsIntro },
    ingredientCollections: {
      ...collections,
      cards: en.ingredientCollections.cards.map((card, index) => ({ ...card, title: titles[index], label, actionLabel })),
    },
    featuredHarvest: {
      ...copy.featuredHarvest,
      products: en.featuredHarvest.products.map((product, index) => ({ ...product, ...copy.featuredHarvest.products[index] })),
    },
    qualityConfidence: { ...en.qualityConfidence, ...copy.qualityConfidence },
    story: { ...en.story, ...copy.story },
    journey: {
      ...copy.journey,
      steps: en.journey.steps.map((step, index) => ({ ...step, ...copy.journey.steps[index] })),
    },
    factoryProcess: { ...en.factoryProcess, ...copy.factoryProcess },
    shippingRoutes: {
      ...copy.shippingRoutes,
      methods: en.shippingRoutes.methods.map((method, index) => ({ ...method, ...copy.shippingRoutes.methods[index] })),
    },
    contactBanner: { ...en.contactBanner, ...copy.contactBanner },
  };
}
