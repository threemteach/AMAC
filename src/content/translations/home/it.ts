import type { LoadingCopy, HomeMetadataCopy } from "./index";
import type { InternationalHomeCopy } from "../../international-home";

export const it: InternationalHomeCopy = {
  header: {
    announcement: "Radici egiziane. Connessioni in tutto il mondo.",
    navigation: [
      "Home",
      "Prodotti",
      "Chi siamo",
      "Notizie",
      "Contatti"
    ],
    quoteLabel: "Richiedi un preventivo"
  },
  hero: {
    eyebrow: "Radici egiziane. Presenza globale.",
    heading: [
      "Il meglio della natura.",
      "Surgelato per il mondo."
    ],
    description: [
      "Scopri la frutta e la verdura surgelate di AMAC Group.",
      "Da Alessandria d’Egitto portiamo i raccolti egiziani sui mercati internazionali."
    ],
    primaryAction: "Scopri i prodotti",
    secondaryAction: "La nostra storia",
    ribbons: [
      "Prodotti agricoli egiziani",
      "Frutta e verdura surgelate",
      "Collaborazioni internazionali"
    ]
  },
  fieldsIntro: {
    eyebrow: "Una selezione da condividere",
    heading: [
      "Dai nostri campi",
      "al tuo mercato"
    ],
    description: [
      "Il buon cibo nasce da materie prime di qualità.",
      "Scopri la nostra selezione di frutta e verdura egiziane e le possibilità che offre."
    ],
    actionLabel: "Scopri la gamma"
  },
  ingredientCollections: {
    eyebrow: "Una selezione naturalmente varia",
    heading: "Trova il tuo prossimo ingrediente.",
    titles: [
      "Frutta",
      "Verdura"
    ],
    label: "Linea surgelata",
    actionLabel: "Scopri la gamma"
  },
  featuredHarvest: {
    heading: [
      "Un po’ più vicini",
      "al raccolto."
    ],
    productAction: "Scopri i prodotti",
    catalogAction: "Vedi tutti i prodotti",
    products: [
      {
        name: "Fragole",
        category: "Frutta surgelata",
        description: "Fragole saporite, preparate per l’uso durante tutto l’anno."
      },
      {
        name: "Broccoli",
        category: "Verdura surgelata",
        description: "Cimette di broccoli surgelate, pronte all’uso tutto l’anno."
      },
      {
        name: "Mango",
        category: "Frutta surgelata",
        description: "Dolci pezzi di mango dorato, disponibili tutto l’anno."
      },
      {
        name: "Fagiolini",
        category: "Verdura surgelata",
        description: "Fagiolini tagliati, preparati per l’uso durante tutto l’anno."
      }
    ]
  },
  qualityConfidence: {
    eyebrow: "Qualità e fiducia",
    heading: [
      "La fiducia inizia",
      "dalla chiarezza."
    ],
    description: "La documentazione su sicurezza alimentare e qualità è importante per chi importa. Chiedi al nostro team quali certificati si applicano al tuo ordine.",
    standardsNote: "Standard comuni del settore · A titolo informativo",
    actionLabel: "Richiedi la documentazione"
  },
  story: {
    eyebrow: "La nostra storia",
    heading: [
      "Le buone collaborazioni",
      "iniziano all’origine."
    ],
    imageAlt: "Tramonto su un campo coltivato",
    points: [
      "Da Alessandria d’Egitto, AMAC Group fornisce frutta e verdura surgelate egiziane a clienti di tutto il mondo. Ogni collaborazione inizia con un confronto per capire le tue esigenze.",
      "AMAC Group ha sede ad Alessandria d’Egitto e opera nell’esportazione di frutta e verdura surgelate.",
      "Una gamma chiara e un contatto diretto."
    ],
    actionLabel: "Scopri la nostra storia"
  },
  journey: {
    eyebrow: "Dal campo alla destinazione",
    heading: [
      "Un percorso studiato,",
      "fin dall’inizio."
    ],
    description: "Ogni ordine inizia con un confronto sulle tue esigenze. Ecco le fasi che avvicinano il raccolto al tuo mercato.",
    steps: [
      {
        stage: "Selezione",
        title: "Direttamente dal raccolto",
        description: "Selezioniamo i raccolti tenendo conto dei requisiti di ogni prodotto."
      },
      {
        stage: "Preparazione",
        title: "Preparati con cura",
        description: "Prepariamo e lavoriamo i prodotti con cura per preservarne la qualità."
      },
      {
        stage: "Surgelazione",
        title: "Pronti per il trasporto",
        description: "I prodotti surgelati vengono preparati per lo stoccaggio e il trasporto."
      },
      {
        stage: "Consegna",
        title: "Pensati per il tuo mercato",
        description: "Concordiamo con te le specifiche, il confezionamento e i requisiti di consegna."
      }
    ]
  },
  factoryProcess: {
    eyebrow: "Dal nostro stabilimento alla tua destinazione",
    heading: [
      "Come prepariamo",
      "i nostri prodotti."
    ],
    description: "Ogni ordine inizia con un confronto sulle tue esigenze. Ecco le fasi che avvicinano il raccolto al tuo mercato."
  },
  shippingRoutes: {
    eyebrow: "Vicini al tuo mercato",
    heading: [
      "Il trasporto giusto",
      "per la tua destinazione."
    ],
    description: "Valutiamo con te i mezzi di trasporto, i tempi e i requisiti adatti al tuo ordine.",
    note: "La disponibilità e la gestione della catena del freddo dipendono dal prodotto, dalla tratta e dall’ordine.",
    actionLabel: "Parliamo della spedizione",
    methods: [
      {
        title: "Via terra",
        description: "Il trasporto su strada collega le varie fasi del viaggio e serve le tratte regionali adatte."
      },
      {
        title: "Via aerea",
        description: "Il trasporto aereo è un’opzione quando tempi, prodotto e destinazione lo richiedono."
      },
      {
        title: "Via mare",
        description: "Il trasporto marittimo è un’opzione per le spedizioni internazionali e gli ordini più grandi."
      }
    ]
  },
  contactBanner: {
    eyebrow: "Parliamone",
    heading: [
      "Il trasporto giusto",
      "per la tua destinazione."
    ],
    description: "Valutiamo con te i mezzi di trasporto, i tempi e i requisiti adatti al tuo ordine.",
    actionLabel: "Contatta il nostro team"
  }
};


export const loading: LoadingCopy = {
  title: "Caricamento del sito AMAC Group", loading: "Caricamento in corso…",
  slow: "La foto dei campi richiede un po’ più di tempo.",
  offline: "Sei offline. Puoi comunque continuare a esplorare la pagina.",
  failed: "Non è stato possibile caricare la foto dei campi.", continue: "Continua al sito", retry: "Riprova",
};

export const metadata: HomeMetadataCopy = ["AMAC Group | Frutta e verdura surgelate", "Frutta e verdura surgelate egiziane per l’esportazione, da AMAC Group ad Alessandria d’Egitto."];
