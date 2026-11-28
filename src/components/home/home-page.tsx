import { ContactBanner } from "../shared/contact-banner";
import { ConsideredJourney } from "./considered-journey";
import { FactoryProcess } from "./factory-process";
import { FeaturedHarvest } from "./featured-harvest";
import { FieldsIntro } from "./fields-intro";
import { HomeHero } from "./home-hero";
import { SiteMotion } from "../shared/site-motion";
import { IngredientCollections } from "./ingredient-collections";
import { OurStory } from "../shared/our-story";
import { QualityConfidence } from "../shared/quality-confidence";
import { ShippingRoutes } from "./shipping-routes";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";

import type { Locale } from "../../content/locale";

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
      <SiteMotion />
    </>
  );
}
