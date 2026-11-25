"use client";

import { useEffect, useRef } from "react";
import { T } from "@/i18n";
import { site } from "@/lib/content";
import { GENERIC_MESSAGE, waLink } from "@/lib/whatsapp";
import { Img } from "@/components/ui/Img";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Full-bleed hero. The image drifts slightly on scroll (parallax) unless the visitor prefers reduced motion. */
export function Hero() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, 900);
      if (layer.current) layer.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="on-dark relative isolate flex min-h-[calc(100svh-7rem)] items-end overflow-hidden bg-maroon-deep sm:min-h-[min(46rem,calc(100svh-7rem))] md:items-center">
      <div ref={layer} className="absolute inset-x-0 -bottom-[6%] -top-[2%] -z-20 will-change-transform">
        <Img
          src="/images/hero.webp"
          alt="Placeholder hero image: a gold and ruby bridal haar with jhumka earrings on maroon velvet"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          tone="maroon"
          className="object-cover object-[72%_center] md:object-center"
        />
      </div>
      {/* Legibility scrims: from the left on desktop, from below on mobile */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-maroon-deep via-maroon-deep/55 to-transparent md:bg-gradient-to-r md:from-maroon-deep md:via-maroon-deep/60 md:to-transparent md:to-70%" aria-hidden="true" />

      <div className="container-x w-full pb-20 pt-24 md:py-28">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="t-eyebrow fade-in shimmer-text mb-5 inline-block">
            <T k="hero.eyebrow" vars={{ year: site.established }} />
          </p>
          <h1 className="t-display fade-up delay-1 !text-on-dark">
            <T k="hero.title" />
          </h1>
          <p className="t-lead fade-up delay-2 mt-6 max-w-lg">
            <T k="hero.subtitle" />
          </p>
          <div className="fade-up delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/visit/" variant="gold">
              <T k="cta.visitStore" />
            </ButtonLink>
            <ButtonLink href={waLink(GENERIC_MESSAGE)} variant="outline-light" icon={<WhatsAppIcon size={18} />}>
              <T k="cta.whatsapp" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
