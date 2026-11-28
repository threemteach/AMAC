import type { StrawberryCopy, EnquiryCopy, ProductFormats } from "./index";
export const strawberry: StrawberryCopy = {
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
};

export const enquiry: EnquiryCopy = { close: "Закрыть", message: "Текст запроса", copy: "Скопировать сообщение", copied: "Сообщение скопировано", manual: "Выделите и скопируйте сообщение, чтобы поделиться им." };

export const formats: ProductFormats = ["Соцветия", "Кусочки", "Нарезанные"];

export const selectLabel: string = "Выберите продукт";
