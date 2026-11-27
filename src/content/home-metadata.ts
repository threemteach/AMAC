import type { Metadata } from "next";
import { homePaths, type Locale } from "./locale";

const descriptions: Record<Locale, [string, string]> = {
  en: ["AMAC Group | Frozen Fruits & Vegetables", "Egyptian frozen fruits and vegetables from AMAC Group, based in Alexandria."],
  ar: ["مجموعة أماك | فواكه وخضروات مجمّدة", "فواكه وخضروات مصرية مجمّدة للتصدير من مجموعة أماك في الإسكندرية."],
  fr: ["AMAC Group | Fruits et légumes surgelés", "Fruits et légumes surgelés d’Égypte pour l’exportation, par AMAC Group à Alexandrie."],
  de: ["AMAC Group | Tiefgekühltes Obst und Gemüse", "Tiefgekühltes Obst und Gemüse aus Ägypten für den Export, von AMAC Group in Alexandria."],
  it: ["AMAC Group | Frutta e verdura surgelate", "Frutta e verdura surgelate egiziane per l’esportazione, da AMAC Group ad Alessandria d’Egitto."],
  es: ["AMAC Group | Frutas y verduras congeladas", "Frutas y verduras congeladas de Egipto para exportación, de AMAC Group en Alejandría."],
  ru: ["AMAC Group | Замороженные фрукты и овощи", "Замороженные фрукты и овощи из Египта на экспорт от компании AMAC Group из Александрии."],
};

export function getHomeMetadata(locale: Locale): Metadata {
  const [title, description] = descriptions[locale];
  return { title, description, alternates: { languages: { ...homePaths, "x-default": homePaths.en } } };
}
