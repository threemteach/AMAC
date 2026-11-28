import "server-only";

import { z } from "zod";
import { copyFields } from "../../content/cms-options";
import { categoryIds } from "../../content/catalog/catalog-routes";
import { languageNames } from "../../content/locale";

const text = z.string().trim().max(12000);
const short = z.string().trim().max(240);
const required = short.min(1);
const localized = z.partialRecord(z.enum(Object.keys(languageNames) as (keyof typeof languageNames)[]), text);
const translatedName = localized.refine((value) => Boolean(value.en), "An English title is required.");
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(75);
const image = z.union([
  z.literal(""),
  z.string().regex(/^\/images\/[\w./-]+\.(?:webp|png|jpe?g|avif)$/i).refine((path) => !path.split("/").includes("..")),
  z.string().regex(/^\/media\/[a-f0-9]{64}\.webp$/),
]);
const email = z.union([z.literal(""), z.email().max(254)]);
const url = z.union([z.literal(""), z.url({ protocol: /^https?$/ }).max(1024)]);
const hex = z.union([z.literal(""), z.string().regex(/^#[a-f0-9]{6}$/i)]);
const tags = z.array(required).max(35);
const sections = z.array(z.tuple([required, text.min(1)])).max(25);
const articleSections = z.array(z.tuple([short, text])).max(25);



const product = z.object({
  slug, category: z.enum(categoryIds), published: z.boolean(), featured: z.boolean(), title: translatedName,
  description: localized, featuredDescription: localized,
  image, featuredImage: image, palette: z.tuple([hex, hex, hex, hex, hex]),
  aliases: tags, sizes: z.array(z.number().positive().max(10000)).max(35),
  cuts: z.array(z.object({ id: slug, label: translatedName, image, illustrative: z.boolean() })).min(1).max(30),
  botanicalName: short, origin: localized, packaging: localized, availability: localized,
  attributes: z.array(z.object({
    id: slug, label: translatedName,
    values: z.array(z.object({ id: slug, label: translatedName })).min(1).max(20),
  }).refine((value) => new Set(value.values.map(({ id }) => id)).size === value.values.length, {
    path: ["values"], message: "Filter value IDs must be unique.",
  })).max(12),
  seoTitle: localized, seoDescription: localized,
}).refine((value) => !!value.image || !value.published, { path: ["image"], message: "Published products need an image." })
  .refine((value) => new Set(value.attributes.map(({ id }) => id)).size === value.attributes.length, {
    path: ["attributes"], message: "Filter IDs must be unique per product.",
  })
  .refine((value) => new Set(value.cuts.map((cut) => cut.id)).size === value.cuts.length, { path: ["cuts"], message: "Cut IDs must be unique." });

const article = z.object({
  slug, category: z.enum(["season", "product", "company"]), published: z.boolean(),
  title: localized, summary: localized, image, imageAlt: localized,
  body: z.partialRecord(z.enum(Object.keys(languageNames) as (keyof typeof languageNames)[]), articleSections),
  seoTitle: localized, seoDescription: localized,
}).refine((value) => !value.published || (!!value.image && !!value.title.en && value.body.en?.length && value.body.en.every(([title, paragraph]) => title && paragraph)), {
  path: ["body"], message: "Published articles need a cover, title and complete sections in English.",
});

export const cmsSchema = z.object({
  revision: z.number().int().nonnegative(),
  media: z.object({ hero: image, story: image, fruits: image, vegetables: image, factory: image }),
  certificates: z.array(z.object({ name: required, image: image.refine(Boolean, "Choose an image."), shape: z.enum(["seal", "wordmark"]) })).max(30),
  contacts: z.object({
    general: email, export: email, business: email,
    social: z.object({
      Facebook: z.object({ url, email }), Instagram: z.object({ url, email }), LinkedIn: z.object({ url, email }),
    }),
  }),
  copy: z.partialRecord(z.enum(Object.keys(copyFields) as (keyof typeof copyFields)[]), localized),
  blocks: z.object({
    aboutValues: z.partialRecord(z.enum(Object.keys(languageNames) as (keyof typeof languageNames)[]), sections.length(4)),
    aboutSteps: z.partialRecord(z.enum(Object.keys(languageNames) as (keyof typeof languageNames)[]), sections.length(5)),
    journeySteps: z.partialRecord(z.enum(Object.keys(languageNames) as (keyof typeof languageNames)[]), sections.length(4)),
    shippingMethods: z.partialRecord(z.enum(Object.keys(languageNames) as (keyof typeof languageNames)[]), sections.length(3)),
  }),
  seo: z.object({ title: localized, description: localized, keywords: localized }),
  products: z.array(product).max(200),
  articles: z.array(article).max(200),
}).superRefine((content, context) => {
  for (const section of ["products", "articles"] as const) {
    const slugs = content[section].map((entry) => entry.slug);
    if (new Set(slugs).size !== slugs.length) {
      context.addIssue({ code: "custom", path: [section], message: "Page URLs must be unique." });
    }
  }
});

export type CmsContent = z.infer<typeof cmsSchema>;
export type CmsProduct = CmsContent["products"][number];
export type CmsArticle = CmsContent["articles"][number];
export type LocalizedText = z.infer<typeof localized>;
