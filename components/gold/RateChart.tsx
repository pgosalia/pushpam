"use client";

import { useState } from "react";
import { useT } from "@/i18n";
import { formatINR, formatShortDate } from "@/lib/format";
import type { RateKey } from "@/lib/rates";
import { RATE_ROWS, useRates } from "@/components/home/RateStrip";

const W = 360;
const H = 236;
const PAD = { l: 14, r: 14, t: 30, b: 62 }; // generous bottom: value labels sit above the date row

/** Seven-day trend as an accessible SVG line chart with a hidden data table. */
export function RateChart() {
  const rates = useRates();
  const t = useT();
  const [key, setKey] = useState<RateKey>("22K");
  const series = rates.history.map((h) => ({ date: h.date, v: h[key] }));
  const vals = series.map((s) => s.v);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = Math.max(max - min, 1);
  const x = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / Math.max(series.length - 1, 1);
  const y = (v: number) => PAD.t + (1 - (v - min) / span) * (H - PAD.t - PAD.b);
  const line = series.map((s, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(s.v).toFixed(1)}`).join("");
  const area = `${line}L${x(series.length - 1)} ${H - PAD.b}L${x(0)} ${H - PAD.b}Z`;
  const last = series[series.length - 1];
  const first = series[0];

  return (
    <section aria-labelledby="trend-heading" className="pb-10 sm:pb-14">
      <div className="container-x">
        <div className="border border-[var(--line)] bg-paper p-6 sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="trend-heading" className="t-h3">
              Last 7 days
            </h2>
            <div role="group" aria-label="Choose a rate" className="flex flex-wrap gap-2">
              {RATE_ROWS.map((r) => (
                <button key={r.key} type="button" className="chip" aria-pressed={r.key === key} onClick={() => setKey(r.key)}>
                  {t(r.label)}
                </button>
              ))}
            </div>
          </div>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="mt-8 h-auto w-full max-w-3xl"
            role="img"
            aria-label={`${t(RATE_ROWS.find((r) => r.key === key)!.label)} per gram, from ${formatINR(first.v)} on ${formatShortDate(first.date)} to ${formatINR(last.v)} on ${formatShortDate(last.date)}`}
          >
            <path d={area} fill="var(--gold)" opacity="0.14" />
            <path d={line} fill="none" stroke="var(--gold)" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
            {series.map((s, i) => (
              <circle key={s.date} cx={x(i)} cy={y(s.v)} r={i === series.length - 1 ? 4.5 : 3} fill={i === series.length - 1 ? "var(--maroon)" : "var(--paper)"} stroke="var(--gold)" strokeWidth="1.6" />
            ))}
            <text x={x(0)} y={y(first.v) + (first.v <= last.v ? 20 : -10)} fontSize="11" fill="var(--muted)" textAnchor="start">
              {formatINR(first.v)}
            </text>
            <text x={x(series.length - 1)} y={y(last.v) - 12} fontSize="12" fontWeight="600" fill="var(--maroon)" textAnchor="end">
              {formatINR(last.v)}
            </text>
            {[0, Math.floor((series.length - 1) / 2), series.length - 1].map((i) => (
              <text key={i} x={x(i)} y={H - 8} fontSize="11" fill="var(--muted)" textAnchor={i === 0 ? "start" : i === series.length - 1 ? "end" : "middle"}>
                {formatShortDate(series[i].date)}
              </text>
            ))}
          </svg>

          <table className="sr-only">
            <caption>{t(RATE_ROWS.find((r) => r.key === key)!.label)}, rate per gram by date</caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Rate</th>
              </tr>
            </thead>
            <tbody>
              {series.map((s) => (
                <tr key={s.date}>
                  <th scope="row">{formatShortDate(s.date)}</th>
                  <td>{formatINR(s.v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
