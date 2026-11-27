import { getCatalog } from "./catalog";
import { productIds, type ProductId } from "./catalog-routes";
import { getHomeContent } from "./home-localized";
import type { Locale } from "./locale";
import { strawberryCopy, strawberryCuts, strawberrySizes } from "./strawberry";

const formats = {
  en: ["Florets", "Pieces", "Cut"],
  ar: ["زهيرات", "قطع", "مقطّعة"],
  fr: ["Fleurettes", "Morceaux", "Coupés"],
  de: ["Röschen", "Stücke", "Geschnitten"],
  it: ["Cimette", "Pezzi", "Tagliati"],
  ru: ["Соцветия", "Кусочки", "Нарезанные"],
  es: ["Floretes", "Trozos", "Cortadas"],
} satisfies Record<Locale, [string, string, string]>;

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
  const product = catalog.products[productIds.indexOf(id)];
  const copy = strawberryCopy[locale];
  const featured = getHomeContent(locale).featuredHarvest.products[productIds.indexOf(id)];
  const strawberry = id === "strawberries";

  return {
    id,
    title: product.title,
    botanicalName: strawberry ? "Fragaria × ananassa" : undefined,
    copy: strawberry ? copy : {
      ...copy,
      category: featured.category,
      description: featured.description,
      gallery: product.title,
    },
    cuts: strawberry
      ? strawberryCuts.map((cut, index) => ({ ...cut, label: copy.cuts[index], illustrative: cut.id !== "diced" }))
      : [{ id: "standard", image: featured.image, position: featured.imagePosition, label: formats[locale][productIds.indexOf(id) - 1], illustrative: false }],
    sizes: strawberry ? strawberrySizes : [],
    defaultCut: strawberry ? 2 : 0,
    defaultSize: strawberry ? 25 : undefined,
    enquiry: enquiryText[locale],
  };
}
