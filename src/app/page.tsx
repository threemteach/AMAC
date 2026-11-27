import { ContactBanner } from "../components/home/contact-banner";
import { ConsideredJourney } from "../components/home/considered-journey";
import { FactoryProcess } from "../components/home/factory-process";
import { FeaturedHarvest } from "../components/home/featured-harvest";
import { FieldsIntro } from "../components/home/fields-intro";
import { HomeHero } from "../components/home/home-hero";
import { HomeMotion } from "../components/home/home-motion";
import { IngredientCollections } from "../components/home/ingredient-collections";
import { OurStory } from "../components/home/our-story";
import { QualityConfidence } from "../components/home/quality-confidence";
import { ShippingRoutes } from "../components/home/shipping-routes";
import { SiteFooter } from "../components/site/site-footer";
import { SiteHeader } from "../components/site/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeHero />
        <FieldsIntro />
        <IngredientCollections />
        <FeaturedHarvest />
        <QualityConfidence />
        <OurStory />
        <ConsideredJourney />
        <FactoryProcess />
        <ShippingRoutes />
        <ContactBanner />
      </main>
      <SiteFooter />
      <HomeMotion />
    </>
  );
}
