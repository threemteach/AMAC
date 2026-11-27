import { ContactBanner } from "./home/contact-banner";
import { ConsideredJourney } from "./home/considered-journey";
import { FactoryProcess } from "./home/factory-process";
import { FeaturedHarvest } from "./home/featured-harvest";
import { FieldsIntro } from "./home/fields-intro";
import { HomeHero } from "./home/home-hero";
import { HomeMotion } from "./home/home-motion";
import { IngredientCollections } from "./home/ingredient-collections";
import { OurStory } from "./home/our-story";
import { QualityConfidence } from "./home/quality-confidence";
import { ShippingRoutes } from "./home/shipping-routes";
import { SiteFooter } from "./site/site-footer";
import { SiteHeader } from "./site/site-header";

import type { Locale } from "../content/locale";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <HomeHero locale={locale} />
        <FieldsIntro locale={locale} />
        <IngredientCollections locale={locale} />
        <FeaturedHarvest locale={locale} />
        <QualityConfidence locale={locale} />
        <OurStory locale={locale} />
        <ConsideredJourney locale={locale} />
        <FactoryProcess locale={locale} />
        <ShippingRoutes locale={locale} />
        <ContactBanner locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <HomeMotion />
    </>
  );
}
