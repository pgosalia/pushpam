import type { Metadata } from "next";
import { SITE_URL, site } from "./content";

export function pageMetadata(opts: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  const image = opts.image ? `${SITE_URL}${opts.image}` : `${SITE_URL}/og.png`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${site.name}, Ahmedabad` }],
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images: [image] },
  };
}

export function localBusinessJsonLd() {
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": ["JewelryStore", "LocalBusiness"],
    "@id": `${SITE_URL}/#store`,
    name: site.name,
    description:
      "Family-run jewellers in Ahmedabad, Gujarat. BIS hallmarked gold, certified diamonds, polki, kundan and bridal jewellery.",
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    logo: `${SITE_URL}/icon.svg`,
    telephone: site.phone,
    email: site.email,
    priceRange: "₹₹₹",
    foundingDate: String(site.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${a.line1}, ${a.line2}`,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: { "@type": "City", name: "Ahmedabad" },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.daysShort.map((d) => ({ Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" })[d]),
      opens: h.open,
      closes: h.close,
    })),
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube].filter(Boolean),
  };
}
