"use client";

import { useT } from "@/i18n";
import { site } from "@/lib/content";

/** Google Maps embed (no API key needed). Lazy-loaded so it never blocks first paint. */
export function MapEmbed() {
  const t = useT();
  return (
    <iframe
      title={t("visit.map")}
      src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] border-0 grayscale-[35%] sepia-[15%]"
    />
  );
}
