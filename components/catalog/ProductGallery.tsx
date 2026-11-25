"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { useT } from "@/i18n";
import { Img } from "@/components/ui/Img";
import { ArrowLeft, ArrowRight, CloseIcon, ZoomIcon } from "@/components/ui/Icons";

/**
 * Gallery with hover-zoom (mouse), full-screen zoom dialog (tap, click or Enter)
 * and thumbnails. The dialog is a native <dialog>, so focus is trapped and Esc closes it.
 */
export function ProductGallery({ images, name, tone }: { images: string[]; name: string; tone: string }) {
  const t = useT();
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const labels = ["front view", "close-up", "on ivory"];
  const alt = (i: number) => `Placeholder photo of ${name}, ${labels[i] ?? `view ${i + 1}`}`;

  const go = (d: 1 | -1) => setIndex((i) => (i + d + images.length) % images.length);

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setHover({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const onDialogKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <div>
      <button
        ref={opener}
        type="button"
        aria-label={t("product.zoom")}
        onClick={() => dialog.current?.showModal()}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-ivory-deep"
      >
        <Img
          key={images[index]}
          src={images[index]}
          alt={alt(index)}
          fill
          priority
          tone={tone}
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover transition-transform duration-300 ease-out"
          style={hover ? { transform: "scale(2)", transformOrigin: `${hover.x}% ${hover.y}%` } : undefined}
        />
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-maroon" aria-hidden="true">
          <ZoomIcon size={20} />
        </span>
      </button>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-3 gap-3">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t("product.thumb", { n: i + 1 })}
                aria-current={i === index}
                className={`relative block aspect-[4/5] w-full overflow-hidden border-2 transition-colors ${i === index ? "border-maroon" : "border-transparent hover:border-gold"}`}
              >
                <Img src={src} alt="" fill tone={tone} sizes="15vw" className="object-cover" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialog}
        onKeyDown={onDialogKey}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onClose={() => opener.current?.focus()}
        aria-label={name}
        className="m-auto max-h-[94svh] w-[min(94vw,52rem)] overflow-visible bg-transparent p-0 backdrop:bg-black/85"
      >
        <div className="relative aspect-[4/5] max-h-[88svh] w-full bg-ivory-deep sm:mx-auto sm:max-w-[min(100%,70svh)]">
          <Img src={images[index]} alt={alt(index)} fill tone={tone} sizes="94vw" className="object-contain" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-on-dark">
          <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-light text-on-dark hover:bg-gold-light hover:text-maroon-deep">
            <ArrowLeft size={20} />
          </button>
          <button type="button" onClick={() => dialog.current?.close()} aria-label={t("product.closeZoom")} className="inline-flex h-12 items-center gap-2 rounded-full border border-gold-light px-5 text-sm font-semibold uppercase tracking-[0.12em] text-on-dark hover:bg-gold-light hover:text-maroon-deep">
            <CloseIcon size={18} /> {t("nav.close")}
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next image" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-light text-on-dark hover:bg-gold-light hover:text-maroon-deep">
            <ArrowRight size={20} />
          </button>
        </div>
      </dialog>
    </div>
  );
}
