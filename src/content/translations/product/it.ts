import type { StrawberryCopy, EnquiryCopy, ProductFormats } from "./index";
export const strawberry: StrawberryCopy = {
  category: "Frutta surgelata",
  description: "Colore vivace, dolcezza delicata e diversi formati di taglio per il tuo prossimo prodotto.",
  cutLabel: "Scegli il taglio", sizeLabel: "Seleziona il calibro", cuts: ["Intere", "A metà", "A cubetti"], unit: "mm",
  gallery: "Foto delle fragole", referencePhoto: "Foto illustrativa",
  enquire: "Chiedi informazioni sul prodotto", save: "Salva il prodotto", saved: "Prodotto salvato",
  detailsLabel: "I dettagli", detailsHeading: "Chiarezza in ogni specifica.",
  specs: ["Gamma", "Origine", "Taglio e calibro", "Confezionamento", "Disponibilità"],
  range: "Prodotti surgelati", origin: "Da confermare per lotto", packaging: "Su richiesta", availability: "Soggetta a conferma",
  requirementsHeading: ["Il tuo prodotto.", "Le tue esigenze."],
  requirements: "Indica al nostro team l’uso previsto, il confezionamento e la quantità desiderata.",
};

export const enquiry: EnquiryCopy = { close: "Chiudi", message: "Messaggio di richiesta", copy: "Copia il messaggio", copied: "Messaggio copiato", manual: "Seleziona e copia il messaggio per condividerlo." };

export const formats: ProductFormats = ["Cimette", "Pezzi", "Tagliati"];

export const selectLabel: string = "Scegli un prodotto";
