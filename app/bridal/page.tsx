import type { Metadata } from "next";
import { T } from "@/i18n";
import { productsIn, site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { GENERIC_MESSAGE, waLink } from "@/lib/whatsapp";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Img } from "@/components/ui/Img";
import { Marked } from "@/components/ui/Marked";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = pageMetadata({
  title: "Bridal & Custom Jewellery Design in Ahmedabad",
  description:
    "Plan your wedding jewellery with Pushpam, Ahmedabad. A private bridal consultation, custom design from sketch to delivery, and hand-finished gold, polki and kundan sets. Book an appointment.",
  path: "/bridal/",
});

const STEPS = [
  {
    n: "01",
    title: "Consult",
    image: "/images/bridal/step-consult.svg",
    tone: "maroon",
    alt: "Placeholder: jhumka earrings on maroon velvet, as shown in a bridal consultation",
    body: "Come with your mother, your sisters, and a photo of the outfit if you have one. We listen first: the wedding date, the budget, which family pieces you want to reuse, and what you have always imagined wearing. We will lay out pieces so you can see and handle the weight and finish.",
  },
  {
    n: "02",
    title: "Sketch",
    image: "/images/bridal/step-sketch.svg",
    tone: "ivory",
    alt: "Placeholder: a pencil-style line sketch of a bridal necklace on ivory paper",
    body: "Within a few days our designer draws your set by hand. We agree the design, the stones and an approximate gold weight in writing, so there are no surprises. You can ask for changes until the sketch feels right.",
  },
  {
    n: "03",
    title: "Craft",
    image: "/images/bridal/step-craft.svg",
    tone: "green",
    alt: "Placeholder: close-up of kundan and gold craftsmanship on green velvet",
    body: "Our karigars cast, carve and set each piece by hand. We share progress photos, and invite you for a mid-way look at larger sets. [CONFIRM WITH CLIENT: workshop in-house or partner karigars, typical timelines of 3 to 6 weeks]",
  },
  {
    n: "04",
    title: "Deliver",
    image: "/images/bridal/step-deliver.svg",
    tone: "ink",
    alt: "Placeholder: a finished ring in a dark presentation box",
    body: "Before the wedding you come for a final fitting. We check every clasp and hook, hand over hallmark details and a GST bill, and pack the set in boxes made for the day. Resizing and touch-ups afterwards are on us. [CONFIRM WITH CLIENT]",
  },
];

const INCLUDED = [
  "A private room with seating for the whole family",
  "A designer who has dressed many brides, and time to talk",
  "Old gold weighed and valued in front of you, if you wish to exchange it",
  "A written estimate: weights, rate, making charges and GST, line by line",
  "Chai, and no pressure to decide that day",
];

export default function BridalPage() {
  const bridal = productsIn("bridal").slice(0, 4);
  return (
    <>
      <PageHero
        eyebrow={<T k="nav.bridal" />}
        title="Bridal jewellery, designed with your whole family."
        intro="From the first conversation to the final fitting, we plan your wedding jewellery around your outfit, your rituals and your family's pieces."
        crumbs={[{ href: "/", label: <T k="nav.home" /> }, { label: <T k="nav.bridal" /> }]}
        image={{ src: "/images/bridal/hero.svg", alt: "Placeholder: bridal haar with ruby and emerald drops on maroon velvet", tone: "maroon" }}
      >
        <ButtonLink href="#appointment" variant="gold">
          <T k="cta.bookAppointment" />
        </ButtonLink>
        <ButtonLink href={waLink("Namaste Pushpam Jewellers, I would like to plan bridal jewellery.")} variant="outline-light" icon={<WhatsAppIcon size={18} />}>
          <T k="cta.whatsapp" />
        </ButtonLink>
      </PageHero>

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="t-eyebrow mb-4">The way we work</p>
            <h2 className="t-h2">A bride is dressed in stages. Her jewellery should be planned that way.</h2>
            <span className="gold-rule-short mt-6 block" aria-hidden="true" />
          </div>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-muted">
            <p>
              The haar goes on first, then the earrings, the tikka, the bangles. Each piece changes how the next one looks. So we do not sell
              a bridal set as a box of separate items. We plan it as a whole, in gold, polki, kundan or diamond, to suit your saree or
              lehenga and the way your family likes to celebrate.
            </p>
            <p>
              You can start with a design from our collection, bring a picture from a magazine, or hand us an old necklace that has been in the
              family for years. We will help you decide what to keep, what to remake and what to buy new.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="pattern pattern-jali bg-ivory-deep pb-[var(--section-y)] pt-[var(--section-y)]">
        <div className="container-x">
          <SectionHeading title={<span id="process-heading">From first chat to final fitting</span>} eyebrow="Our process" />
          <ol className="mt-16 space-y-16 lg:space-y-24">
            {STEPS.map((s, i) => (
              <li key={s.n} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <div className="zoom-frame aspect-[4/3]">
                    <Img src={s.image} alt={s.alt} fill tone={s.tone} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" loading="lazy" />
                  </div>
                </div>
                <div className={i % 2 ? "lg:order-1" : ""}>
                  <p className="font-display text-7xl font-medium leading-none text-gold" aria-hidden="true">
                    {s.n}
                  </p>
                  <h3 className="t-h2 mt-2">
                    <span className="sr-only">Step {Number(s.n)}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-muted">
                    <Marked text={s.body} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="included-heading" className="on-dark bg-maroon section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="t-eyebrow mb-4">Bridal consultation</p>
            <h2 id="included-heading" className="t-h2">
              What your hour with us includes
            </h2>
            <span className="mt-6 block h-px w-16 bg-gold-light" aria-hidden="true" />
          </div>
          <ul className="space-y-5">
            {INCLUDED.map((x) => (
              <li key={x} className="flex gap-4 text-[1.05rem] text-on-dark">
                <span className="ornament mt-[0.65rem] shrink-0 !bg-gold-light" aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="bridal-pieces-heading" className="section-y">
        <div className="container-x">
          <SectionHeading title={<span id="bridal-pieces-heading">Bridal pieces to begin with</span>} sub="A few designs from our bridal collection. Every one can be adapted to your outfit." />
          <ul className="mt-14 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {bridal.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <ButtonLink href="/collections/bridal/" variant="outline">
              <T k="cta.viewCollection" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section id="appointment" aria-labelledby="appointment-heading" className="section-y scroll-mt-24 bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <p className="t-eyebrow mb-4">
              <T k="cta.bookAppointment" />
            </p>
            <h2 id="appointment-heading" className="t-h2">
              Tell us about the wedding
            </h2>
            <span className="gold-rule-short mt-6 block" aria-hidden="true" />
            <p className="t-lead mt-6">
              Share a few details and we will call you to fix a time. Prefer to talk now? Message us on WhatsApp or call {site.phone}.
            </p>
            <div className="mt-8">
              <ButtonLink href={waLink(GENERIC_MESSAGE)} variant="whatsapp" icon={<WhatsAppIcon size={18} />}>
                <T k="cta.whatsapp" />
              </ButtonLink>
            </div>
          </div>
          <div className="border border-[var(--line)] bg-ivory p-6 sm:p-10">
            <AppointmentForm defaultPurpose="bridal" />
          </div>
        </div>
      </section>
    </>
  );
}
