import { homeContent as en } from "./home";
import { getInternationalHome } from "./international-home";
import type { Locale } from "./locale";
import { contentText, getCms, lines } from "./cms-store";
import type { CopyField } from "./cms-options";

const shippingHeading = ["وسيلة الشحن المناسبة", "لوجهتك."];
const shippingDescription = "نناقش معك خيارات الشحن والمواعيد والمتطلبات المناسبة لطلبك.";
const processDescription = "نبدأ كل طلب بفهم احتياجاتك. تعرّف على المراحل التي يمر بها المحصول حتى يصل إلى سوقك.";

const ar: typeof en = {
  header: {
    announcement: "جذور مصرية تصل إلى العالم.",
    navigation: ["الرئيسية", "منتجاتنا", "من نحن", "المجلة", "تواصل معنا"],
    quoteLabel: "اطلب عرض سعر",
  },
  hero: {
    image: en.hero.image,
    eyebrow: "جذور مصرية. حضور عالمي.",
    heading: ["أجود ما تمنحه الطبيعة.", "مجمّد ليصل إلى العالم."],
    description: [
      "اكتشف الفواكه والخضروات المجمّدة من مجموعة أماك.",
      "من الإسكندرية، نوصل المحاصيل المصرية إلى أسواق العالم.",
    ],
    primaryAction: "تصفّح منتجاتنا",
    secondaryAction: "قصتنا",
    ribbonItems: [
      { label: "محاصيل مصرية", icon: "❧" },
      { label: "فواكه وخضروات مجمّدة" },
      { label: "شراكات دولية", icon: "↖" },
    ],
  },
  fieldsIntro: {
    watermark: en.fieldsIntro.watermark,
    eyebrow: "تشكيلة تستحق المشاركة",
    heading: ["من حقولنا", "إلى سوقك"],
    description: [
      "الغذاء الجيد يبدأ بمحصول جيد.",
      "تعرّف على تشكيلتنا من الفواكه والخضروات المصرية،",
      "الجاهزة لفرص جديدة.",
    ],
    actionLabel: "اكتشف التشكيلة",
  },
  ingredientCollections: {
    eyebrow: "تشكيلة متنوعة بطبيعتها",
    heading: "اعثر على المكوّن المناسب.",
    cards: en.ingredientCollections.cards.map((card, index) => ({
      ...card,
      title: index === 0 ? "الفواكه" : "الخضروات",
      label: "تشكيلة مجمّدة",
      actionLabel: "اكتشف التشكيلة",
    })),
  },
  featuredHarvest: {
    heading: ["تعرّف أكثر", "على محاصيلنا."],
    productAction: "تصفّح منتجاتنا",
    catalogAction: "عرض كل المنتجات",
    products: [
      { ...en.featuredHarvest.products[0], name: "الفراولة", category: "فواكه مجمّدة", description: "فراولة بطعم غني، مجهّزة للاستخدام على مدار العام." },
      { ...en.featuredHarvest.products[1], name: "البروكلي", category: "خضروات مجمّدة", description: "زهرات بروكلي مجمّدة، مجهّزة للاستخدام على مدار العام." },
      { ...en.featuredHarvest.products[2], name: "المانجو", category: "فواكه مجمّدة", description: "قطع مانجو ذهبية حلوة، متاحة للاستخدام على مدار العام." },
      { ...en.featuredHarvest.products[3], name: "الفاصوليا الخضراء", category: "خضروات مجمّدة", description: "فاصوليا خضراء مقطّعة، مجهّزة للاستخدام على مدار العام." },
    ],
  },
  qualityConfidence: {
    standards: en.qualityConfidence.standards,
    eyebrow: "الجودة والثقة",
    heading: ["الثقة تبدأ", "بالوضوح."],
    description: "توثيق سلامة الغذاء والجودة مهم عند الاستيراد. تواصل مع فريقنا لمعرفة الشهادات المتاحة لطلبك.",
    standardsNote: "معايير شائعة في القطاع · للاطلاع",
    actionLabel: "اطلب المستندات",
  },
  story: {
    image: en.story.image,
    imageAlt: "غروب الشمس فوق حقل مزروع",
    eyebrow: "قصتنا",
    heading: ["الشراكات الناجحة", "تبدأ من المصدر."],
    points: [
      "من الإسكندرية، تصل الفواكه والخضروات المصرية المجمّدة من مجموعة أماك إلى عملاء حول العالم. تبدأ كل شراكة بحوار نفهم من خلاله احتياجاتك.",
      "مجموعة أماك شركة مقرها الإسكندرية، تعمل في تصدير الفواكه والخضروات المجمّدة.",
      "تشكيلة واضحة من المنتجات وتواصل مباشر مع فريقنا.",
    ],
    actionLabel: "تعرّف على قصتنا",
  },
  journey: {
    eyebrow: "من الحقل إلى الوجهة",
    heading: ["رحلة مدروسة", "من أول خطوة."],
    description: processDescription,
    steps: [
      { ...en.journey.steps[0], stage: "الاختيار", title: "من قلب الحصاد", description: "نختار المحاصيل مع مراعاة متطلبات كل منتج." },
      { ...en.journey.steps[1], stage: "التجهيز", title: "تجهيز بعناية", description: "نجهّز المنتجات ونتعامل معها بما يحافظ على جودتها." },
      { ...en.journey.steps[2], stage: "التجميد", title: "جاهزة للشحن", description: "تُجهّز المحاصيل المجمّدة للتخزين ثم النقل." },
      { ...en.journey.steps[3], stage: "التسليم", title: "وفق متطلبات سوقك", description: "نناقش معك مواصفات المنتج والتعبئة ومتطلبات التسليم." },
    ],
  },
  factoryProcess: {
    cover: en.factoryProcess.cover,
    eyebrow: "من مصنعنا إلى وجهتك",
    heading: ["كيف نجهّز", "منتجاتنا؟"],
    description: processDescription,
  },
  shippingRoutes: {
    eyebrow: "نصل إلى سوقك",
    heading: shippingHeading,
    description: shippingDescription,
    note: "يتحدد التوافر وترتيب سلسلة التبريد حسب المنتج ومسار الشحن والطلب.",
    actionLabel: "ناقش معنا تفاصيل الشحنة",
    methods: [
      { ...en.shippingRoutes.methods[0], title: "شحن بري", description: "يربط النقل البري بين مراحل الرحلة ويخدم المسارات الإقليمية المناسبة." },
      { ...en.shippingRoutes.methods[1], title: "شحن جوي", description: "يمكن اختيار الشحن الجوي عندما يناسب الموعد والمنتج والوجهة." },
      { ...en.shippingRoutes.methods[2], title: "شحن بحري", description: "الشحن البحري خيار للشحنات الدولية والطلبات ذات الكميات الكبيرة." },
    ],
  },
  contactBanner: {
    watermark: en.contactBanner.watermark,
    eyebrow: "خلّينا نتواصل",
    heading: shippingHeading,
    description: shippingDescription,
    actionLabel: "تواصل مع فريقنا",
  },
};

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
