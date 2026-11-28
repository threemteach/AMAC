import type { LoadingCopy, HomeMetadataCopy } from "./index";
import type { InternationalHomeCopy } from "../../international-home";

const processDescription = "Cada pedido empieza con una conversación sobre tus necesidades. Estas son las etapas que acercan la cosecha a tu mercado.";
const shippingHeading = ["El transporte adecuado", "para tu destino."];
const shippingDescription = "Comentamos contigo las opciones de transporte, los plazos y los requisitos de tu pedido.";

export const es: InternationalHomeCopy = {
  header: {
    announcement: "Raíces egipcias. Conexiones en todo el mundo.",
    navigation: ["Inicio", "Productos", "Quiénes somos", "Noticias", "Contacto"],
    quoteLabel: "Solicitar presupuesto",
  },
  hero: {
    eyebrow: "Raíces egipcias. Alcance mundial.",
    heading: ["Lo mejor de la naturaleza.", "Congelado para el mundo."],
    description: [
      "Descubre las frutas y verduras congeladas de AMAC Group.",
      "Desde Alejandría, llevamos las cosechas egipcias a los mercados internacionales.",
    ],
    primaryAction: "Descubrir los productos",
    secondaryAction: "Nuestra historia",
    ribbons: ["Cosechas egipcias", "Frutas y verduras congeladas", "Colaboraciones internacionales"],
  },
  fieldsIntro: {
    eyebrow: "Una selección para compartir",
    heading: ["De nuestros campos", "a tu mercado"],
    description: [
      "Los buenos alimentos empiezan con buenas materias primas.",
      "Descubre nuestra selección de frutas y verduras egipcias y todas las posibilidades que ofrece.",
    ],
    actionLabel: "Descubrir la gama",
  },
  ingredientCollections: {
    eyebrow: "Una selección diversa por naturaleza",
    heading: "Encuentra tu próximo ingrediente.",
    titles: ["Frutas", "Verduras"],
    label: "Gama de congelados",
    actionLabel: "Descubrir la gama",
  },
  featuredHarvest: {
    heading: ["Un poco más cerca", "de la cosecha."],
    productAction: "Descubrir los productos",
    catalogAction: "Ver todos los productos",
    products: [
      { name: "Fresas", category: "Fruta congelada", description: "Fresas sabrosas, preparadas para su uso durante todo el año." },
      { name: "Brócoli", category: "Verdura congelada", description: "Floretes de brócoli congelados, listos para usar todo el año." },
      { name: "Mango", category: "Fruta congelada", description: "Trozos de mango dorado y dulce, disponibles todo el año." },
      { name: "Judías verdes", category: "Verdura congelada", description: "Judías verdes cortadas, preparadas para su uso durante todo el año." },
    ],
  },
  qualityConfidence: {
    eyebrow: "Calidad y confianza",
    heading: ["La confianza empieza", "con la transparencia."],
    description: "La documentación de calidad y seguridad alimentaria es importante al importar. Pregunta a nuestro equipo qué certificados se aplican a tu pedido.",
    standardsNote: "Normas habituales del sector · A título informativo",
    actionLabel: "Solicitar documentación",
  },
  story: {
    eyebrow: "Nuestra historia",
    heading: ["Las buenas colaboraciones", "empiezan en el origen."],
    imageAlt: "Atardecer sobre un campo cultivado",
    points: [
      "Desde Alejandría, AMAC Group suministra frutas y verduras congeladas de Egipto a clientes de todo el mundo. Cada colaboración comienza con una conversación para entender lo que necesitas.",
      "AMAC Group es una empresa con sede en Alejandría dedicada a la exportación de frutas y verduras congeladas.",
      "Una gama clara y un contacto directo.",
    ],
    actionLabel: "Conocer nuestra historia",
  },
  journey: {
    eyebrow: "Del campo al destino",
    heading: ["Un recorrido cuidado", "desde el principio."],
    description: processDescription,
    steps: [
      { stage: "Selección", title: "Desde la cosecha", description: "Seleccionamos las cosechas según los requisitos de cada producto." },
      { stage: "Preparación", title: "Preparación cuidadosa", description: "Preparamos y manipulamos los productos con cuidado para preservar su calidad." },
      { stage: "Congelación", title: "Listos para viajar", description: "Preparamos los productos congelados para su almacenamiento y transporte." },
      { stage: "Entrega", title: "Adaptados a tu mercado", description: "Comentamos contigo las especificaciones, el envasado y los requisitos de entrega." },
    ],
  },
  factoryProcess: {
    eyebrow: "De nuestra fábrica a tu destino",
    heading: ["Cómo preparamos", "nuestros productos."],
    description: processDescription,
  },
  shippingRoutes: {
    eyebrow: "Conectados con tu mercado",
    heading: shippingHeading,
    description: shippingDescription,
    note: "La disponibilidad y la gestión de la cadena de frío dependen del producto, la ruta y el pedido.",
    actionLabel: "Hablar sobre tu envío",
    methods: [
      { title: "Por tierra", description: "El transporte por carretera conecta las etapas del trayecto y cubre las rutas regionales adecuadas." },
      { title: "Por aire", description: "El transporte aéreo es una opción cuando los plazos, el producto y el destino lo requieren." },
      { title: "Por mar", description: "El transporte marítimo es una opción para los envíos internacionales y los pedidos de mayor volumen." },
    ],
  },
  contactBanner: {
    eyebrow: "Hablemos",
    heading: shippingHeading,
    description: shippingDescription,
    actionLabel: "Contactar con nuestro equipo",
  },
};


export const loading: LoadingCopy = {
  title: "Cargando el sitio de AMAC Group", loading: "Cargando la página…",
  slow: "La foto del campo está tardando un poco más.",
  offline: "No tienes conexión. Puedes seguir explorando la página.",
  failed: "No se ha podido cargar la foto del campo.", continue: "Continuar al sitio", retry: "Reintentar",
};

export const metadata: HomeMetadataCopy = ["AMAC Group | Frutas y verduras congeladas", "Frutas y verduras congeladas de Egipto para exportación, de AMAC Group en Alejandría."];
