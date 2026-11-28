import { journalIds } from "./journal-routes";
import { languageNames, type Locale } from "./locale";
import { contentText } from "./localized-text";
import { getCms } from "../server/cms/store";

type ArticleCopy = { title: string; sections: [string, string][] };

export type JournalCopy = {
  title: string; intro: string; heading: string;
  all: string; company: string; season: string; sort: string; featured: string;
  tag: string; summary: string; read: string; more: string; back: string;
  articles: [ArticleCopy, ArticleCopy, ArticleCopy];
};

const journalCopy: Record<Locale, JournalCopy> = {
  en: {
    title: "Ideas, insights & ingredients.",
    intro: "A closer look at frozen produce and the conversations behind a supply partnership.",
    heading: "From our journal.",
    all: "View all",
    company: "Company articles",
    season: "Season",
    sort: "Sort articles",
    featured: "Featured",
    tag: "Product notes / Demo editorial",
    summary: "A closer look at products and supply.",
    read: "Read the article",
    more: "Load more articles",
    back: "Back to the journal",
    articles: [
      {
        title: "From Farm to Freezer: The Journey of Frozen Produce",
        sections: [
          [
            "It starts in the field",
            "The journey starts with selecting, sorting and preparing the harvest. The intended use helps determine which pieces, cuts and formats are a good fit."
          ],
          [
            "Plan the next step",
            "Ask about freezing, packaging and cold-chain handling early. Share your preferred format, volume and destination so the supplier can confirm what’s available."
          ]
        ]
      },
      {
        title: "What Is IQF Freezing, and Why Does It Matter?",
        sections: [
          [
            "A format for every conversation",
            "Whole, halved and diced formats can suit different applications. When starting an enquiry, describe your intended use and the shape you have in mind."
          ],
          [
            "Compare the details",
            "Ask about the available size range, packaging and documentation. A clear specification helps both teams understand the requirement."
          ]
        ]
      },
      {
        title: "What to Look for in a Frozen Produce Export Partner",
        sections: [
          [
            "Start with the product specification",
            "Share the crop, cut, size, packaging and destination you need. Ask what can be confirmed for the shipment and which documents apply to your order."
          ],
          [
            "Agree on the shipping details",
            "Discuss timing, cold-chain responsibilities and the information both teams need before shipment. A clear point of contact makes it easier to resolve questions."
          ]
        ]
      }
    ]
  },
  ar: {
    title: "أفكار ورؤى ومكوّنات.",
    intro: "نظرة أقرب على المنتجات المجمّدة وعلى التفاصيل اللي بتبدأ منها شراكة التوريد.",
    heading: "من مجلتنا.",
    all: "عرض الكل",
    company: "مقالات الشركة",
    season: "الموسم",
    sort: "ترتيب المقالات",
    featured: "مختارات",
    tag: "ملاحظات عن المنتجات / محتوى تجريبي",
    summary: "نظرة أقرب على المنتجات والتوريد.",
    read: "اقرأ المقال",
    more: "عرض المزيد من المقالات",
    back: "العودة إلى المجلة",
    articles: [
      {
        title: "من الحقل إلى المجمّد: رحلة المنتجات المجمّدة",
        sections: [
          [
            "البداية من الحقل",
            "تبدأ الرحلة باختيار المحصول وفرزه وتجهيزه. والاستخدام المطلوب بيساعد في تحديد القطع والأشكال المناسبة."
          ],
          [
            "خطّط للخطوة الجاية",
            "اسأل بدري عن التجميد والتعبئة وسلسلة التبريد. شارك الشكل والكمية والوجهة المطلوبة عشان المورّد يأكد المتاح."
          ]
        ]
      },
      {
        title: "يعني إيه التجميد السريع الفردي IQF وليه هو مهم؟",
        sections: [
          [
            "شكل لكل استخدام",
            "الأشكال الكاملة والأنصاف والمكعبات بتناسب استخدامات مختلفة. لما تبدأ الاستفسار، وضّح الاستخدام والشكل اللي في بالك."
          ],
          [
            "قارن التفاصيل",
            "اسأل عن المقاسات المتاحة والتعبئة والمستندات. المواصفات الواضحة بتساعد الفريقين يفهموا المطلوب."
          ]
        ]
      },
      {
        title: "إيه اللي تدور عليه في شريك لتصدير المنتجات المجمّدة؟",
        sections: [
          [
            "ابدأ بمواصفات المنتج",
            "حدّد المحصول والتقطيع والمقاس والتعبئة والوجهة. اسأل إيه اللي ممكن يتأكد للشحنة والمستندات المطلوبة لطلبك."
          ],
          [
            "اتفقوا على تفاصيل الشحن",
            "ناقشوا المواعيد ومسؤوليات سلسلة التبريد والمعلومات المطلوبة قبل الشحن. وجود جهة اتصال واضحة بيسهّل حل الاستفسارات."
          ]
        ]
      }
    ]
  },
  fr: {
    title: "Idées, perspectives et ingrédients.",
    intro: "Un regard sur les produits surgelés et les échanges qui font naître un partenariat.",
    heading: "Notre journal.",
    all: "Tout voir",
    company: "Articles de l’entreprise",
    season: "Saison",
    sort: "Trier les articles",
    featured: "À la une",
    tag: "Notes produits / Éditorial de démonstration",
    summary: "Un regard sur les produits et l’approvisionnement.",
    read: "Lire l’article",
    more: "Charger plus d’articles",
    back: "Retour au journal",
    articles: [
      {
        title: "Du champ au congélateur : le parcours des produits surgelés",
        sections: [
          [
            "Tout commence au champ",
            "La récolte est sélectionnée, triée et préparée. L’usage prévu aide à choisir la découpe et le format."
          ],
          [
            "Préparer la suite",
            "Abordez tôt la surgélation, le conditionnement et la chaîne du froid. Indiquez le format, le volume et la destination."
          ]
        ]
      },
      {
        title: "Qu’est-ce que la surgélation IQF et pourquoi est-elle importante ?",
        sections: [
          [
            "Un format pour chaque besoin",
            "Les produits entiers, en moitiés ou en dés conviennent à différents usages. Précisez l’utilisation et la forme souhaitées dès votre demande."
          ],
          [
            "Comparer les détails",
            "Demandez les calibres, les conditionnements et les documents disponibles. Des spécifications claires facilitent les échanges."
          ]
        ]
      },
      {
        title: "Comment choisir un partenaire d’exportation de produits surgelés ?",
        sections: [
          [
            "Partir des spécifications",
            "Indiquez le produit, la découpe, le calibre, le conditionnement et la destination. Demandez ce qui peut être confirmé pour votre commande."
          ],
          [
            "Convenir des modalités d’expédition",
            "Discutez des délais, des responsabilités liées à la chaîne du froid et des informations à confirmer avant l’envoi."
          ]
        ]
      }
    ]
  },
  de: {
    title: "Ideen, Einblicke und Zutaten.",
    intro: "Ein Blick auf Tiefkühlprodukte und die Gespräche hinter einer Lieferpartnerschaft.",
    heading: "Aus unserem Magazin.",
    all: "Alles anzeigen",
    company: "Unternehmensartikel",
    season: "Saison",
    sort: "Artikel sortieren",
    featured: "Empfohlen",
    tag: "Produktnotizen / Beispielredaktion",
    summary: "Ein genauerer Blick auf Produkte und Beschaffung.",
    read: "Artikel lesen",
    more: "Weitere Artikel laden",
    back: "Zurück zum Magazin",
    articles: [
      {
        title: "Vom Feld in die Tiefkühlung: Der Weg von Tiefkühlprodukten",
        sections: [
          [
            "Es beginnt auf dem Feld",
            "Die Ernte wird ausgewählt, sortiert und vorbereitet. Der Verwendungszweck hilft bei der Wahl der Schnittform."
          ],
          [
            "Den nächsten Schritt planen",
            "Klären Sie frühzeitig Tiefkühlung, Verpackung und Kühlkette. Geben Sie Format, Menge und Ziel an."
          ]
        ]
      },
      {
        title: "Was ist IQF-Tiefkühlung und warum ist sie wichtig?",
        sections: [
          [
            "Ein Format für jeden Bedarf",
            "Ganze, halbierte und gewürfelte Produkte eignen sich für unterschiedliche Anwendungen. Nennen Sie den Einsatzzweck und die gewünschte Form."
          ],
          [
            "Details vergleichen",
            "Fragen Sie nach Größen, Verpackung und Unterlagen. Klare Spezifikationen helfen beiden Seiten."
          ]
        ]
      },
      {
        title: "Worauf Sie bei einem Exportpartner für Tiefkühlprodukte achten sollten",
        sections: [
          [
            "Mit der Produktspezifikation beginnen",
            "Nennen Sie Produkt, Schnitt, Größe, Verpackung und Ziel. Fragen Sie, was für die Lieferung bestätigt werden kann."
          ],
          [
            "Versanddetails abstimmen",
            "Besprechen Sie Termine, Zuständigkeiten in der Kühlkette und offene Fragen vor dem Versand."
          ]
        ]
      }
    ]
  },
  it: {
    title: "Idee, approfondimenti e ingredienti.",
    intro: "Uno sguardo ai prodotti surgelati e ai dialoghi da cui nasce una collaborazione.",
    heading: "Dal nostro giornale.",
    all: "Mostra tutto",
    company: "Articoli aziendali",
    season: "Stagione",
    sort: "Ordina gli articoli",
    featured: "In evidenza",
    tag: "Note sui prodotti / Articolo dimostrativo",
    summary: "Uno sguardo ai prodotti e all’approvvigionamento.",
    read: "Leggi l’articolo",
    more: "Carica altri articoli",
    back: "Torna al giornale",
    articles: [
      {
        title: "Dal campo al freezer: il viaggio dei prodotti surgelati",
        sections: [
          [
            "Si comincia nel campo",
            "Il raccolto viene selezionato, suddiviso e preparato. L’uso previsto aiuta a scegliere il taglio e il formato."
          ],
          [
            "Pianifica la fase successiva",
            "Parla in anticipo di surgelazione, confezionamento e catena del freddo. Specifica formato, quantità e destinazione."
          ]
        ]
      },
      {
        title: "Che cos’è la surgelazione IQF e perché è importante?",
        sections: [
          [
            "Un formato per ogni esigenza",
            "I formati interi, a metà e a cubetti sono adatti a usi diversi. Nella richiesta indica l’uso previsto e il formato desiderato."
          ],
          [
            "Confronta i dettagli",
            "Chiedi quali calibri, confezioni e documenti sono disponibili. Specifiche chiare aiutano entrambe le parti."
          ]
        ]
      },
      {
        title: "Come scegliere un partner per l’export di prodotti surgelati",
        sections: [
          [
            "Parti dalle specifiche",
            "Indica prodotto, taglio, calibro, confezionamento e destinazione. Chiedi quali aspetti si possono confermare per l’ordine."
          ],
          [
            "Concorda i dettagli della spedizione",
            "Discuti tempi, responsabilità per la catena del freddo e informazioni richieste prima della spedizione."
          ]
        ]
      }
    ]
  },
  ru: {
    title: "Идеи, опыт и ингредиенты.",
    intro: "Ближе к замороженным продуктам и к диалогу, с которого начинается сотрудничество.",
    heading: "Из нашего журнала.",
    all: "Все статьи",
    company: "Статьи компании",
    season: "Сезон",
    sort: "Сортировать статьи",
    featured: "Рекомендуемые",
    tag: "Заметки о продукции / Пример статьи",
    summary: "Подробнее о продукции и поставках.",
    read: "Читать статью",
    more: "Загрузить ещё статьи",
    back: "Вернуться в журнал",
    articles: [
      {
        title: "От поля до морозильной камеры: путь замороженных продуктов",
        sections: [
          [
            "Всё начинается в поле",
            "Урожай отбирают, сортируют и подготавливают. Назначение продукта помогает выбрать подходящий формат."
          ],
          [
            "Спланируйте следующий этап",
            "Заранее обсудите заморозку, упаковку и холодовую цепь. Укажите нужный формат, объём и пункт назначения."
          ]
        ]
      },
      {
        title: "Что такое заморозка IQF и почему она важна?",
        sections: [
          [
            "Формат для каждой задачи",
            "Целые плоды, половинки и кубики подходят для разных задач. В запросе опишите назначение продукта и нужную форму."
          ],
          [
            "Сравните детали",
            "Уточните доступные размеры, упаковку и документацию. Понятная спецификация помогает обеим сторонам."
          ]
        ]
      },
      {
        title: "Как выбрать экспортного партнёра для замороженной продукции",
        sections: [
          [
            "Начните со спецификации",
            "Укажите продукт, нарезку, размер, упаковку и пункт назначения. Уточните, какие условия поставки можно подтвердить."
          ],
          [
            "Согласуйте условия перевозки",
            "Обсудите сроки, ответственность за холодовую цепь и сведения, которые нужно подтвердить до отправки."
          ]
        ]
      }
    ]
  },
  es: {
    title: "Ideas, perspectivas e ingredientes.",
    intro: "Una mirada a los productos congelados y al diálogo que da inicio a una colaboración.",
    heading: "De nuestra revista.",
    all: "Ver todo",
    company: "Artículos de la empresa",
    season: "Temporada",
    sort: "Ordenar artículos",
    featured: "Destacados",
    tag: "Notas de producto / Editorial de muestra",
    summary: "Una mirada a los productos y al suministro.",
    read: "Leer el artículo",
    more: "Cargar más artículos",
    back: "Volver a la revista",
    articles: [
      {
        title: "Del campo al congelador: el recorrido de los productos congelados",
        sections: [
          [
            "Todo empieza en el campo",
            "La cosecha se selecciona, clasifica y prepara. El uso previsto ayuda a decidir qué cortes y formatos encajan mejor."
          ],
          [
            "Planifica la siguiente etapa",
            "Habla con antelación de la congelación, el envasado y la cadena de frío. Indica el formato, el volumen y el destino."
          ]
        ]
      },
      {
        title: "¿Qué es la congelación IQF y por qué importa?",
        sections: [
          [
            "Un formato para cada necesidad",
            "Los formatos enteros, en mitades y en dados sirven para diferentes usos. Al hacer una consulta, indica el uso previsto y la forma que buscas."
          ],
          [
            "Compara los detalles",
            "Pregunta por los tamaños, el envasado y la documentación disponibles. Una especificación clara facilita el diálogo."
          ]
        ]
      },
      {
        title: "Qué buscar en un socio exportador de productos congelados",
        sections: [
          [
            "Empieza por las especificaciones",
            "Indica el producto, el corte, el tamaño, el envasado y el destino. Pregunta qué se puede confirmar para el pedido."
          ],
          [
            "Acordad los detalles del envío",
            "Comentad los plazos, las responsabilidades sobre la cadena de frío y la información que hace falta antes del envío."
          ]
        ]
      }
    ]
  }
};

