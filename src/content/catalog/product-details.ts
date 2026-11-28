import { getBaseProducts, getCatalog } from "./catalog";
import { productIds, type ProductId } from "./catalog-routes";
import { getBaseHomeContent } from "../home-localized";
import type { Locale } from "../locale";
import { strawberryCopy } from "./strawberry";
import { contentText } from "../localized-text";
import { getCms } from "../../server/cms/store";

export const enquiryText = {
  en: { close: "Close", message: "Enquiry message", copy: "Copy message", copied: "Message copied", manual: "Select and copy the message to share it." },
  ar: { close: "إغلاق", message: "رسالة الاستفسار", copy: "نسخ الرسالة", copied: "تم نسخ الرسالة", manual: "حدّد الرسالة وانسخها لمشاركتها." },
  fr: { close: "Fermer", message: "Message de demande", copy: "Copier le message", copied: "Message copié", manual: "Sélectionnez et copiez le message pour le partager." },
  de: { close: "Schließen", message: "Anfragetext", copy: "Nachricht kopieren", copied: "Nachricht kopiert", manual: "Markieren und kopieren Sie die Nachricht, um sie zu teilen." },
  it: { close: "Chiudi", message: "Messaggio di richiesta", copy: "Copia il messaggio", copied: "Messaggio copiato", manual: "Seleziona e copia il messaggio per condividerlo." },
  ru: { close: "Закрыть", message: "Текст запроса", copy: "Скопировать сообщение", copied: "Сообщение скопировано", manual: "Выделите и скопируйте сообщение, чтобы поделиться им." },
  es: { close: "Cerrar", message: "Mensaje de consulta", copy: "Copiar el mensaje", copied: "Mensaje copiado", manual: "Selecciona y copia el mensaje para compartirlo." },
} satisfies Record<Locale, { close: string; message: string; copy: string; copied: string; manual: string }>;

export function getProductDetails(locale: Locale, id: ProductId) {
  const catalog = getCatalog(locale);
  const product = catalog.products.find((entry) => entry.id === id);
  if (!product) return null;
  const copy = strawberryCopy[locale];
  const featured = getBaseHomeContent(locale).featuredHarvest.products[productIds.findIndex((entry) => entry === id)];
  const baseCategory = getBaseProducts(locale).find((entry) => entry.id === id)?.category;
  const strawberry = id === "strawberries";
  const entry = getCms()?.products.find((item) => item.slug === id);
  const description = contentText(entry?.description, locale, strawberry ? copy.description : featured?.description);

  return {
    id,
    title: product.title,
    botanicalName: entry ? entry.botanicalName : strawberry ? "Fragaria × ananassa" : undefined,
    seoTitle: contentText(entry?.seoTitle, locale),
    seoDescription: contentText(entry?.seoDescription, locale),
    copy: {
      ...copy,
      category: entry && baseCategory !== product.category
        ? catalog.categories.find((category) => category.id === product.category)?.title ?? copy.category
        : strawberry ? copy.category : featured?.category ?? copy.category,
      description,
      gallery: strawberry ? copy.gallery : product.title,
      origin: contentText(entry?.origin, locale, copy.origin),
      packaging: contentText(entry?.packaging, locale, copy.packaging),
      availability: contentText(entry?.availability, locale, copy.availability),
    },
    cuts: product.cuts.map((cut) => ({ ...cut, image: cut.image || product.image })),
    attributes: product.attributes,
    sizes: product.sizes,
    defaultCut: strawberry ? Math.max(0, product.cuts.findIndex((cut) => cut.id === "diced")) : 0,
    defaultSize: strawberry && product.sizes.includes(25) ? 25 : product.sizes[0],
    enquiry: enquiryText[locale],
  };
}

export type ProductDetail = NonNullable<ReturnType<typeof getProductDetails>>;
