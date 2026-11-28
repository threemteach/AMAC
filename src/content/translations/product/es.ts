import type { StrawberryCopy, EnquiryCopy, ProductFormats } from "./index";
export const strawberry: StrawberryCopy = {
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
};

export const enquiry: EnquiryCopy = { close: "Cerrar", message: "Mensaje de consulta", copy: "Copiar el mensaje", copied: "Mensaje copiado", manual: "Selecciona y copia el mensaje para compartirlo." };

export const formats: ProductFormats = ["Floretes", "Trozos", "Cortadas"];

export const selectLabel: string = "Elige un producto";
