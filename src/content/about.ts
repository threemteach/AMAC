import type { Locale } from "./locale";
import { contentText, getCms, lines } from "./cms-store";

type Card = [title: string, description: string];

export type AboutCopy = {
  title: string;
  intro: string;
  companyHeading: string;
  company: [string, string];
  valuesHeading: string;
  values: [Card, Card, Card, Card];
  processHeading: [string, string];
  steps: [Card, Card, Card, Card, Card];
  contactHeading: [string, string];
  contactDescription: string;
  partner: string;
};

export function getAboutCopy(locale: Locale) {
  const base = aboutCopy[locale];
  const cms = getCms();
  const copy = cms?.copy;
  return {
    ...base,
    title: contentText(copy?.aboutTitle, locale, base.title),
    intro: contentText(copy?.aboutIntro, locale, base.intro),
    companyHeading: contentText(copy?.companyHeading, locale, base.companyHeading),
    company: copy?.companyBody?.[locale]?.split(/\r?\n\s*\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean) ?? base.company,
    valuesHeading: contentText(copy?.valuesHeading, locale, base.valuesHeading),
    values: (cms?.blocks.aboutValues[locale] ?? base.values) as AboutCopy["values"],
    steps: cms?.blocks.aboutSteps[locale] ?? base.steps,
    processHeading: copy?.aboutProcessHeading?.[locale] ? lines(copy.aboutProcessHeading[locale]) : base.processHeading,
    contactHeading: copy?.aboutContactHeading?.[locale] ? lines(copy.aboutContactHeading[locale]) : base.contactHeading,
    contactDescription: contentText(copy?.aboutContactDescription, locale, base.contactDescription),
    partner: contentText(copy?.aboutPartner, locale, base.partner),
  };
}

