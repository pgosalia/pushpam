"use client";

import { T, useLocale, useT } from "@/i18n";
import { formatINR, formatUpdated } from "@/lib/format";
import { rateChange, rateValue } from "@/lib/rates";
import { Delta, RATE_ROWS, useRates } from "@/components/home/RateStrip";

export function RateBoard() {
  const rates = useRates();
  const locale = useLocale();
  const t = useT();
  const [lead, ...others] = RATE_ROWS.filter((r) => r.key === "22K").concat(RATE_ROWS.filter((r) => r.key !== "22K"));

  return (
    <section aria-labelledby="rates-board" className="section-y pb-10 sm:pb-14">
      <div className="container-x">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="rates-board" className="t-h2">
            <T k="rates.heading" />
          </h2>
          <p className="text-muted">
            <time dateTime={rates.updatedAt}>
              <T k="rates.updated" vars={{ time: formatUpdated(rates.updatedAt, locale) }} />
            </time>
          </p>
        </div>
        <span className="gold-rule-short mt-6 block" aria-hidden="true" />

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.25fr_1fr] lg:gap-6">
          <div className="on-dark pattern pattern-jali bg-maroon p-8 sm:p-12" style={{ ["--pattern-opacity" as string]: 0.1 }}>
            <p className="t-eyebrow">{t(lead.label)}</p>
            <p className="mt-5 font-display text-6xl font-medium leading-none text-on-dark sm:text-8xl">{formatINR(rateValue(rates, lead.key))}</p>
            <p className="mt-3 text-on-dark-muted">/ {t("rates.perGram")}</p>
            <p className="mt-6 inline-flex rounded bg-ivory/95 px-3 py-1.5">
              <Delta {...rateChange(rates, lead.key)} />
            </p>
          </div>
          <dl className="grid gap-4">
            {others.map(({ key, label }) => (
              <div key={key} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 border border-[var(--line)] bg-paper p-6">
                <dt className="t-eyebrow">{t(label)}</dt>
                <dd className="col-start-2 row-span-2 row-start-1 text-right">
                  <span className="font-display text-4xl font-medium text-maroon sm:text-5xl">{formatINR(rateValue(rates, key))}</span>
                  <span className="block text-xs text-muted">/ {t("rates.perGram")}</span>
                </dd>
                <dd className="col-start-1 row-start-2">
                  <Delta {...rateChange(rates, key)} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-5 text-sm text-muted">
          {rates.source === "Sample data" && <><T k="rates.sample" />. </>}Rates are indicative and may differ slightly in store. The rate on the day of purchase applies, along with making charges and GST.
        </p>
      </div>
    </section>
  );
}
