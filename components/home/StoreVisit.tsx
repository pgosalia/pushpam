import { T } from "@/i18n";
import { site } from "@/lib/content";
import { to12h } from "@/lib/format";
import { GENERIC_MESSAGE, waLink } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Marked } from "@/components/ui/Marked";
import { MapEmbed } from "./MapEmbed";

export function StoreVisit({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const a = site.address;
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section aria-labelledby="visit-heading" className="section-y bg-paper">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="t-eyebrow mb-4">Ahmedabad</p>
          <H id="visit-heading" className={headingLevel === 1 ? "t-h1" : "t-h2"}>
            <T k="visit.heading" />
          </H>
          <span className="gold-rule-short mt-6 block" aria-hidden="true" />
          <p className="t-lead mt-6">
            <T k="visit.sub" />
          </p>

          <dl className="mt-10 space-y-8">
            <div className="flex gap-4">
              <dt className="mt-1 text-gold-ink">
                <PinIcon />
                <span className="sr-only">
                  <T k="visit.address" />
                </span>
              </dt>
              <dd>
                <p className="font-semibold text-charcoal">{site.name}</p>
                <p className="text-muted">
                  {a.line1}, {a.line2}
                  <br />
                  {a.city}, {a.state} {a.postalCode}
                </p>
                <p className="mt-1 text-sm">
                  <Marked text={a.note} />
                </p>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="mt-1 text-gold-ink">
                <ClockIcon />
                <span className="sr-only">
                  <T k="visit.hours" />
                </span>
              </dt>
              <dd className="space-y-2 text-muted">
                {site.hours.map((h) => (
                  <p key={h.days}>
                    <span className="font-semibold text-charcoal">{h.days}</span>
                    <br />
                    {to12h(h.open)} to {to12h(h.close)}
                  </p>
                ))}
                <p className="text-sm">
                  <Marked text={site.hoursNote} />
                </p>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="mt-1 text-gold-ink">
                <PhoneIcon />
                <span className="sr-only">
                  <T k="visit.phone" />
                </span>
              </dt>
              <dd>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center font-semibold text-maroon">
                  {site.phone}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.mapLink} variant="primary">
              <T k="cta.getDirections" />
            </ButtonLink>
            <ButtonLink href={waLink(GENERIC_MESSAGE)} variant="whatsapp" icon={<WhatsAppIcon size={18} />}>
              <T k="cta.whatsapp" />
            </ButtonLink>
          </div>
        </div>

        <div className="relative min-h-[22rem] border border-[var(--line)] p-2 lg:min-h-[32rem]">
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
