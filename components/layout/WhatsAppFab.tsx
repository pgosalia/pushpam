"use client";

import { useT } from "@/i18n";
import { GENERIC_MESSAGE, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Floating WhatsApp button, present on every page. */
export function WhatsAppFab() {
  const t = useT();
  return (
    <a
      href={waLink(GENERIC_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("cta.whatsapp")} (opens in a new tab)`}
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-whatsapp px-[1.05rem] text-white shadow-[0_8px_24px_rgb(0_0_0/0.28)] transition-colors hover:bg-[var(--whatsapp-deep)] sm:bottom-6 sm:right-6 sm:px-6"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <WhatsAppIcon size={26} />
      <span className="hidden text-[0.8125rem] font-semibold uppercase tracking-[0.12em] sm:inline">{t("cta.whatsapp")}</span>
    </a>
  );
}
