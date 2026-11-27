import farmImage from "../../public/images/farm.png";
import fruitsImage from "../../public/images/frozen-fruits.jpg";
import vegetablesImage from "../../public/images/frozen-vegetables.jpg";
import strawberriesImage from "../../public/images/frozen-strawberries.png";
import broccoliImage from "../../public/images/frozen-broccoli.png";
import mangoImage from "../../public/images/frozen-mango.png";
import greenBeansImage from "../../public/images/frozen-green-beans.png";
import storyImage from "../../public/images/our-story-field.png";

// Keep editable copy and asset references together for the future dashboard.
export const homeContent = {
  header: {
    announcement: "Rooted in Egypt. Connected to the world.",
    navigation: ["Home", "Our products", "About us", "Journal", "Contact"],
    quoteLabel: "Request a quote",
  },
  hero: {
    image: farmImage,
    eyebrow: "Egyptian roots. Global reach.",
    heading: ["Nature’s finest. Preserved.", "For the world."],
    description: [
      "Discover frozen fruits and vegetables from AMAC Group.",
      "Based in Alexandria, connecting Egyptian produce",
      "with international possibilities.",
    ],
    primaryAction: "Explore our products",
    secondaryAction: "Our story",
    ribbonItems: [
      { label: "Egyptian produce", icon: "❧" },
      { label: "Frozen fruits & vegetables" },
      { label: "International partnerships", icon: "↗" },
    ],
  },
  fieldsIntro: {
    watermark: "/images/fields-watermark.svg",
    eyebrow: "A selection worth sharing",
    heading: ["From our fields", "to your market"],
    description: [
      "Good food starts with good produce.",
      "Explore our selection of Egyptian fruits and vegetables,",
      "ready for new possibilities.",
    ],
    actionLabel: "Discover the range",
  },
  ingredientCollections: {
    eyebrow: "A naturally diverse selection",
    heading: "Find your next ingredient.",
    cards: [
      {
        title: "Fruits",
        label: "Frozen collection",
        actionLabel: "Explore the collection",
        image: fruitsImage,
        imagePosition: "center top",
      },
      {
        title: "Vegetables",
        label: "Frozen collection",
        actionLabel: "Explore the collection",
        image: vegetablesImage,
        imagePosition: "center",
      },
    ],
  },
  featuredHarvest: {
    heading: ["A little closer", "to the harvest."],
    productAction: "Explore our products",
    catalogAction: "View All Products",
    products: [
      {
        name: "Strawberries",
        category: "Frozen fruit",
        description: "Bright, flavourful strawberries prepared for year-round possibilities.",
        image: strawberriesImage,
        imagePosition: "center 68%",
        imageScale: 1.52,
      },
      {
        name: "Broccoli",
        category: "Frozen vegetable",
        description: "Frozen broccoli florets prepared for year-round possibilities.",
        image: broccoliImage,
        imagePosition: "center 58%",
        imageScale: 1.25,
      },
      {
        name: "Mango",
        category: "Frozen fruit",
        description: "Sweet, golden mango pieces prepared for year-round possibilities.",
        image: mangoImage,
        imagePosition: "center 67%",
        imageScale: 1.23,
      },
      {
        name: "Green Beans",
        category: "Frozen vegetable",
        description: "Cut green beans prepared for year-round possibilities.",
        image: greenBeansImage,
        imagePosition: "center",
        imageScale: 1.2,
      },
    ],
  },
  qualityConfidence: {
    eyebrow: "Quality & confidence",
    heading: ["Confidence starts", "with clarity."],
    description:
      "Food safety and quality documentation matter when sourcing across borders. Ask our team for the certificates applicable to your order.",
    standardsNote: "Common industry standards · For reference",
    actionLabel: "Request documentation",
    standards: [
      { name: "ISO 9001:2015", image: "/images/iso-9001.png", shape: "seal" },
      { name: "FDA", image: "/images/fda.png", shape: "wordmark" },
      { name: "ISO 22000:2018", image: "/images/iso-22000.png", shape: "seal" },
    ],
  },
  story: {
    eyebrow: "Our story",
    heading: ["Good partnerships", "begin at the source."],
    image: storyImage,
    imageAlt: "Sunset over a cultivated field",
    points: [
      "From Alexandria, AMAC Group connects Egyptian frozen fruits and vegetables with customers around the world. Every relationship starts with a conversation and a clear understanding of what you need.",
      "AMAC Group is an Alexandria-based company working in the export of frozen fruits and vegetables.",
      "A clear product range. A personal conversation.",
    ],
    actionLabel: "See our story",
  },
};
