import { site } from "./content";

/** Build a wa.me deep link with prefilled text. */
export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const GENERIC_MESSAGE = `Namaste ${site.name}, I would like to know more about your jewellery.`;

export function productMessage(name: string, sku: string, pageUrl?: string) {
  return (
    `Namaste ${site.name}, I am interested in "${name}" (Design code: ${sku}). ` +
    `Could you share more details, availability and the price?` +
    (pageUrl ? `\n${pageUrl}` : "")
  );
}
