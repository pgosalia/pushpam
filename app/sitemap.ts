import type { MetadataRoute } from "next";
import { SITE_URL, collections, products } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/collections", "/bridal", "/our-story", "/visit", "/gold-rate"].map((p) => ({
    url: `${SITE_URL}${p}/`.replace(/\/\/$/, "/"),
    lastModified: now,
    changeFrequency: p === "/gold-rate" ? ("daily" as const) : ("weekly" as const),
    priority: p === "" ? 1 : 0.8,
  }));
  const cols = collections.map((c) => ({ url: `${SITE_URL}/collections/${c.slug}/`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 }));
  const prods = products.map((p) => ({ url: `${SITE_URL}/products/${p.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }));
  return [...pages, ...cols, ...prods];
}
