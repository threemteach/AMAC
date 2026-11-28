import type { StrawberryCopy, EnquiryCopy, ProductFormats } from "./index";
export const strawberry: StrawberryCopy = {
  category: "Fruits surgelés",
  description: "Une couleur vive, une douceur délicate et plusieurs découpes pour s’adapter à votre prochain produit.",
  cutLabel: "Choisir la découpe", sizeLabel: "Choisir le calibre", cuts: ["Entières", "Demi-fraises", "En dés"], unit: "mm",
  gallery: "Photos des fraises", referencePhoto: "Photo d’illustration",
  enquire: "Se renseigner sur ce produit", save: "Enregistrer le produit", saved: "Produit enregistré",
  detailsLabel: "Les détails", detailsHeading: "Des spécifications transparentes.",
  specs: ["Gamme", "Origine", "Découpe et calibre", "Conditionnement", "Disponibilité"],
  range: "Produits surgelés", origin: "À confirmer pour chaque lot", packaging: "Sur demande", availability: "Sous réserve de confirmation",
  requirementsHeading: ["Votre produit.", "Vos exigences."],
  requirements: "Indiquez à notre équipe l’usage prévu, le conditionnement et le volume souhaités.",
};

export const enquiry: EnquiryCopy = { close: "Fermer", message: "Message de demande", copy: "Copier le message", copied: "Message copié", manual: "Sélectionnez et copiez le message pour le partager." };

export const formats: ProductFormats = ["Fleurettes", "Morceaux", "Coupés"];

export const selectLabel: string = "Choisir un produit";
