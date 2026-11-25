import type { ReactNode } from "react";
import Link from "@/components/ui/AppLink";
import { Img } from "./Img";

interface Crumb {
  href?: string;
  label: ReactNode;
}

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${light ? "text-on-dark-muted" : "text-muted"}`}>
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.href ? (
              <Link href={c.href} className={`inline-flex min-h-8 items-center ${light ? "text-on-dark" : "text-maroon"} underline underline-offset-4`}>
                {c.label}
              </Link>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface Props {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  image?: { src: string; alt: string; tone?: string };
  children?: ReactNode;
}

/** Page header. With an image it becomes a dark, photographic band; without, a quiet ivory one. */
export function PageHero({ eyebrow, title, intro, crumbs, image, children }: Props) {
  if (image) {
    return (
      <section className="on-dark relative isolate overflow-hidden bg-maroon-deep">
        <Img src={image.src} alt={image.alt} fill priority sizes="100vw" tone={image.tone} className="-z-20 object-cover object-[70%_center]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-maroon-deep via-maroon-deep/65 to-maroon-deep/20 md:bg-gradient-to-r md:from-maroon-deep md:via-maroon-deep/70 md:to-transparent" aria-hidden="true" />
        <div className="container-x py-16 sm:py-24 lg:py-28">
          {crumbs && <Breadcrumbs items={crumbs} light />}
          <div className="mt-8 max-w-2xl">
            {eyebrow && <p className="t-eyebrow mb-4">{eyebrow}</p>}
            <h1 className="t-h1 fade-up">{title}</h1>
            {intro && <p className="t-lead fade-up delay-1 mt-5">{intro}</p>}
            {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="pattern pattern-paisley border-b border-[var(--line-soft)] bg-ivory-deep">
      <div className="container-x py-12 sm:py-16 lg:py-20">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="mt-6 max-w-3xl">
          {eyebrow && <p className="t-eyebrow mb-4">{eyebrow}</p>}
          <h1 className="t-h1">{title}</h1>
          <span className="gold-rule-short mt-6 block" aria-hidden="true" />
          {intro && <p className="t-lead mt-6 max-w-2xl">{intro}</p>}
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </div>
    </section>
  );
}
