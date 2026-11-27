import { aboutCopy } from "./about";
import { getBaseProducts } from "./catalog";
import { catalogCopy } from "./catalog-copy";
import type { CmsContent } from "./cms-schema";
import type { CopyField } from "./cms-options";
import { contactCopy } from "./contact";
import { getBaseHomeContent } from "./home-localized";
import { homeDescriptions } from "./home-metadata";
import { getBaseJournal } from "./journal";
import { languageNames, type Locale } from "./locale";
import { getFooterContent } from "./site";
import { strawberryCopy } from "./strawberry";

const locales = Object.keys(languageNames) as Locale[];
const arrayText = (value: string[]) => value.join("\n");
const audience = <T,>(get: (locale: Locale) => T) => Object.fromEntries(locales.map((locale) => [locale, get(locale)])) as Record<Locale, T>;
const catalogImages = ["/images/frozen-strawberries.png", "/images/catalog/broccoli.webp", "/images/frozen-mango.png", "/images/catalog/green-beans.webp"];
const featureImages = ["/images/frozen-strawberries.png", "/images/frozen-broccoli.png", "/images/frozen-mango.png", "/images/frozen-green-beans.png"];
const palettes: CmsContent["products"][number]["palette"][] = [
  ["#f8dce0", "#da9aa6", "#721c30", "#a91d38", "#ffffff"],
  ["#d6eadb", "#a2c0a9", "#19482d", "#27623d", "#ffffff"],
  ["#ffebb0", "#d9af52", "#523405", "#f2bb31", "#382305"],
  ["#e6efcd", "#b4c58a", "#354b1e", "#49652c", "#ffffff"],
];

export function getCmsDefaults(): CmsContent {
  const home = getBaseHomeContent("en");
  const journal = audience(getBaseJournal);
  const baseProducts = audience(getBaseProducts);
  const defaultCopy = audience((locale): Record<CopyField, string> => {
    const home = getBaseHomeContent(locale);
    const about = aboutCopy[locale];
    const contact = contactCopy[locale];
    const footer = getFooterContent(locale);
    return {
      announcement: home.header.announcement,
      heroEyebrow: home.hero.eyebrow, heroHeading: arrayText(home.hero.heading), heroDescription: arrayText(home.hero.description),
      fieldsHeading: arrayText(home.fieldsIntro.heading), fieldsDescription: arrayText(home.fieldsIntro.description),
      collectionsHeading: home.ingredientCollections.heading, harvestHeading: arrayText(home.featuredHarvest.heading),
      qualityHeading: arrayText(home.qualityConfidence.heading), qualityDescription: home.qualityConfidence.description,
      qualityNote: home.qualityConfidence.standardsNote,
      storyHeading: arrayText(home.story.heading), storyDescription: arrayText(home.story.points),
      journeyHeading: arrayText(home.journey.heading), journeyDescription: home.journey.description,
      factoryHeading: arrayText(home.factoryProcess.heading), factoryDescription: home.factoryProcess.description,
      shippingHeading: arrayText(home.shippingRoutes.heading), shippingDescription: home.shippingRoutes.description,
      contactBannerHeading: arrayText(home.contactBanner.heading), contactBannerDescription: home.contactBanner.description,
      aboutTitle: about.title, aboutIntro: about.intro, companyHeading: about.companyHeading,
      companyBody: about.company.join("\n\n"), valuesHeading: about.valuesHeading,
      aboutProcessHeading: arrayText(about.processHeading), aboutContactHeading: arrayText(about.contactHeading),
      aboutContactDescription: about.contactDescription, aboutPartner: about.partner,
      contactTitle: contact.title, contactIntro: contact.intro, contactAddress: contact.address, contactPhone: contact.phoneNote,
      footerSummary: arrayText(footer.brandSummary), footerLocation: footer.location, footerTagline: footer.tagline,
      catalogTitle: catalogCopy[locale].title, catalogIntro: catalogCopy[locale].intro,
      journalTitle: journal[locale].copy.title, journalIntro: journal[locale].copy.intro,
    };
  });
  const copy = Object.fromEntries((Object.keys(defaultCopy.en) as CopyField[]).map((field) => [field, audience((locale) => defaultCopy[locale][field])]));
  return {
    revision: 0,
    media: {
      hero: "/images/farm.png", story: "/images/our-story-field.png",
      fruits: "/images/frozen-fruits.jpg", vegetables: "/images/frozen-vegetables.jpg", factory: "/images/frozen-fruits.jpg",
    },
    certificates: home.qualityConfidence.standards.map(({ name, image, shape }) => ({
      name, image, shape: shape === "seal" ? "seal" : "wordmark",
    })),
    contacts: {
      general: process.env.AMAC_GENERAL_EMAIL?.trim() ?? "", export: process.env.AMAC_EXPORT_EMAIL?.trim() ?? "", business: "",
      social: { Facebook: { url: "", email: "" }, Instagram: { url: "", email: "" }, LinkedIn: { url: "", email: "" } },
    },
    copy,
    blocks: {
      aboutValues: audience((locale) => aboutCopy[locale].values),
      aboutSteps: audience((locale) => aboutCopy[locale].steps),
      journeySteps: audience((locale) => getBaseHomeContent(locale).journey.steps.map(({ title, description }) => [title, description])),
      shippingMethods: audience((locale) => getBaseHomeContent(locale).shippingRoutes.methods.map(({ title, description }) => [title, description])),
    },
    seo: { title: audience((locale) => homeDescriptions[locale][0]), description: audience((locale) => homeDescriptions[locale][1]), keywords: {} },
    products: baseProducts.en.map((product, index) => ({
      slug: product.id, category: product.category, published: true, featured: true,
      title: audience((locale) => baseProducts[locale][index].title),
      description: audience((locale) => index === 0 ? strawberryCopy[locale].description : getBaseHomeContent(locale).featuredHarvest.products[index].description),
      featuredDescription: audience((locale) => getBaseHomeContent(locale).featuredHarvest.products[index].description),
      image: catalogImages[index], featuredImage: featureImages[index], palette: palettes[index],
      aliases: [...new Set(product.terms)].slice(0, 35), sizes: [...product.sizes],
      botanicalName: index === 0 ? "Fragaria × ananassa" : "", attributes: [],
      cuts: product.cuts.map((cut, cutIndex) => ({
        id: cut.id, image: typeof cut.image === "string" ? cut.image : featureImages[index], illustrative: cut.illustrative,
        label: audience((locale) => baseProducts[locale][index].cuts[cutIndex].label),
      })),
      origin: {}, packaging: {}, availability: {}, seoTitle: {}, seoDescription: {},
    })),
    articles: journal.en.articles.map((article, index) => ({
      slug: article.id, category: article.category, published: true, image: article.image,
      title: audience((locale) => journal[locale].articles[index].title),
      body: audience((locale) => journal[locale].articles[index].sections),
      summary: {}, imageAlt: {}, seoTitle: {}, seoDescription: {},
    })),
  };
}
