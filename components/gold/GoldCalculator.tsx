"use client";

import { useState } from "react";
import { formatINR } from "@/lib/format";
import { rateValue, type RateKey } from "@/lib/rates";
import { useRates } from "@/components/home/RateStrip";

/** Rough metal value for a given weight. Excludes making charges, stones and GST. */
export function GoldCalculator() {
  const rates = useRates();
  const [grams, setGrams] = useState("10");
  const [purity, setPurity] = useState<RateKey>("22K");
  const g = Number.parseFloat(grams);
  const value = Number.isFinite(g) && g > 0 ? g * rateValue(rates, purity) : 0;

  return (
    <section aria-labelledby="calc-heading" className="pb-10 sm:pb-14">
      <div className="container-x">
        <div className="on-dark grid gap-8 bg-maroon-deep p-8 sm:p-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <h2 id="calc-heading" className="t-h3 !text-on-dark">
              Estimate the gold value
            </h2>
            <p className="mt-3 text-on-dark-muted">
              Enter a weight to see the approximate value of the metal alone, at today’s rate. Making charges, stones and GST are extra.
            </p>
          </div>
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="calc-weight" className="mb-1.5 block text-sm font-semibold text-on-dark">
                  Weight in grams
                </label>
                <input
                  id="calc-weight"
                  inputMode="decimal"
                  type="number"
                  min="0"
                  step="0.1"
                  value={grams}
                  onChange={(e) => setGrams(e.target.value)}
                  className="field !border-gold-light"
                />
              </div>
              <div>
                <label htmlFor="calc-purity" className="mb-1.5 block text-sm font-semibold text-on-dark">
                  Purity
                </label>
                <select id="calc-purity" value={purity} onChange={(e) => setPurity(e.target.value as RateKey)} className="field !border-gold-light">
                  <option value="24K">24K</option>
                  <option value="22K">22K</option>
                  <option value="18K">18K</option>
                  <option value="silver">Silver (999)</option>
                </select>
              </div>
            </div>
            <p className="mt-6 text-on-dark-muted" aria-live="polite">
              Approximate metal value
              <span className="mt-1 block font-display text-5xl font-medium text-gold-light">{formatINR(Math.round(value))}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
