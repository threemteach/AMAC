import type { Category } from "../../content/catalog-routes";

type SearchableProduct = {
  title: string;
  category: Category;
  terms: string[];
};

function tokenize(text: string) {
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}|ـ/gu, "")
    .replace(/[ىی]/gu, "ي")
    .replace(/ة/gu, "ه")
    .replace(/œ/gu, "oe")
    .replace(/ß/gu, "ss");

  return (normalized.match(/[\p{L}\p{N}]+/gu) ?? [])
    .map((word) => word.length > 4 ? word.replace(/^ال/u, "") : word);
}

// A swapped pair of adjacent letters counts as a single typing mistake.
function editDistance(left: string, right: string) {
  const grid = [Array.from({ length: right.length + 1 }, (_, index) => index)];

  for (let row = 1; row <= left.length; row++) {
    const current = [row];
    const previous = grid[row - 1];
    for (let column = 1; column <= right.length; column++) {
      const substitutionCost = left[row - 1] === right[column - 1] ? 0 : 1;
      let cost = Math.min(current[column - 1] + 1, previous[column] + 1, previous[column - 1] + substitutionCost);
      if (row > 1 && column > 1 && left[row - 1] === right[column - 2] && left[row - 2] === right[column - 1]) {
        cost = Math.min(cost, grid[row - 2][column - 2] + 1);
      }
      current.push(cost);
    }
    grid.push(current);
  }

  return grid[left.length][right.length];
}

function scoreWord(query: string, term: string) {
  if (term === query) return 0;
  if (term.startsWith(query)) return 1;
  if (query.length >= 3 && term.includes(query)) return 2;
  if (query.length < 4) return Infinity;

  const tolerance = query.length >= 8 ? 2 : 1;
  if (Math.abs(query.length - term.length) > tolerance) return Infinity;
  const distance = editDistance(query, term);
  return distance <= tolerance ? 3 + distance : Infinity;
}

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
