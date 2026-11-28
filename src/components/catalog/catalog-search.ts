import { scoreWord, tokenize } from "../../content/search-text";
import type { Category } from "../../content/catalog/catalog-routes";

type SearchableProduct = {
  title: string;
  category: Category;
  terms: string[];
};

export function searchCatalog<Product extends SearchableProduct>(
  products: Product[],
  category: Category | "all",
  query: string,
) {
  const words = tokenize(query);
  const candidates = products.filter((product) => category === "all" || product.category === category);
  if (words.length === 0) return candidates;

  // Prefer exact and prefix matches over approximations, then prefer the visible title.
  return candidates
    .map((product) => {
      const titleWords = new Set(tokenize(product.title));
      const terms = new Set([...titleWords, ...product.terms.flatMap(tokenize)]);
      const score = words.reduce((total, word) => {
        let best = Infinity;
        for (const term of terms) {
          const titlePenalty = titleWords.has(term) ? 0 : 0.25;
          best = Math.min(best, scoreWord(word, term) + titlePenalty);
        }
        return total + best;
      }, 0);
      return { product, score };
    })
    .filter(({ score }) => Number.isFinite(score))
    .sort((left, right) => left.score - right.score)
    .map(({ product }) => product);
}
