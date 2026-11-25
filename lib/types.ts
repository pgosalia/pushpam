export type Metal = "gold" | "silver" | "platinum";
export type Occasion = "wedding" | "festive" | "everyday" | "gifting";

export interface Product {
  sku: string;
  slug: string;
  name: string;
  collection: string;
  category: string;
  metal: Metal;
  purity: string;
  occasions: Occasion[];
  grossWeight: number;
  netWeight: number;
  stones: string;
  certification: string;
  description: string;
  motif: string;
  tone: string;
  images: string[];
  isNew?: boolean;
  /** Optional indicative starting price in INR. Leave out to show "Price on request". */
  approxPrice?: number;
}

export interface Collection {
  slug: string;
  tone: string;
  image: string;
  alt: string;
  heading: string;
  blurb: string;
  intro: string;
}

export interface Testimonial {
  id: string;
  name: string;
  context: string;
  quote: string;
  rating: number;
}

export interface Faq {
  id: string;
  q: string;
  a: string;
}

export interface GalleryItem {
  image: string;
  alt: string;
  caption: string;
}

export interface RateSnapshot {
  source: string;
  updatedAt: string;
  gold: { "24K": number; "22K": number; "18K": number };
  silver: { "999": number };
  previousClose: { "24K": number; "22K": number; "18K": number; silver: number };
  history: Array<{ date: string; "24K": number; "22K": number; "18K": number; silver: number }>;
}

export interface Campaign {
  id: string;
  from: string;
  to: string;
  href: string;
  default?: boolean;
}
