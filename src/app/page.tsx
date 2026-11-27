import { ConsideredJourney } from "../components/home/considered-journey";
import { FeaturedHarvest } from "../components/home/featured-harvest";
import { FieldsIntro } from "../components/home/fields-intro";
import { HomeHero } from "../components/home/home-hero";
import { IngredientCollections } from "../components/home/ingredient-collections";
import { OurStory } from "../components/home/our-story";
import { QualityConfidence } from "../components/home/quality-confidence";
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
      </main>
    </>
  );
}
