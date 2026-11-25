import Link from "@/components/ui/AppLink";
import { T } from "@/i18n";
import { collections } from "@/lib/content";
import { Img } from "@/components/ui/Img";
import { SectionHeading } from "@/components/ui/Section";
import { ArrowRight } from "@/components/ui/Icons";

/* Bento layout: one tall lead tile, four compact tiles, two wide tiles. */
const LAYOUT: Record<string, string> = {
  bridal: "col-span-2 md:col-span-6 md:row-span-2 aspect-[4/5] md:aspect-auto md:min-h-[40rem]",
  diamond: "col-span-1 md:col-span-3 aspect-[4/5] md:aspect-[4/5]",
  gold: "col-span-1 md:col-span-3 aspect-[4/5] md:aspect-[4/5]",
  "polki-kundan": "col-span-1 md:col-span-3 aspect-[4/5] md:aspect-[4/5]",
  silver: "col-span-1 md:col-span-3 aspect-[4/5] md:aspect-[4/5]",
  mens: "col-span-1 md:col-span-6 aspect-[4/5] md:aspect-[16/10]",
  kids: "col-span-1 md:col-span-6 aspect-[4/5] md:aspect-[16/10]",
};

export function CollectionsGrid() {
  return (
    <section aria-labelledby="collections-heading" className="section-y pattern pattern-paisley">
      <div className="container-x">
        <SectionHeading
          title={<span id="collections-heading"><T k="collections.heading" /></span>}
          eyebrow="Pushpam"
          sub={<T k="collections.sub" />}
        />
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-12">
          {collections.map((c, i) => {
            const large = c.slug === "bridal";
            return (
              <li key={c.slug} className={`${LAYOUT[c.slug]} group relative`}>
                <Link href={`/collections/${c.slug}/`} className="absolute inset-0 block overflow-hidden text-on-dark no-underline">
                  <span className="zoom-frame absolute inset-0 block">
                    <Img
                      src={c.image}
                      alt={c.alt}
                      fill
                      tone={c.tone}
                      sizes={large ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                      className="object-cover"
                      {...(i < 2 ? {} : { loading: "lazy" as const })}
                    />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <span className={`block font-display font-medium leading-tight text-on-dark ${large ? "text-3xl sm:text-4xl" : "text-xl sm:text-3xl"}`}>
                      <T k={`collections.${c.slug}.name`} />
                    </span>
                    <span className={`mt-2 hidden max-w-sm text-sm leading-snug text-on-dark-muted ${large ? "sm:block" : "md:block"} ${large ? "" : "lg:text-[0.9rem]"}`}>
                      <T k={`collections.${c.slug}.blurb`} />
                    </span>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-light transition-[gap] duration-300 group-hover:gap-3">
                      <span className={large ? "" : "hidden lg:inline"}>
                        <T k="cta.viewCollection" />
                      </span>{" "}
                      <ArrowRight size={14} />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
