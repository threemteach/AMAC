import type { StrawberryCopy, EnquiryCopy, ProductFormats } from "./index";
export const strawberry: StrawberryCopy = {
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
};

export const enquiry: EnquiryCopy = { close: "إغلاق", message: "رسالة الاستفسار", copy: "نسخ الرسالة", copied: "تم نسخ الرسالة", manual: "حدّد الرسالة وانسخها لمشاركتها." };

export const formats: ProductFormats = ["زهيرات", "قطع", "مقطّعة"];

export const selectLabel: string = "اختر المنتج";
