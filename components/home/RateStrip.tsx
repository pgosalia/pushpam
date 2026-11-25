"use client";

import Link from "@/components/ui/AppLink";
import { useEffect, useState } from "react";
import { T, useLocale, useT } from "@/i18n";
import { formatINR, formatUpdated } from "@/lib/format";
import { getRateProvider, rateChange, rateValue, staticRates, type RateKey } from "@/lib/rates";
import { ArrowRight, TrendDown, TrendUp } from "@/components/ui/Icons";

export const RATE_ROWS: { key: RateKey; label: string }[] = [
  { key: "24K", label: "rates.gold24" },
  { key: "22K", label: "rates.gold22" },
  { key: "18K", label: "rates.gold18" },
  { key: "silver", label: "rates.silver" },
];

/** Shared hook: starts from the build-time snapshot, then refreshes from the configured provider. */
export function useRates() {
  const [rates, setRates] = useState(staticRates);
  useEffect(() => {
    let cancelled = false;
    getRateProvider()
      .getRates()
      .then((r) => {
        if (!cancelled) setRates(r);
      })
      .catch(() => {
        /* keep the last good snapshot */
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return rates;
}

export function Delta({ diff, pct }: { diff: number; pct: number }) {
  const up = diff >= 0;
  const Icon = up ? TrendUp : TrendDown;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${up ? "text-[#1d6b46]" : "text-[#9a2a2a]"}`}>
      <Icon size={14} />
      <span className="sr-only">{up ? "Up" : "Down"} </span>
      {formatINR(Math.abs(diff))} ({Math.abs(pct).toFixed(1)}%)
    </span>
  );
}

export function RateStrip() {
  const rates = useRates();
  const locale = useLocale();
  const t = useT();
  return (
    <section aria-labelledby="rate-heading" className="border-y border-[var(--line)] bg-ivory-deep">
      <div className="container-x flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:gap-10">
        <div className="lg:w-56 lg:shrink-0">
          <h2 id="rate-heading" className="t-h3 !text-[1.5rem]">
            <T k="rates.heading" />
          </h2>
          <p className="mt-1 text-sm text-muted">
            <T k="rates.updated" vars={{ time: formatUpdated(rates.updatedAt, locale) }} />
          </p>
        </div>

        <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {RATE_ROWS.map(({ key, label }) => {
            const ch = rateChange(rates, key);
            return (
              <div key={key} className="border-l border-[var(--line)] pl-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-ink">{t(label)}</dt>
                <dd className="mt-1">
                  <span className="font-display text-[1.7rem] font-medium leading-none text-maroon">{formatINR(rateValue(rates, key))}</span>
                  <span className="ml-1.5 text-xs text-muted">/ {t("rates.perGram")}</span>
                  <span className="mt-1 block">
                    <Delta {...ch} />
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>

        <Link href="/gold-rate/" className="link-arrow self-start lg:self-center">
          <T k="cta.fullRates" /> <ArrowRight size={16} />
        </Link>
      </div>
      <p className="container-x pb-3 text-xs text-muted">
        {rates.source === "Sample data" ? <T k="rates.sample" /> : null}
      </p>
    </section>
  );
}
