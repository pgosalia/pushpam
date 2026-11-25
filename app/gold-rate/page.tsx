import type { Metadata } from "next";
import { T } from "@/i18n";
import { faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { GENERIC_MESSAGE, waLink } from "@/lib/whatsapp";
import { GoldCalculator } from "@/components/gold/GoldCalculator";
import { RateBoard } from "@/components/gold/RateBoard";
import { RateChart } from "@/components/gold/RateChart";
import { ButtonLink } from "@/components/ui/Button";
import { ChevronDown, WhatsAppIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Marked, stripMarkers } from "@/components/ui/Marked";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Today's Gold Rate in Ahmedabad (24K, 22K, 18K) & Jewellery FAQs",
  description:
    "Today's gold rate per gram in Ahmedabad for 24K, 22K and 18K gold and silver, with a 7-day trend. Plus answers on BIS hallmarking, exchange, buyback, making charges and custom orders.",
  path: "/gold-rate/",
});

export default function GoldRatePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: stripMarkers(f.a) } })),
  };
  return (
    <>
      <JsonLd data={faqLd} />
      <PageHero
        eyebrow={<T k="nav.goldRate" />}
        title="Today's gold rate in Ahmedabad"
        intro="Rates per gram in rupees for 24K, 22K and 18K gold and for silver, updated by the store. Jewellery is usually priced on 22K."
        crumbs={[{ href: "/", label: <T k="nav.home" /> }, { label: <T k="nav.goldRate" /> }]}
      />
      <RateBoard />
      <RateChart />
      <GoldCalculator />

      <section aria-labelledby="faq-heading" className="section-y pt-6">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <p className="t-eyebrow mb-4">FAQ</p>
            <h2 id="faq-heading" className="t-h2">
              Questions we are often asked
            </h2>
            <span className="gold-rule-short mt-6 block" aria-hidden="true" />
            <p className="t-lead mt-6">Can’t find yours? Ask us on WhatsApp and we will reply the same day.</p>
            <div className="mt-8">
              <ButtonLink href={waLink(GENERIC_MESSAGE)} variant="whatsapp" icon={<WhatsAppIcon size={18} />}>
                <T k="cta.whatsapp" />
              </ButtonLink>
            </div>
          </div>
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faqs.map((f) => (
              <details key={f.id} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-3 font-display text-xl font-medium text-maroon sm:text-2xl">
                  {f.q}
                  <ChevronDown size={22} className="shrink-0 text-gold-ink transition-transform group-open:rotate-180" />
                </summary>
                <p className="max-w-2xl pb-5 text-[1.02rem] leading-relaxed text-muted">
                  <Marked text={f.a} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
