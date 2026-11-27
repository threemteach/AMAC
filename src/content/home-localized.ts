import { homeContent as en } from "./home";
import { getInternationalHome } from "./international-home";
import type { Locale } from "./locale";

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

export function getHomeContent(locale: Locale) {
  if (locale === "en") return en;
  if (locale === "ar") return ar;
  return getInternationalHome(locale);
}
