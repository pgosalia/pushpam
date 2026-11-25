import { T } from "@/i18n";
import { testimonials } from "@/lib/content";

function Stars({ n }: { n: number }) {
  return (
    <p className="flex gap-1 text-gold" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="m12 2.8 2.8 6 6.6.8-4.9 4.5 1.3 6.5L12 17.4 6.2 20.600l1.300-6.500L2.600 9.600l6.600-.8L12 2.800Z" />
        </svg>
      ))}
    </p>
  );
}

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section aria-labelledby="testimonials-heading" className="section-y bg-ivory-deep pattern pattern-paisley">
      <div className="container-x">
        <h2 id="testimonials-heading" className="t-h2 text-center">
          <T k="testimonials.heading" />
        </h2>
        <span className="mx-auto mt-6 block h-px w-16 bg-gold" aria-hidden="true" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <figure className="reveal">
            <span className="font-display text-7xl leading-none text-gold" aria-hidden="true">
              “
            </span>
            <blockquote className="-mt-6 font-display text-[1.7rem] font-medium italic leading-snug text-maroon sm:text-4xl">{lead.quote}</blockquote>
            <figcaption className="mt-8">
              <Stars n={lead.rating} />
              <p className="mt-3 font-semibold text-charcoal">{lead.name}</p>
              <p className="text-sm text-muted">{lead.context}</p>
            </figcaption>
          </figure>

          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)] lg:border-y-0 lg:border-l lg:pl-14">
            {rest.map((t) => (
              <figure key={t.id} className="reveal py-7 first:pt-0 last:pb-0 lg:py-8">
                <blockquote className="text-[1.02rem] leading-relaxed text-charcoal">{t.quote}</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-charcoal">{t.name}</span>
                  <span className="text-muted"> · {t.context}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
