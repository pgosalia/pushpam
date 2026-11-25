"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { T, useT } from "@/i18n";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import Link from "@/components/ui/AppLink";

/** Scroll-snap carousel. Native scrolling, arrow buttons, and Left/Right keys when focus is inside. */
export function NewArrivals({ products }: { products: Product[] }) {
  const t = useT();
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCard(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCard(-1);
    }
  };

  return (
    <section aria-labelledby="arrivals-heading" className="section-y bg-paper">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="t-eyebrow mb-4">
              <T k="arrivals.sub" />
            </p>
            <h2 id="arrivals-heading" className="t-h2">
              <T k="arrivals.heading" />
            </h2>
            <span className="gold-rule-short mt-6 block" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/collections/" className="link-arrow mr-2 hidden sm:inline-flex">
              <T k="cta.viewAll" /> <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={edge.start}
              aria-label={t("arrivals.prev")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold text-maroon transition-colors hover:bg-maroon hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-maroon"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={edge.end}
              aria-label={t("arrivals.next")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold text-maroon transition-colors hover:bg-maroon hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-maroon"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t("arrivals.label")}
        onKeyDown={onKey}
        className="mt-12"
      >
        <ul
          ref={track}
          onScroll={measure}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[var(--gutter)] pb-4 sm:px-8 xl:px-[max(3rem,calc((100vw-80rem)/2+3rem))]"
          style={{ scrollPaddingInline: "var(--gutter)" }}
        >
          {products.map((p, i) => (
            <li
              key={p.slug}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${products.length}`}
              className="w-[68%] shrink-0 snap-start sm:w-[40%] lg:w-[28%] xl:w-[23%]"
            >
              <ProductCard product={p} sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 28vw, (min-width: 640px) 40vw, 68vw" />
            </li>
          ))}
        </ul>
      </div>

      <div className="container-x mt-6 sm:hidden">
        <Link href="/collections/" className="link-arrow">
          <T k="cta.viewAll" /> <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