export const aboutCopy: Record<Locale, AboutCopy> = {
  en: {
    title: "Rooted in Nature. Driven by Quality.",
    intro: "Delivering the finest frozen fruits and vegetables to global markets, combining nature’s goodness with manufacturing excellence.",
    companyHeading: "Who We Are",
    company: [
      "At AMAC GROUP, we specialize in the manufacturing and export of premium frozen fruits and vegetables, connecting the richness of nature with the demands of global markets.\nOur commitment to quality drives every stage of our operations, from the careful selection of raw materials to processing, freezing, packaging, and export.",
      "We strive to preserve the natural freshness, authentic taste, and nutritional value of our products while building long-term partnerships based on trust, consistency, and reliability.\nAt AMAC GROUP, we believe that quality is not simply a standard — it is the foundation of everything we do."
    ],
    valuesHeading: "Our Core Values",
    values: [
      [
        "Trust & Integrity",
        "Building lasting relationships through transparency and commitment."
      ],
      [
        "Uncompromising Quality",
        "Quality at every stage, from sourcing to delivery."
      ],
      [
        "Sustainability",
        "Promoting responsible practices for a better future."
      ],
      [
        "Global Excellence",
        "Meeting the evolving demands of international markets."
      ]
    ],
    processHeading: [
      "From Farm to",
      "Global Markets"
    ],
    steps: [
      [
        "Careful Sourcing",
        "Selecting high-quality fruits and vegetables."
      ],
      [
        "Advanced Processing",
        "Preparing products with a focus on quality and food safety."
      ],
      [
        "Precision Freezing",
        "Preserving natural freshness, flavor and nutritional value."
      ],
      [
        "Professional Packaging",
        "Protecting product quality throughout the supply chain."
      ],
      [
        "Global Export",
        "Connecting our products with international markets."
      ]
    ],
    contactHeading: [
      "Growing Together. Delivering",
      "Excellence Worldwide."
    ],
    contactDescription: "Partner with AMAC GROUP and discover a world of quality, reliability, and exceptional frozen food solutions.",
    partner: "Become Our Partner"
  },
  ar: {
    title: "جذور في الطبيعة. والتزام بالجودة.",
    intro: "نقدّم أجود الفواكه والخضروات المجمّدة للأسواق العالمية، ونجمع بين خيرات الطبيعة وجودة التصنيع.",
    companyHeading: "من نحن",
    company: [
      "في مجموعة أماك، نتخصص في تصنيع وتصدير الفواكه والخضروات المجمّدة عالية الجودة، ونربط خيرات الطبيعة باحتياجات الأسواق العالمية. يوجّه التزامنا بالجودة كل مرحلة من عملنا، من اختيار المواد الخام بعناية إلى التجهيز والتجميد والتعبئة والتصدير.",
      "نسعى للحفاظ على طزاجة منتجاتنا ونكهتها الطبيعية وقيمتها الغذائية، وبناء شراكات طويلة الأمد تقوم على الثقة والاتساق والاعتمادية. الجودة في مجموعة أماك هي أساس كل ما نعمله."
    ],
    valuesHeading: "قيمنا الأساسية",
    values: [
      [
        "الثقة والنزاهة",
        "نبني علاقات تدوم من خلال الشفافية والالتزام."
      ],
      [
        "جودة بلا تنازل",
        "نلتزم بالجودة في كل مرحلة، من اختيار المحصول إلى التسليم."
      ],
      [
        "الاستدامة",
        "نشجّع الممارسات المسؤولة لبناء مستقبل أفضل."
      ],
      [
        "تميّز عالمي",
        "نواكب الاحتياجات المتغيّرة للأسواق العالمية."
      ]
    ],
    processHeading: [
      "من المزرعة",
      "إلى الأسواق العالمية"
    ],
    steps: [
      [
        "اختيار بعناية",
        "نختار فواكه وخضروات عالية الجودة."
      ],
      [
        "تجهيز متقدّم",
        "نجهّز المنتجات مع التركيز على الجودة وسلامة الغذاء."
      ],
      [
        "تجميد دقيق",
        "نحافظ على الطزاجة والنكهة والقيمة الغذائية."
      ],
      [
        "تعبئة احترافية",
        "نحمي جودة المنتجات على امتداد سلسلة التوريد."
      ],
      [
        "تصدير عالمي",
        "نوصل منتجاتنا إلى الأسواق العالمية."
      ]
    ],
    contactHeading: [
      "ننمو معًا.",
      "ونوصل الجودة إلى العالم."
    ],
    contactDescription: "تعاون مع مجموعة أماك واكتشف منتجات مجمّدة عالية الجودة يمكنك الاعتماد عليها.",
    partner: "كن شريكنا"
  },
  fr: {
    title: "Ancrés dans la nature. Guidés par la qualité.",
    intro: "Nous fournissons les meilleurs fruits et légumes surgelés aux marchés mondiaux, en alliant les bienfaits de la nature à la qualité de fabrication.",
    companyHeading: "Qui sommes-nous ?",
    company: [
      "AMAC Group fabrique et exporte des fruits et légumes surgelés de qualité, en adaptant le meilleur des récoltes aux besoins des marchés mondiaux. Notre engagement pour la qualité guide chaque étape, de la sélection des matières premières à la préparation, à la surgélation, au conditionnement et à l’exportation.",
      "Nous préservons la fraîcheur, le goût et la valeur nutritionnelle de nos produits tout en construisant des partenariats durables fondés sur la confiance, la régularité et la fiabilité. La qualité guide toutes nos activités."
    ],
    valuesHeading: "Nos valeurs",
    values: [
      [
        "Confiance et intégrité",
        "Des relations durables fondées sur la transparence et l’engagement."
      ],
      [
        "Qualité sans compromis",
        "La qualité à chaque étape, de l’approvisionnement à la livraison."
      ],
      [
        "Durabilité",
        "Des pratiques responsables pour un avenir meilleur."
      ],
      [
        "Excellence mondiale",
        "Répondre aux besoins changeants des marchés internationaux."
      ]
    ],
    processHeading: [
      "De la ferme",
      "aux marchés mondiaux"
    ],
    steps: [
      [
        "Sélection rigoureuse",
        "Sélectionner des fruits et légumes de qualité."
      ],
      [
        "Préparation avancée",
        "Préparer les produits en privilégiant la qualité et la sécurité alimentaire."
      ],
      [
        "Surgélation de précision",
        "Préserver la fraîcheur, le goût et la valeur nutritionnelle."
      ],
      [
        "Conditionnement professionnel",
        "Protéger la qualité des produits tout au long de la chaîne logistique."
      ],
      [
        "Exportation mondiale",
        "Relier nos produits aux marchés internationaux."
      ]
    ],
    contactHeading: [
      "Grandir ensemble.",
      "Livrer l’excellence partout dans le monde."
    ],
    contactDescription: "Travaillez avec AMAC Group et découvrez des produits surgelés fiables et de qualité.",
    partner: "Devenez notre partenaire"
  },
  de: {
    title: "In der Natur verwurzelt. Der Qualität verpflichtet.",
    intro: "Wir liefern hochwertiges tiefgekühltes Obst und Gemüse auf den Weltmarkt und verbinden natürliche Zutaten mit sorgfältiger Verarbeitung.",
    companyHeading: "Wer wir sind",
    company: [
      "AMAC Group produziert und exportiert hochwertiges tiefgekühltes Obst und Gemüse für internationale Märkte. Unser Qualitätsanspruch prägt jeden Schritt, von der Auswahl der Rohwaren über Verarbeitung, Tiefkühlung und Verpackung bis zum Export.",
      "Wir bewahren die natürliche Frische, den Geschmack und den Nährwert unserer Produkte und bauen langfristige Partnerschaften auf Vertrauen, Beständigkeit und Zuverlässigkeit. Qualität ist die Grundlage unserer Arbeit."
    ],
    valuesHeading: "Unsere Werte",
    values: [
      [
        "Vertrauen und Integrität",
        "Dauerhafte Beziehungen durch Transparenz und Verbindlichkeit."
      ],
      [
        "Kompromisslose Qualität",
        "Qualität in jeder Phase, von der Beschaffung bis zur Lieferung."
      ],
      [
        "Nachhaltigkeit",
        "Verantwortungsvolles Handeln für eine bessere Zukunft."
      ],
      [
        "Weltweite Exzellenz",
        "Wir reagieren auf die sich wandelnden Anforderungen internationaler Märkte."
      ]
    ],
    processHeading: [
      "Vom Feld",
      "auf die Weltmärkte"
    ],
    steps: [
      [
        "Sorgfältige Auswahl",
        "Hochwertiges Obst und Gemüse auswählen."
      ],
      [
        "Moderne Verarbeitung",
        "Produkte mit Blick auf Qualität und Lebensmittelsicherheit verarbeiten."
      ],
      [
        "Präzise Tiefkühlung",
        "Natürliche Frische, Geschmack und Nährwert erhalten."
      ],
      [
        "Professionelle Verpackung",
        "Die Produktqualität entlang der Lieferkette schützen."
      ],
      [
        "Weltweiter Export",
        "Unsere Produkte auf internationale Märkte bringen."
      ]
    ],
    contactHeading: [
      "Gemeinsam wachsen.",
      "Weltweit Qualität liefern."
    ],
    contactDescription: "Arbeiten Sie mit AMAC Group zusammen und entdecken Sie zuverlässige Tiefkühlprodukte von hoher Qualität.",
    partner: "Werden Sie unser Partner"
  },
  it: {
    title: "Radicati nella natura. Guidati dalla qualità.",
    intro: "Portiamo sui mercati mondiali frutta e verdura surgelate di qualità, unendo la bontà della natura alla cura della lavorazione.",
    companyHeading: "Chi siamo",
    company: [
      "AMAC Group produce ed esporta frutta e verdura surgelate di qualità per i mercati internazionali. Il nostro impegno per la qualità guida ogni fase, dalla selezione delle materie prime alla lavorazione, alla surgelazione, al confezionamento e all’esportazione.",
      "Preserviamo freschezza, sapore e valore nutrizionale dei nostri prodotti e costruiamo collaborazioni durature basate su fiducia, costanza e affidabilità. La qualità è alla base del nostro lavoro."
    ],
    valuesHeading: "I nostri valori",
    values: [
      [
        "Fiducia e integrità",
        "Costruiamo relazioni durature con trasparenza e impegno."
      ],
      [
        "Qualità senza compromessi",
        "Qualità in ogni fase, dall’approvvigionamento alla consegna."
      ],
      [
        "Sostenibilità",
        "Promuoviamo pratiche responsabili per un futuro migliore."
      ],
      [
        "Eccellenza globale",
        "Rispondiamo alle esigenze dei mercati internazionali in evoluzione."
      ]
    ],
    processHeading: [
      "Dai campi",
      "ai mercati mondiali"
    ],
    steps: [
      [
        "Selezione accurata",
        "Selezionare frutta e verdura di alta qualità."
      ],
      [
        "Lavorazione avanzata",
        "Preparare i prodotti con attenzione alla qualità e alla sicurezza alimentare."
      ],
      [
        "Surgelazione di precisione",
        "Preservare freschezza, sapore e valore nutrizionale."
      ],
      [
        "Confezionamento professionale",
        "Proteggere la qualità lungo tutta la filiera."
      ],
      [
        "Esportazione globale",
        "Portare i nostri prodotti sui mercati internazionali."
      ]
    ],
    contactHeading: [
      "Crescere insieme.",
      "Portare l’eccellenza nel mondo."
    ],
    contactDescription: "Collabora con AMAC Group e scopri prodotti surgelati di qualità su cui puoi contare.",
    partner: "Diventa nostro partner"
  },
  ru: {
    title: "Природная основа. Стремление к качеству.",
    intro: "Мы поставляем замороженные фрукты и овощи на мировые рынки, сочетая природные свойства сырья с качественной обработкой.",
    companyHeading: "О компании",
    company: [
      "AMAC Group производит и экспортирует качественные замороженные фрукты и овощи для мировых рынков. Мы уделяем внимание качеству на каждом этапе, от отбора сырья до обработки, заморозки, упаковки и экспорта.",
      "Мы сохраняем свежесть, естественный вкус и пищевую ценность продукции и выстраиваем долгосрочные партнёрства на основе доверия, стабильности и надёжности. Качество лежит в основе нашей работы."
    ],
    valuesHeading: "Наши ценности",
    values: [
      [
        "Доверие и честность",
        "Долгосрочные отношения на основе открытости и ответственности."
      ],
      [
        "Качество без компромиссов",
        "Качество на каждом этапе, от выбора сырья до поставки."
      ],
      [
        "Устойчивое развитие",
        "Ответственный подход ради лучшего будущего."
      ],
      [
        "Международный уровень",
        "Мы отвечаем на меняющиеся потребности мировых рынков."
      ]
    ],
    processHeading: [
      "От фермы",
      "до мировых рынков"
    ],
    steps: [
      [
        "Тщательный отбор",
        "Отбираем качественные фрукты и овощи."
      ],
      [
        "Современная обработка",
        "Уделяем внимание качеству и безопасности продуктов."
      ],
      [
        "Точная заморозка",
        "Сохраняем свежесть, вкус и пищевую ценность."
      ],
      [
        "Профессиональная упаковка",
        "Защищаем качество продукции по всей цепочке поставок."
      ],
      [
        "Мировой экспорт",
        "Поставляем продукцию на международные рынки."
      ]
    ],
    contactHeading: [
      "Растём вместе.",
      "Поставляем качественную продукцию по всему миру."
    ],
    contactDescription: "Станьте партнёром AMAC Group и откройте для себя качественные замороженные продукты.",
    partner: "Станьте нашим партнёром"
  },
  es: {
    title: "Con raíces en la naturaleza y compromiso con la calidad.",
    intro: "Llevamos la mejor fruta y verdura congeladas a los mercados mundiales, con materias primas de calidad y un procesamiento cuidadoso.",
    companyHeading: "Quiénes somos",
    company: [
      "En AMAC Group fabricamos y exportamos frutas y verduras congeladas de calidad para los mercados internacionales. Nuestro compromiso con la calidad guía todas las etapas, desde la selección de materias primas hasta el procesamiento, la congelación, el envasado y la exportación.",
      "Conservamos la frescura, el sabor y el valor nutricional de nuestros productos mientras construimos relaciones duraderas basadas en la confianza, la constancia y la fiabilidad. La calidad es la base de nuestro trabajo."
    ],
    valuesHeading: "Nuestros valores",
    values: [
      [
        "Confianza e integridad",
        "Construimos relaciones duraderas con transparencia y compromiso."
      ],
      [
        "Calidad sin concesiones",
        "Calidad en cada etapa, desde el origen hasta la entrega."
      ],
      [
        "Sostenibilidad",
        "Promovemos prácticas responsables para un futuro mejor."
      ],
      [
        "Excelencia global",
        "Respondemos a las necesidades cambiantes de los mercados internacionales."
      ]
    ],
    processHeading: [
      "Del campo",
      "a los mercados mundiales"
    ],
    steps: [
      [
        "Selección cuidadosa",
        "Seleccionar frutas y verduras de alta calidad."
      ],
      [
        "Procesamiento avanzado",
        "Preparar los productos con atención a la calidad y a la seguridad alimentaria."
      ],
      [
        "Congelación de precisión",
        "Conservar la frescura, el sabor y el valor nutricional."
      ],
      [
        "Envasado profesional",
        "Proteger la calidad en toda la cadena de suministro."
      ],
      [
        "Exportación global",
        "Llevar nuestros productos a los mercados internacionales."
      ]
    ],
    contactHeading: [
      "Crecer juntos.",
      "Llevar la excelencia al mundo."
    ],
    contactDescription: "Colabora con AMAC Group y descubre productos congelados de calidad en los que puedes confiar.",
    partner: "Colabora con nosotros"
  }
};
