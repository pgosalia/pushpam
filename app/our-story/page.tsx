import type { Metadata } from "next";
import { T } from "@/i18n";
import { site, yearsOfLegacy } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { GENERIC_MESSAGE, waLink } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { DiamondIcon, ExchangeIcon, HallmarkIcon, LotusIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Img } from "@/components/ui/Img";
import { Marked } from "@/components/ui/Marked";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Our Story: A Family Jeweller in Ahmedabad",
  description:
    "The story of Pushpam Jewellers, a family-run jeweller in Ahmedabad: our heritage, our karigars, and the hallmarking, certification and billing practices behind every piece.",
  path: "/our-story/",
});

const PROMISES = [
  { Icon: HallmarkIcon, title: "BIS hallmarking", text: site.certifications.bis },
  { Icon: DiamondIcon, title: "Diamond certification", text: site.certifications.diamonds },
  { Icon: ExchangeIcon, title: "Honest exchange and buyback", text: "Old gold weighed and tested in front of you, valued at that day's rate, with the calculation on paper. [CONFIRM WITH CLIENT: policy details]" },
  { Icon: LotusIcon, title: "GST-compliant billing", text: site.certifications.gst },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow={<T k="nav.story" />}
        title="A family jeweller, one customer at a time."
        intro={`Pushpam has served Ahmedabad families for ${yearsOfLegacy()} years. Not by being the biggest shop, but by being the one people return to.`}
        crumbs={[{ href: "/", label: <T k="nav.home" /> }, { label: <T k="nav.story" /> }]}
      />

      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="relative">
            <div className="zoom-frame aspect-[4/5]">
              <Img src="/images/story/heritage.svg" alt="Placeholder: close-up of a gold haar on warm ochre velvet" fill priority tone="gold" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="pointer-events-none absolute -bottom-4 -left-4 hidden h-full w-full border border-gold sm:block" aria-hidden="true" />
          </div>
          <div>
            <p className="t-eyebrow mb-4">Since {site.established}</p>
            <h2 className="t-h2">It began with one counter and a promise.</h2>
            <span className="gold-rule-short mt-6 block" aria-hidden="true" />
            <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-muted">
              <p>
                <Marked text={`Pushpam was started in ${site.established} by [FOUNDER NAME(S)] [CONFIRM WITH CLIENT] in Ahmedabad's jewellery lanes, with a small counter, a good set of scales and a simple rule: tell the customer everything.`} />
              </p>
              <p>
                That rule has not changed. We still write down the weight, the purity and the making charge on every bill. We still weigh your
                old gold in front of you. And we still believe a wedding purchase should be a family conversation, not a transaction.
              </p>
              <p>
                Today the shop is run by the next generation of the family, alongside the karigars who have worked with us for years. The
                designs have grown more varied, from heavy bridal haars to light diamond studs, but the way we treat people has stayed the same.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="on-dark pattern pattern-jali bg-maroon py-[clamp(4rem,9vw,7rem)]" style={{ ["--pattern-opacity" as string]: 0.09 }}>
        <div className="container-x">
          <figure className="mx-auto max-w-3xl text-center">
            <span className="font-display text-7xl leading-none text-gold-light" aria-hidden="true">
              “
            </span>
            <blockquote className="-mt-6 font-display text-3xl font-medium italic leading-snug text-on-dark sm:text-5xl">
              We would rather lose a sale than lose your trust.
            </blockquote>
            <figcaption className="mt-8 text-sm uppercase tracking-[0.2em] text-gold-light">
              <Marked text="[FAMILY NAME], Pushpam Jewellers [CONFIRM WITH CLIENT]" />
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="lg:order-2">
            <div className="zoom-frame aspect-[4/5]">
              <Img src="/images/story/craft.svg" alt="Placeholder: carved gold kada with ruby and emerald points on green velvet" fill tone="green" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:order-1">
            <p className="t-eyebrow mb-4">Craftsmanship</p>
            <h2 className="t-h2">Made by hand, checked by hand.</h2>
            <span className="gold-rule-short mt-6 block" aria-hidden="true" />
            <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-muted">
              <p>
                Gold work is slow. A temple choker is cast, carved, soldered and polished. A kundan piece has every stone set in foil by one
                artisan and enamelled on the back by another. We do not rush any of it.
              </p>
              <p>
                Before a piece leaves, it is weighed, tested and checked at the clasp, the hooks and the settings. If a stone is loose or a
                finish is uneven, it goes back to the bench. <Marked text="[CONFIRM WITH CLIENT: describe the actual workshop and quality-check process]" />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="promises-heading" className="section-y bg-ivory-deep pattern pattern-paisley">
        <div className="container-x">
          <h2 id="promises-heading" className="t-h2 mx-auto max-w-2xl text-center">
            What you can rely on
          </h2>
          <span className="mx-auto mt-6 block h-px w-16 bg-gold" aria-hidden="true" />
          <ul className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {PROMISES.map(({ Icon, title, text }) => (
              <li key={title} className="flex gap-5">
                <span className="mt-1 text-gold-ink">
                  <Icon size={40} />
                </span>
                <div>
                  <h3 className="t-h3">{title}</h3>
                  <p className="mt-2 text-muted">
                    <Marked text={text} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="zoom-frame aspect-[4/3]">
            <Img src="/images/story/family.svg" alt="Placeholder for a family portrait at the Pushpam store" fill tone="maroon" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" loading="lazy" />
          </div>
          <div>
            <p className="t-eyebrow mb-4">The family</p>
            <h2 className="t-h2">Come and meet us.</h2>
            <span className="gold-rule-short mt-6 block" aria-hidden="true" />
            <p className="t-lead mt-6">
              <Marked text="[CONFIRM WITH CLIENT: names, roles and a short line about each family member who works at the store]" /> Whoever you speak to at Pushpam, you are
              speaking to someone who will still be here when you come back for your daughter’s wedding.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/visit/">
                <T k="cta.visitStore" />
              </ButtonLink>
              <ButtonLink href={waLink(GENERIC_MESSAGE)} variant="whatsapp" icon={<WhatsAppIcon size={18} />}>
                <T k="cta.whatsapp" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
