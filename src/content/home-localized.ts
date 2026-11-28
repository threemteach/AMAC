import { ar, en } from "./translations/home";
import { getInternationalHome } from "./international-home";
import type { Locale } from "./locale";
import { contentText, lines } from "./localized-text";
import { getCms } from "../server/cms/store";
import type { CopyField } from "./cms-options";

export function getBaseHomeContent(locale: Locale) {
  if (locale === "en") return en;
  if (locale === "ar") return ar;
  return getInternationalHome(locale);
}

export function getHomeContent(locale: Locale) {
  const base = getBaseHomeContent(locale);
  const cms = getCms();
  if (!cms) return base;
  const text = (field: CopyField, fallback: string) => contentText(cms.copy[field], locale, fallback);
  const split = (field: CopyField, fallback: string[]) => lines(text(field, fallback.join("\n")));
  return {
    ...base,
    header: { ...base.header, announcement: text("announcement", base.header.announcement) },
    hero: {
      ...base.hero, image: cms.media.hero || base.hero.image,
      eyebrow: text("heroEyebrow", base.hero.eyebrow),
      heading: split("heroHeading", base.hero.heading), description: split("heroDescription", base.hero.description),
    },
    fieldsIntro: {
      ...base.fieldsIntro, heading: split("fieldsHeading", base.fieldsIntro.heading),
      description: split("fieldsDescription", base.fieldsIntro.description),
    },
    ingredientCollections: {
      ...base.ingredientCollections, heading: text("collectionsHeading", base.ingredientCollections.heading),
      cards: base.ingredientCollections.cards.map((card, index) => ({
        ...card, image: (index === 0 ? cms.media.fruits : cms.media.vegetables) || card.image,
      })),
    },
    featuredHarvest: { ...base.featuredHarvest, heading: split("harvestHeading", base.featuredHarvest.heading) },
    qualityConfidence: {
      ...base.qualityConfidence, standards: cms.certificates,
      heading: split("qualityHeading", base.qualityConfidence.heading),
      description: text("qualityDescription", base.qualityConfidence.description),
      standardsNote: text("qualityNote", base.qualityConfidence.standardsNote),
    },
    story: {
      ...base.story, image: cms.media.story || base.story.image, heading: split("storyHeading", base.story.heading),
      points: split("storyDescription", base.story.points),
    },
    journey: {
      ...base.journey, heading: split("journeyHeading", base.journey.heading),
      description: text("journeyDescription", base.journey.description),
      steps: base.journey.steps.map((step, index) => {
        const [title, description] = cms.blocks.journeySteps[locale]?.[index] ?? [step.title, step.description];
        return { ...step, title, description };
      }),
    },
    factoryProcess: {
      ...base.factoryProcess, cover: cms.media.factory || base.factoryProcess.cover,
      heading: split("factoryHeading", base.factoryProcess.heading),
      description: text("factoryDescription", base.factoryProcess.description),
    },
    shippingRoutes: {
      ...base.shippingRoutes, heading: split("shippingHeading", base.shippingRoutes.heading),
      description: text("shippingDescription", base.shippingRoutes.description),
      methods: base.shippingRoutes.methods.map((method, index) => {
        const [title, description] = cms.blocks.shippingMethods[locale]?.[index] ?? [method.title, method.description];
        return { ...method, title, description };
      }),
    },
    contactBanner: {
      ...base.contactBanner, heading: split("contactBannerHeading", base.contactBanner.heading),
      description: text("contactBannerDescription", base.contactBanner.description),
    },
  };
}
