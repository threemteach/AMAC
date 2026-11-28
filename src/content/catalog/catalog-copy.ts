import type { Locale } from "../locale";

type CatalogCopy = {
  title: string;
  intro: string;
  search: string;
  collection: string;
  heading: string;
  all: string;
  noResults: string;
  explore: string;
  productTitles: [string, string, string, string];
};

export const catalogCopy: Record<Locale, CatalogCopy> = {
  en: {
    title: "A world of natural possibilities.",
    intro: "Explore our fruit and vegetable categories, then find your preferred product format.",
    search: "Explore our fruit and vegetable products",
    collection: "The collection", heading: "Explore our range.", all: "All products",
    noResults: "No products match your search.", explore: "Explore product",
    productTitles: ["Frozen Strawberries", "Frozen Broccoli", "Frozen Mango", "Frozen Green Beans"],
  },
  ar: {
    title: "عالم من خيرات الطبيعة.",
    intro: "تصفّح فئات الفواكه والخضروات واعثر على المنتج المناسب لك.",
    search: "ابحث عن الفواكه والخضروات",
    collection: "التشكيلة", heading: "تصفّح منتجاتنا.", all: "كل المنتجات",
    noResults: "لا توجد منتجات تطابق بحثك.", explore: "استكشف المنتج",
    productTitles: ["فراولة مجمّدة", "بروكلي مجمّد", "مانجو مجمّدة", "فاصوليا خضراء مجمّدة"],
  },
  fr: {
    title: "Un monde de possibilités naturelles.",
    intro: "Découvrez nos catégories de fruits et légumes et trouvez le produit qui vous convient.",
    search: "Rechercher un fruit ou un légume",
    collection: "La collection", heading: "Découvrez notre gamme.", all: "Tous les produits",
    noResults: "Aucun produit ne correspond à votre recherche.", explore: "Découvrir le produit",
    productTitles: ["Fraises surgelées", "Brocoli surgelé", "Mangue surgelée", "Haricots verts surgelés"],
  },
  de: {
    title: "Eine Welt natürlicher Möglichkeiten.",
    intro: "Entdecken Sie unsere Obst- und Gemüsekategorien und finden Sie das passende Produkt.",
    search: "Obst und Gemüse suchen",
    collection: "Das Sortiment", heading: "Entdecken Sie unser Sortiment.", all: "Alle Produkte",
    noResults: "Keine Produkte entsprechen Ihrer Suche.", explore: "Produkt entdecken",
    productTitles: ["Tiefgekühlte Erdbeeren", "Tiefgekühlter Brokkoli", "Tiefgekühlte Mango", "Tiefgekühlte grüne Bohnen"],
  },
  it: {
    title: "Un mondo di possibilità naturali.",
    intro: "Esplora le categorie di frutta e verdura e trova il prodotto adatto a te.",
    search: "Cerca frutta e verdura",
    collection: "La collezione", heading: "Scopri la nostra gamma.", all: "Tutti i prodotti",
    noResults: "Nessun prodotto corrisponde alla ricerca.", explore: "Scopri il prodotto",
    productTitles: ["Fragole surgelate", "Broccoli surgelati", "Mango surgelato", "Fagiolini surgelati"],
  },
  ru: {
    title: "Мир природных возможностей.",
    intro: "Выберите категорию фруктов или овощей и найдите подходящий продукт.",
    search: "Поиск фруктов и овощей",
    collection: "Коллекция", heading: "Откройте наш ассортимент.", all: "Все продукты",
    noResults: "По вашему запросу ничего не найдено.", explore: "Подробнее о продукте",
    productTitles: ["Замороженная клубника", "Замороженная брокколи", "Замороженное манго", "Замороженная стручковая фасоль"],
  },
  es: {
    title: "Un mundo de posibilidades naturales.",
    intro: "Explora nuestras categorías de frutas y verduras y encuentra el producto que necesitas.",
    search: "Buscar frutas y verduras",
    collection: "La colección", heading: "Descubre nuestra gama.", all: "Todos los productos",
    noResults: "Ningún producto coincide con tu búsqueda.", explore: "Descubrir el producto",
    productTitles: ["Fresas congeladas", "Brócoli congelado", "Mango congelado", "Judías verdes congeladas"],
  },
};
