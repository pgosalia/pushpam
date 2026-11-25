"use client";

import { useId, useMemo, useState } from "react";
import { useT } from "@/i18n";
import type { Product } from "@/lib/types";
import { GENERIC_MESSAGE, waLink } from "@/lib/whatsapp";
import { ProductCard } from "./ProductCard";
import { ChevronDown, WhatsAppIcon } from "@/components/ui/Icons";

type Group = "collection" | "category" | "metal" | "purity" | "occasion" | "weight";
type Filters = Record<Group, string[]>;

const EMPTY: Filters = { collection: [], category: [], metal: [], purity: [], occasion: [], weight: [] };

const WEIGHT_BANDS: { id: string; test: (g: number) => boolean }[] = [
  { id: "w1", test: (g) => g < 10 },
  { id: "w2", test: (g) => g >= 10 && g < 25 },
  { id: "w3", test: (g) => g >= 25 && g < 50 },
  { id: "w4", test: (g) => g >= 50 },
];

const valuesOf = (p: Product, group: Group): string[] => {
  switch (group) {
    case "collection":
      return [p.collection];
    case "category":
      return [p.category];
    case "metal":
      return [p.metal];
    case "purity":
      return [p.purity];
    case "occasion":
      return p.occasions;
    case "weight":
      return WEIGHT_BANDS.filter((b) => b.test(p.grossWeight)).map((b) => b.id);
  }
};

const unique = (xs: string[]) => [...new Set(xs)];

/**
 * Filterable product grid. Filters OR within a group and AND across groups.
 * Chips are real buttons with aria-pressed, so everything works by keyboard.
 */
export function Catalog({ products, showCollectionFilter = false }: { products: Product[]; showCollectionFilter?: boolean }) {
  const t = useT();
  const panelId = useId();
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [open, setOpen] = useState(false);

  const groups = useMemo(() => {
    const all: { group: Group; label: string; options: { value: string; label: string }[] }[] = [];
    const add = (group: Group, label: string, values: string[], labelFor: (v: string) => string) => {
      if (values.length > 1) all.push({ group, label, options: values.map((v) => ({ value: v, label: labelFor(v) })) });
    };
    if (showCollectionFilter) add("collection", "nav.collections", unique(products.map((p) => p.collection)), (v) => t(`collections.${v}.name`));
    add("category", "filters.category", unique(products.map((p) => p.category)), (v) => t(`cat.${v}`));
    add("metal", "filters.metal", unique(products.map((p) => p.metal)), (v) => t(`metal.${v}`));
    add("purity", "filters.purity", unique(products.map((p) => p.purity)), (v) => v);
    add("occasion", "filters.occasion", unique(products.flatMap((p) => p.occasions)), (v) => t(`occ.${v}`));
    add(
      "weight",
      "filters.weight",
      WEIGHT_BANDS.filter((b) => products.some((p) => b.test(p.grossWeight))).map((b) => b.id),
      (v) => t(`wt.${v}`),
    );
    return all;
  }, [products, showCollectionFilter, t]);

  const toggle = (group: Group, value: string) =>
    setFilters((f) => ({ ...f, [group]: f[group].includes(value) ? f[group].filter((v) => v !== value) : [...f[group], value] }));

  const active = Object.values(filters).reduce((n, v) => n + v.length, 0);

  const visible = useMemo(
    () =>
      products.filter((p) =>
        (Object.keys(filters) as Group[]).every((g) => filters[g].length === 0 || valuesOf(p, g).some((v) => filters[g].includes(v))),
      ),
    [products, filters],
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
      <aside aria-label={t("filters.title")}>
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <button
            type="button"
            className="btn btn-outline flex-1 justify-between"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
          >
            <span>
              {open ? t("filters.hide") : t("filters.show")}
              {active > 0 && ` (${active})`}
            </span>
            <ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div id={panelId} className={`${open ? "block" : "hidden"} mt-6 space-y-7 lg:sticky lg:top-28 lg:mt-0 lg:block`}>
          <p className="hidden font-display text-2xl text-maroon lg:block">{t("filters.title")}</p>
          {groups.map(({ group, label, options }) => (
            <fieldset key={group}>
              <legend className="t-eyebrow mb-3">{t(label)}</legend>
              <div className="flex flex-wrap gap-2">
                {options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    className="chip"
                    aria-pressed={filters[group].includes(o.value)}
                    onClick={() => toggle(group, o.value)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
          {active > 0 && (
            <button type="button" onClick={() => setFilters(EMPTY)} className="inline-flex min-h-11 items-center text-sm font-semibold text-maroon underline underline-offset-4">
              {t("filters.clear")}
            </button>
          )}
        </div>
      </aside>

      <div>
        <h2 className="sr-only">{t("filters.results")}</h2>
        <p role="status" aria-live="polite" className="mb-6 text-sm text-muted">
          {visible.length === 1 ? t("filters.count1") : t("filters.count", { n: visible.length })}
        </p>
        {visible.length > 0 ? (
          <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 md:grid-cols-3">
            {visible.map((p, i) => (
              <li key={p.slug}>
                <ProductCard product={p} priority={i < 2} sizes="(min-width: 1024px) 26vw, (min-width: 768px) 30vw, 50vw" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-[var(--line)] bg-paper p-8 text-center">
            <p className="mx-auto max-w-md text-muted">{t("filters.none")}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" className="btn btn-outline" onClick={() => setFilters(EMPTY)}>
                {t("filters.clear")}
              </button>
              <a href={waLink(GENERIC_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <WhatsAppIcon size={18} /> {t("cta.whatsapp")}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
