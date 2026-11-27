export type Locale = "en" | "ar";

export const homePaths: Record<Locale, string> = { en: "/", ar: "/ar" };

export const localeLabels = {
  en: {
    brand: "AMAC Group", navigation: "Main navigation", menu: "Menu",
    sidebar: "Navigation menu", close: "Close menu", standards: "Industry standards shown for reference",
  },
  ar: {
    brand: "مجموعة أماك", navigation: "القائمة الرئيسية", menu: "القائمة",
    sidebar: "قائمة التنقل", close: "إغلاق القائمة", standards: "معايير صناعية للاطلاع",
  },
};
