import type { StrawberryCopy, EnquiryCopy, ProductFormats } from "./index";
export const strawberry: StrawberryCopy = {
  category: "Tiefgekühltes Obst",
  description: "Leuchtende Farbe, feine Süße und vielseitige Schnittformen für Ihr nächstes Produkt.",
  cutLabel: "Schnittform wählen", sizeLabel: "Größe wählen", cuts: ["Ganz", "Halbiert", "Gewürfelt"], unit: "mm",
  gallery: "Produktfotos der Erdbeeren", referencePhoto: "Beispielfoto",
  enquire: "Produktanfrage stellen", save: "Produkt merken", saved: "Produkt gemerkt",
  detailsLabel: "Die Details", detailsHeading: "Klare Angaben zu jeder Spezifikation.",
  specs: ["Sortiment", "Herkunft", "Schnitt und Größe", "Verpackung", "Verfügbarkeit"],
  range: "Tiefkühlprodukte", origin: "Je Charge zu bestätigen", packaging: "Auf Anfrage", availability: "Nach Bestätigung",
  requirementsHeading: ["Ihr Produkt.", "Ihre Anforderungen."],
  requirements: "Teilen Sie uns den Verwendungszweck, die gewünschte Verpackung und die Menge mit.",
};

export const enquiry: EnquiryCopy = { close: "Schließen", message: "Anfragetext", copy: "Nachricht kopieren", copied: "Nachricht kopiert", manual: "Markieren und kopieren Sie die Nachricht, um sie zu teilen." };

export const formats: ProductFormats = ["Röschen", "Stücke", "Geschnitten"];

export const selectLabel: string = "Produkt auswählen";
