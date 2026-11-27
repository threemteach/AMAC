import type { Locale } from "./locale";

type FormText = [string, string, string, string, string, string, string];

export type ContactCopy = {
  title: string;
  intro: string;
  eyebrow: string;
  heading: [string, string];
  location: string;
  address: string;
  email: string;
  emailLabel: string;
  emailNote: string;
  phone: string;
  phoneNote: string;
  locationDescription: string;
  formTitle: string;
  preview: string;
  labels: FormText;
  placeholders: FormText;
};

export const contactCopy: Record<Locale, ContactCopy> = {
  en: {
    title: "Let’s grow something together.",
    intro: "Tell us about your business and product requirements.",
    eyebrow: "Start a conversation",
    heading: [
      "Your next partnership",
      "starts here."
    ],
    location: "Our Location",
    address: "Full office address to be added.",
    email: "Email our team",
    emailLabel: "General / Export enquiries",
    emailNote: "Official email addresses to be supplied.",
    phone: "Call us",
    phoneNote: "Company phone number to be supplied.",
    locationDescription: "A Mediterranean home. An international outlook.",
    formTitle: "Product enquiry",
    preview: "Preview enquiry",
    labels: [
      "Full name",
      "Company",
      "Work email",
      "Country",
      "Product of interest",
      "Estimated volume",
      "Tell us what you need"
    ],
    placeholders: [
      "Your name",
      "Company name",
      "you@company.com",
      "Your country",
      "Select a product",
      "e.g. 20 tonnes",
      "Preferred cut, size, packaging and destination…"
    ]
  },
  ar: {
    title: "خلّينا ننمو مع بعض.",
    intro: "احكِ لنا عن نشاطك ومتطلبات المنتج اللي بتدور عليه.",
    eyebrow: "ابدأ المحادثة",
    heading: [
      "شراكتك الجاية",
      "تبدأ من هنا."
    ],
    location: "موقعنا",
    address: "سيتم إضافة عنوان المكتب بالتفصيل.",
    email: "راسل فريقنا",
    emailLabel: "استفسارات عامة واستفسارات التصدير",
    emailNote: "سيتم إضافة عناوين البريد الرسمية.",
    phone: "اتصل بنا",
    phoneNote: "سيتم إضافة رقم تليفون الشركة.",
    locationDescription: "جذور على المتوسط ونظرة إلى العالم.",
    formTitle: "استفسار عن منتج",
    preview: "معاينة الاستفسار",
    labels: [
      "الاسم بالكامل",
      "الشركة",
      "البريد الإلكتروني للعمل",
      "الدولة",
      "المنتج المطلوب",
      "الكمية التقديرية",
      "احكِ لنا عن احتياجاتك"
    ],
    placeholders: [
      "اسمك",
      "اسم الشركة",
      "you@company.com",
      "دولتك",
      "اختر منتجًا",
      "مثلًا 20 طن",
      "التقطيع والمقاس والتعبئة والوجهة المطلوبة…"
    ]
  },
  fr: {
    title: "Grandissons ensemble.",
    intro: "Présentez-nous votre activité et vos besoins en produits.",
    eyebrow: "Échangeons",
    heading: [
      "Votre prochain partenariat",
      "commence ici."
    ],
    location: "Notre adresse",
    address: "L’adresse complète du bureau sera ajoutée.",
    email: "Écrivez à notre équipe",
    emailLabel: "Demandes générales et export",
    emailNote: "Les adresses e-mail officielles seront ajoutées.",
    phone: "Appelez-nous",
    phoneNote: "Le numéro de l’entreprise sera ajouté.",
    locationDescription: "Un ancrage méditerranéen. Une ouverture internationale.",
    formTitle: "Demande de produit",
    preview: "Prévisualiser la demande",
    labels: [
      "Nom complet",
      "Entreprise",
      "E-mail professionnel",
      "Pays",
      "Produit recherché",
      "Volume estimé",
      "Décrivez vos besoins"
    ],
    placeholders: [
      "Votre nom",
      "Nom de l’entreprise",
      "vous@entreprise.fr",
      "Votre pays",
      "Sélectionner un produit",
      "p. ex. 20 tonnes",
      "Découpe, calibre, conditionnement et destination souhaités…"
    ]
  },
  de: {
    title: "Lassen Sie uns gemeinsam wachsen.",
    intro: "Erzählen Sie uns von Ihrem Unternehmen und Ihrem Produktbedarf.",
    eyebrow: "Ins Gespräch kommen",
    heading: [
      "Ihre nächste Partnerschaft",
      "beginnt hier."
    ],
    location: "Unser Standort",
    address: "Die vollständige Büroadresse wird ergänzt.",
    email: "Schreiben Sie uns",
    emailLabel: "Allgemeine Anfragen und Exportanfragen",
    emailNote: "Die offiziellen E-Mail-Adressen werden ergänzt.",
    phone: "Rufen Sie uns an",
    phoneNote: "Die Telefonnummer des Unternehmens wird ergänzt.",
    locationDescription: "Am Mittelmeer zu Hause. International vernetzt.",
    formTitle: "Produktanfrage",
    preview: "Anfrage ansehen",
    labels: [
      "Vollständiger Name",
      "Unternehmen",
      "Geschäftliche E-Mail",
      "Land",
      "Gewünschtes Produkt",
      "Geschätzte Menge",
      "Was benötigen Sie?"
    ],
    placeholders: [
      "Ihr Name",
      "Firmenname",
      "sie@unternehmen.de",
      "Ihr Land",
      "Produkt auswählen",
      "z. B. 20 Tonnen",
      "Gewünschte Schnittform, Größe, Verpackung und Zielort…"
    ]
  },
  it: {
    title: "Cresciamo insieme.",
    intro: "Raccontaci della tua azienda e dei prodotti di cui hai bisogno.",
    eyebrow: "Iniziamo a parlare",
    heading: [
      "La tua prossima collaborazione",
      "inizia qui."
    ],
    location: "La nostra sede",
    address: "L’indirizzo completo sarà aggiunto.",
    email: "Scrivi al nostro team",
    emailLabel: "Richieste generali e per l’export",
    emailNote: "Gli indirizzi e-mail ufficiali saranno aggiunti.",
    phone: "Chiamaci",
    phoneNote: "Il numero dell’azienda sarà aggiunto.",
    locationDescription: "Una casa sul Mediterraneo. Uno sguardo internazionale.",
    formTitle: "Richiesta di prodotto",
    preview: "Anteprima della richiesta",
    labels: [
      "Nome completo",
      "Azienda",
      "E-mail di lavoro",
      "Paese",
      "Prodotto di interesse",
      "Volume stimato",
      "Raccontaci cosa ti serve"
    ],
    placeholders: [
      "Il tuo nome",
      "Nome dell’azienda",
      "tu@azienda.it",
      "Il tuo paese",
      "Seleziona un prodotto",
      "ad es. 20 tonnellate",
      "Taglio, calibro, confezionamento e destinazione desiderati…"
    ]
  },
  ru: {
    title: "Давайте расти вместе.",
    intro: "Расскажите о своём бизнесе и требованиях к продукции.",
    eyebrow: "Начнём разговор",
    heading: [
      "Ваше следующее партнёрство",
      "начинается здесь."
    ],
    location: "Наш адрес",
    address: "Полный адрес офиса будет добавлен.",
    email: "Напишите нам",
    emailLabel: "Общие вопросы и вопросы по экспорту",
    emailNote: "Официальные адреса электронной почты будут добавлены.",
    phone: "Позвоните нам",
    phoneNote: "Телефон компании будет добавлен.",
    locationDescription: "Наш дом у Средиземного моря. Наш рынок — весь мир.",
    formTitle: "Запрос о продукте",
    preview: "Предпросмотр запроса",
    labels: [
      "Имя и фамилия",
      "Компания",
      "Рабочая почта",
      "Страна",
      "Интересующий продукт",
      "Ориентировочный объём",
      "Что вам нужно?"
    ],
    placeholders: [
      "Ваше имя",
      "Название компании",
      "you@company.com",
      "Ваша страна",
      "Выбрать продукт",
      "например, 20 тонн",
      "Предпочтительные нарезка, размер, упаковка и пункт назначения…"
    ]
  },
  es: {
    title: "Crezcamos juntos.",
    intro: "Cuéntanos sobre tu empresa y tus necesidades de producto.",
    eyebrow: "Hablemos",
    heading: [
      "Tu próxima colaboración",
      "empieza aquí."
    ],
    location: "Dónde estamos",
    address: "Se añadirá la dirección completa de la oficina.",
    email: "Escríbenos",
    emailLabel: "Consultas generales y de exportación",
    emailNote: "Se añadirán las direcciones de correo oficiales.",
    phone: "Llámanos",
    phoneNote: "Se añadirá el teléfono de la empresa.",
    locationDescription: "Raíces mediterráneas y una mirada internacional.",
    formTitle: "Consulta de producto",
    preview: "Vista previa de la consulta",
    labels: [
      "Nombre completo",
      "Empresa",
      "Correo profesional",
      "País",
      "Producto de interés",
      "Volumen estimado",
      "Cuéntanos qué necesitas"
    ],
    placeholders: [
      "Tu nombre",
      "Nombre de la empresa",
      "tu@empresa.com",
      "Tu país",
      "Selecciona un producto",
      "por ejemplo, 20 toneladas",
      "Corte, calibre, envasado y destino deseados…"
    ]
  }
};
