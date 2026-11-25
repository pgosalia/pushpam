"use client";

import Link from "@/components/ui/AppLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/i18n";
import { NAV } from "@/lib/nav";
import { GENERIC_MESSAGE, waLink } from "@/lib/whatsapp";
import { site } from "@/lib/content";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Wordmark } from "./Wordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line-soft)] bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/85">
      <div className="container-x flex h-[4.25rem] items-center justify-between gap-3 xl:h-20">
        <Wordmark />

        <nav aria-label={t("nav.primary")} className="hidden xl:block">
          <ul className="flex items-center gap-9">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`inline-block py-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] no-underline transition-colors hover:text-maroon ${
                    isActive(item.href) ? "text-maroon underline decoration-gold decoration-2 underline-offset-[10px]" : "text-charcoal"
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <LanguageSwitcher />
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-maroon xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("nav.close") : t("nav.menu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="max-h-[calc(100svh-4.25rem)] overflow-y-auto border-t border-[var(--line-soft)] bg-ivory xl:hidden">
          <nav aria-label={t("nav.primary")} className="container-x py-4">
            <ul>
              {NAV.map((item) => (
                <li key={item.href} className="border-b border-[var(--line-soft)]">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex min-h-14 items-center font-display text-2xl no-underline ${isActive(item.href) ? "text-maroon" : "text-charcoal"}`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 pb-4 sm:grid-cols-2">
              <Link href="/visit/" onClick={() => setOpen(false)} className="btn btn-primary">
                {t("cta.visitStore")}
              </Link>
              <a href={waLink(GENERIC_MESSAGE)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} />
                {t("cta.whatsapp")}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <p className="pb-2 text-sm text-muted">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold text-maroon">
                {site.phone}
              </a>
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
