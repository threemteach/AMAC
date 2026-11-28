import type { StrawberryCopy, EnquiryCopy, ProductFormats } from "./index";
export const strawberry: StrawberryCopy = {
  category: "Frozen fruits",
  description: "Bright colour, delicate sweetness and a versatile range of cuts for your next product.",
  cutLabel: "Choose your cut", sizeLabel: "Select size / grade", cuts: ["Whole", "Halves", "Diced"], unit: "mm",
  gallery: "Strawberry product photos", referencePhoto: "Illustrative photo",
  enquire: "Enquire about this product", save: "Save product for later", saved: "Product saved",
  detailsLabel: "The details", detailsHeading: "Clarity in every specification.",
  specs: ["Product range", "Origin", "Cut & size", "Packaging", "Availability"],
  range: "Frozen produce", origin: "Confirm per batch", packaging: "On enquiry", availability: "Subject to confirmation",
  requirementsHeading: ["Your product.", "Your requirements."],
  requirements: "Share your application, packaging and volume with our team.",
};

export const enquiry: EnquiryCopy = { close: "Close", message: "Enquiry message", copy: "Copy message", copied: "Message copied", manual: "Select and copy the message to share it." };

export const formats: ProductFormats = ["Florets", "Pieces", "Cut"];

export const selectLabel: string = "Choose a product";
