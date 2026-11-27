import type { Locale } from "./locale";

export const strawberryCuts = [
  { id: "whole", image: "/images/catalog/strawberries/whole.webp", position: "center" },
  { id: "halves", image: "/images/catalog/strawberries/halved-strawberry.webp", position: "center" },
  { id: "diced", image: "/images/frozen-strawberries.png", position: "center 68%" },
] as const;

export const strawberrySizes = [15, 25, 35] as const;

export type StrawberryCopy = {
  category: string;
  description: string;
  cutLabel: string;
  sizeLabel: string;
  cuts: [string, string, string];
  unit: string;
  gallery: string;
  referencePhoto: string;
  enquire: string;
  save: string;
  saved: string;
  detailsLabel: string;
  detailsHeading: string;
  specs: [string, string, string, string, string];
  range: string;
  origin: string;
  packaging: string;
  availability: string;
  requirementsHeading: [string, string];
  requirements: string;
};

export const strawberryCopy: Record<Locale, StrawberryCopy> = {
  en: {
    category: "Frozen fruits",
    description: "Bright colour, delicate sweetness and a versatile range of cuts for your next product.",
    cutLabel: "Choose your cut", sizeLabel: "Select size / grade", cuts: ["Whole", "Halves", "Diced"], unit: "mm",
    gallery: "Strawberry product photos", referencePhoto: "Illustrative photo",
    enquire: "Enquire about this product", save: "Save product for later", saved: "Product saved",
    detailsLabel: "The details", detailsHeading: "Clarity in every specification.",
    specs: ["Product range", "Origin", "Cut & size", "Packaging", "Availability"],
    range: "Frozen produce", origin: "Confirm per batch", packaging: "On enquiry", availability: "Subject to confirmation",
    requirementsHeading: ["Your product.", "Your requirements."],
    requirements: "Share your application, packaging and volume with our team.",
  },
  ar: {
    category: "فواكه مجمّدة",
    description: "لون زاهٍ وحلاوة خفيفة وخيارات تقطيع تناسب استخدامات مختلفة.",
    cutLabel: "اختر شكل التقطيع", sizeLabel: "اختر المقاس أو الدرجة", cuts: ["كاملة", "أنصاف", "مكعبات"], unit: "مم",
    gallery: "صور منتج الفراولة", referencePhoto: "صورة توضيحية",
    enquire: "استفسر عن المنتج", save: "احفظ المنتج لوقت لاحق", saved: "تم حفظ المنتج",
    detailsLabel: "التفاصيل", detailsHeading: "وضوح في كل مواصفة.",
    specs: ["فئة المنتج", "المنشأ", "التقطيع والمقاس", "التعبئة", "التوافر"],
    range: "محاصيل مجمّدة", origin: "يُؤكّد حسب الدفعة", packaging: "عند الاستفسار", availability: "يخضع للتأكيد",
    requirementsHeading: ["منتجك.", "متطلباتك."],
    requirements: "شارك فريقنا معلومات عن الاستخدام والتعبئة والكمية المطلوبة.",
  },
  fr: {
    category: "Fruits surgelés",
    description: "Une couleur vive, une douceur délicate et plusieurs découpes pour s’adapter à votre prochain produit.",
    cutLabel: "Choisir la découpe", sizeLabel: "Choisir le calibre", cuts: ["Entières", "Demi-fraises", "En dés"], unit: "mm",
    gallery: "Photos des fraises", referencePhoto: "Photo d’illustration",
    enquire: "Se renseigner sur ce produit", save: "Enregistrer le produit", saved: "Produit enregistré",
    detailsLabel: "Les détails", detailsHeading: "Des spécifications transparentes.",
    specs: ["Gamme", "Origine", "Découpe et calibre", "Conditionnement", "Disponibilité"],
    range: "Produits surgelés", origin: "À confirmer pour chaque lot", packaging: "Sur demande", availability: "Sous réserve de confirmation",
    requirementsHeading: ["Votre produit.", "Vos exigences."],
    requirements: "Indiquez à notre équipe l’usage prévu, le conditionnement et le volume souhaités.",
  },
  de: {
    category: "Tiefgekühltes Obst",
    description: "Leuchtende Farbe, feine Süße und vielseitige Schnittformen für Ihr nächstes Produkt.",
    cutLabel: "Schnittform wählen", sizeLabel: "Größe wählen", cuts: ["Ganz", "Halbiert", "Gewürfelt"], unit: "mm",
    gallery: "Produktfotos der Erdbeeren", referencePhoto: "Beispielfoto",
    enquire: "Produktanfrage stellen", save: "Produkt merken", saved: "Produkt gemerkt",
    detailsLabel: "Die Details", detailsHeading: "Klare Angaben zu jeder Spezifikation.",
    specs: ["Sortiment", "Herkunft", "Schnitt und Größe", "Verpackung", "Verfügbarkeit"],
    range: "Tiefkühlprodukte", origin: "Je Charge zu bestätigen", packaging: "Auf Anfrage", availability: "Nach Bestätigung",
    requirementsHeading: ["Ihr Produkt.", "Ihre Anforderungen."],
    requirements: "Teilen Sie uns den Verwendungszweck, die gewünschte Verpackung und die Menge mit.",
  },
  it: {
    category: "Frutta surgelata",
    description: "Colore vivace, dolcezza delicata e diversi formati di taglio per il tuo prossimo prodotto.",
    cutLabel: "Scegli il taglio", sizeLabel: "Seleziona il calibro", cuts: ["Intere", "A metà", "A cubetti"], unit: "mm",
    gallery: "Foto delle fragole", referencePhoto: "Foto illustrativa",
    enquire: "Chiedi informazioni sul prodotto", save: "Salva il prodotto", saved: "Prodotto salvato",
    detailsLabel: "I dettagli", detailsHeading: "Chiarezza in ogni specifica.",
    specs: ["Gamma", "Origine", "Taglio e calibro", "Confezionamento", "Disponibilità"],
    range: "Prodotti surgelati", origin: "Da confermare per lotto", packaging: "Su richiesta", availability: "Soggetta a conferma",
    requirementsHeading: ["Il tuo prodotto.", "Le tue esigenze."],
    requirements: "Indica al nostro team l’uso previsto, il confezionamento e la quantità desiderata.",
  },
  ru: {
    category: "Замороженные фрукты",
    description: "Яркий цвет, нежная сладость и несколько вариантов нарезки для вашего продукта.",
    cutLabel: "Выберите нарезку", sizeLabel: "Выберите размер", cuts: ["Целая", "Половинки", "Кубики"], unit: "мм",
    gallery: "Фотографии клубники", referencePhoto: "Иллюстративное фото",
    enquire: "Запросить информацию о продукте", save: "Сохранить продукт", saved: "Продукт сохранён",
    detailsLabel: "Подробности", detailsHeading: "Прозрачные характеристики.",
    specs: ["Категория", "Происхождение", "Нарезка и размер", "Упаковка", "Наличие"],
    range: "Замороженная продукция", origin: "Уточняется по партии", packaging: "По запросу", availability: "Требует подтверждения",
    requirementsHeading: ["Ваш продукт.", "Ваши требования."],
    requirements: "Расскажите нашей команде о назначении продукта, нужной упаковке и объёме.",
  },
  es: {
    category: "Frutas congeladas",
    description: "Color vivo, dulzura delicada y distintos formatos de corte para tu próximo producto.",
    cutLabel: "Elige el corte", sizeLabel: "Selecciona el calibre", cuts: ["Enteras", "Mitades", "En dados"], unit: "mm",
    gallery: "Fotos de las fresas", referencePhoto: "Foto ilustrativa",
    enquire: "Consultar sobre este producto", save: "Guardar producto", saved: "Producto guardado",
    detailsLabel: "Los detalles", detailsHeading: "Claridad en cada especificación.",
    specs: ["Gama", "Origen", "Corte y calibre", "Envasado", "Disponibilidad"],
    range: "Productos congelados", origin: "Se confirma por lote", packaging: "Bajo consulta", availability: "Sujeta a confirmación",
    requirementsHeading: ["Tu producto.", "Tus requisitos."],
    requirements: "Comenta con nuestro equipo el uso previsto, el envasado y el volumen que necesitas.",
  },
};