const categories = ["season", "product", "company"] as const;
const covers = ["farm-to-freezer.webp", "iqf-cover.webp", "export-partner.webp"] as const;

export function getBaseJournal(locale: Locale) {
  const { articles, ...copy } = journalCopy[locale];
  return {
    copy,
    articles: articles.map((article, i) => ({
      ...article,
      id: journalIds[i],
      category: categories[i],
      image: "/images/journal/" + covers[i],
    })),
  };
}

export function getJournal(locale: Locale) {
  const base = getBaseJournal(locale);
  const cms = getCms();
  if (!cms) return {
    ...base, articles: base.articles.map((article) => ({
      ...article, summary: "", imageAlt: "", seoTitle: "", seoDescription: "",
      locales: Object.keys(languageNames) as Locale[],
    })),
  };
  const articles = cms.articles.filter((article) => article.published).flatMap((article) => {
    const locales = (Object.keys(languageNames) as Locale[]).filter((lang) => {
      const sections = article.body[lang];
      return article.title[lang] && sections?.length && sections.every(([title, paragraph]) => title && paragraph);
    });
    const title = article.title[locale];
    const sections = article.body[locale];
    if (!title || !sections || !locales.includes(locale)) return [];
    return [{
      id: article.slug, category: article.category, image: article.image, title, sections,
      summary: article.summary[locale] ?? "", imageAlt: article.imageAlt[locale] ?? "",
      seoTitle: article.seoTitle[locale] ?? "", seoDescription: article.seoDescription[locale] ?? "",
      locales,
    }];
  });
  return {
    copy: {
      ...base.copy, title: contentText(cms.copy.journalTitle, locale, base.copy.title),
      intro: contentText(cms.copy.journalIntro, locale, base.copy.intro),
    },
    articles,
  };
}
