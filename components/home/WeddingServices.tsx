import Link from "@/components/ui/AppLink";
import { T } from "@/i18n";
import { Img } from "@/components/ui/Img";
import { ArrowRight, PencilIcon, LotusIcon } from "@/components/ui/Icons";

export function WeddingServices() {
  return (
    <section aria-labelledby="services-heading" className="section-y">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div className="relative">
          <div className="zoom-frame aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Img
              src="/images/bridal/hero.svg"
              alt="Placeholder: bridal haar and jhumka displayed on maroon velvet"
              fill
              tone="maroon"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-full w-full border border-gold sm:block" aria-hidden="true" />
        </div>

        <div>
          <p className="t-eyebrow mb-4">Pushpam Bridal</p>
          <h2 id="services-heading" className="t-h2">
            <T k="services.heading" />
          </h2>
          <span className="gold-rule-short mt-6 block" aria-hidden="true" />
          <p className="t-lead mt-6">
            <T k="services.sub" />
          </p>

          <ul className="mt-10 space-y-8">
            {[
              { key: "custom", Icon: PencilIcon },
              { key: "consult", Icon: LotusIcon },
            ].map(({ key, Icon }) => (
              <li key={key} className="flex gap-5">
                <span className="mt-1 text-gold-ink">
                  <Icon size={34} />
                </span>
                <div>
                  <h3 className="t-h3">
                    <T k={`services.${key}.title`} />
                  </h3>
                  <p className="mt-1.5 text-muted">
                    <T k={`services.${key}.text`} />
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link href="/bridal/" className="link-arrow mt-10">
            <T k="services.link" /> <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
