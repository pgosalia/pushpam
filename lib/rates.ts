import ratesJson from "@/content/rates.json";
import type { RateSnapshot } from "./types";

/**
 * Gold-rate data layer.
 *
 * The UI only talks to a RateProvider, so swapping the data source is a
 * one-line change in `getRateProvider()`:
 *
 *   - jsonRateProvider: reads content/rates.json (default, mock data)
 *   - apiRateProvider:  fetches NEXT_PUBLIC_RATES_API_URL. The endpoint must
 *                       return JSON with the RateSnapshot shape (lib/types.ts).
 *
 * To plug in a real feed (IBJA, a bullion API, or a small serverless function
 * that scrapes the client's preferred source), point the env var at it. CORS
 * must allow the site's origin.
 */
export interface RateProvider {
  getRates(): Promise<RateSnapshot>;
}

export const staticRates = ratesJson as RateSnapshot;

export const jsonRateProvider: RateProvider = {
  async getRates() {
    return staticRates;
  },
};

export function apiRateProvider(url: string): RateProvider {
  return {
    async getRates() {
      const res = await fetch(url, { headers: { accept: "application/json" } });
      if (!res.ok) throw new Error(`Rate API responded ${res.status}`);
      return (await res.json()) as RateSnapshot;
    },
  };
}

export function getRateProvider(): RateProvider {
  const url = process.env.NEXT_PUBLIC_RATES_API_URL;
  return url ? apiRateProvider(url) : jsonRateProvider;
}

export type RateKey = "24K" | "22K" | "18K" | "silver";

export function rateValue(r: RateSnapshot, key: RateKey): number {
  return key === "silver" ? r.silver["999"] : r.gold[key];
}

export function rateChange(r: RateSnapshot, key: RateKey) {
  const now = rateValue(r, key);
  const prev = r.previousClose[key];
  return { diff: now - prev, pct: ((now - prev) / prev) * 100 };
}
