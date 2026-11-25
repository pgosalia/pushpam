import { T } from "@/i18n";
import { site, yearsOfLegacy } from "@/lib/content";
import { DiamondIcon, ExchangeIcon, HallmarkIcon, LotusIcon } from "@/components/ui/Icons";

const ITEMS = [
  { key: "bis", Icon: HallmarkIcon },
  { key: "diamonds", Icon: DiamondIcon },
  { key: "buyback", Icon: ExchangeIcon },
  { key: "legacy", Icon: LotusIcon },
] as const;

export function TrustBand() {
  const vars = { years: yearsOfLegacy(), year: site.established };
  return (
    <section aria-labelledby="trust-heading" className="on-dark pattern pattern-jali bg-maroon py-[clamp(3.5rem,7vw,6rem)]" style={{ ["--pattern-opacity" as string]: 0.09 }}>
      <div className="container-x">
        <h2 id="trust-heading" className="t-h2 mx-auto max-w-2xl text-center">
          <T k="trust.heading" />
        </h2>
        <span className="mx-auto mt-6 block h-px w-24 bg-gold-light" aria-hidden="true" />
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
          {ITEMS.map(({ key, Icon }, i) => (
            <li key={key} className={`flex flex-col items-center text-center lg:px-8 ${i > 0 ? "lg:border-l lg:border-[rgb(217_190_128/0.35)]" : ""}`}>
              <span className="text-gold-light">
                <Icon size={44} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium !text-on-dark">
                <T k={`trust.${key}.title`} vars={vars} />
              </h3>
              <p className="mt-2 max-w-[16rem] text-[0.95rem] text-on-dark-muted">
                <T k={`trust.${key}.text`} vars={vars} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
