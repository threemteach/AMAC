import { iso31661 } from "iso-3166";
import { languageNames, type Locale } from "../../content/locale";
import { scoreWord, tokenize } from "../../content/search-text";

const aliases: Record<string, string[]> = {
  AE: ["UAE", "Emirates", "الإمارات", "الامارات العربية", "Emiratos", "ОАЭ"],
  CD: ["DR Congo", "Congo Kinshasa", "الكونغو الديمقراطية"],
  CG: ["Republic of the Congo", "Congo Brazzaville"],
  CZ: ["Czech Republic", "جمهورية التشيك"],
  GB: ["UK", "Britain", "Great Britain", "England", "بريطانيا", "انجلترا", "Великобритания"],
  KR: ["South Korea", "كوريا الجنوبية"],
  KP: ["North Korea", "كوريا الشمالية"],
  PS: ["Palestine", "فلسطين", "Palestina"],
  SA: ["KSA", "Saudi", "السعودية"],
  SZ: ["Swaziland"],
  TR: ["Turkey", "Turkiye", "Türkiye"],
  US: ["USA", "America", "امريكا", "أمريكا", "Estados Unidos", "США"],
  VN: ["Vietnam", "Viet Nam"],
  XK: ["Kosovo", "كوسوفو"],
};

const supportedLocales = Object.keys(languageNames) as Locale[];
const displayNames = supportedLocales.map((locale) => [locale, new Intl.DisplayNames([locale], { type: "region" })] as const);
const regions = [
  ...iso31661.map(({ alpha2, alpha3, name }) => ({ code: alpha2, alpha3, name })),
  { code: "XK", alpha3: "", name: "Kosovo" },
];

function phrase(value: string) {
  return tokenize(value.replace(/\b(?:[a-z]\.){2,}[a-z]?\.?/gi, (group) => group.replaceAll(".", ""))).join(" ");
}

export function getCountries(locale: Locale) {
  const collator = new Intl.Collator(locale);
  return regions.map(({ code, alpha3, name }) => {
    const names = displayNames.map(([language, formatter]) => [language, formatter.of(code) ?? name] as const);
    const label = names.find(([language]) => language === locale)?.[1] ?? name;
    const alternativeNames = new Set([name, ...names.map(([, translated]) => translated), ...(aliases[code] ?? [])].map(phrase));
    const codes = [code, alpha3].filter(Boolean).map(phrase);
    const words = new Set([...alternativeNames, ...codes].flatMap((value) => value.split(" ")));
    return { code, label, sortKey: phrase(label), codes, alternativeNames, words };
  }).sort((left, right) => collator.compare(left.label, right.label));
}

export type Country = ReturnType<typeof getCountries>[number];

export function findExactCountry(countries: Country[], query: string) {
  const key = phrase(query);
  if (!key) return undefined;
  const codeMatch = countries.find((country) => country.codes.includes(key));
  if (codeMatch) return codeMatch;
  const matches = countries.filter((country) => country.alternativeNames.has(key));
  return matches.length === 1 ? matches[0] : undefined;
}

export function searchCountries(countries: Country[], query: string) {
  const key = phrase(query);
  if (!key) return countries;

  const words = key.split(" ");
  return countries
    .map((country) => {
      if (country.codes.includes(key)) return { country, score: -3 };
      if (country.sortKey === key) return { country, score: -2 };
      if (country.alternativeNames.has(key)) return { country, score: -1 };
      if ([...country.alternativeNames].some((name) => name.startsWith(key))) return { country, score: 0 };
      const score = words.reduce((total, word) => {
        let best = Infinity;
        for (const term of country.words) best = Math.min(best, scoreWord(word, term));
        return total + best;
      }, 1);
      return { country, score };
    })
    .filter(({ score }) => Number.isFinite(score))
    .sort((left, right) => left.score - right.score)
    .map(({ country }) => country);
}
