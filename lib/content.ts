import site from "@/content/site.json";
import productsJson from "@/content/products.json";
import collectionsJson from "@/content/collections.json";
import testimonialsJson from "@/content/testimonials.json";
import faqsJson from "@/content/faqs.json";
import galleryJson from "@/content/gallery.json";
import type { Collection, Faq, GalleryItem, Product, Testimonial } from "./types";

export { site };

export const products = productsJson as Product[];
export const collections = collectionsJson as Collection[];
export const testimonials = testimonialsJson as Testimonial[];
export const faqs = faqsJson as Faq[];
export const gallery = galleryJson as GalleryItem[];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
export const productsIn = (collection: string) => products.filter((p) => p.collection === collection);
export const newArrivals = () => products.filter((p) => p.isNew);

export function relatedProducts(product: Product, limit = 4): Product[] {
  const same = products.filter((p) => p.slug !== product.slug && p.collection === product.collection);
  const sameCat = products.filter(
    (p) => p.slug !== product.slug && p.collection !== product.collection && p.category === product.category,
  );
  const rest = products.filter((p) => p.slug !== product.slug && !same.includes(p) && !sameCat.includes(p));
  return [...same, ...sameCat, ...rest].slice(0, limit);
}

export const yearsOfLegacy = () => new Date().getFullYear() - site.established;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pushpamjewellers.example").replace(/\/$/, "");
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
