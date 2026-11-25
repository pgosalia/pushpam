"use client";

import Link from "@/components/ui/AppLink";
import { useState, useSyncExternalStore } from "react";
import { useT } from "@/i18n";
import { site } from "@/lib/content";
import type { Campaign } from "@/lib/types";
import { CloseIcon } from "@/components/ui/Icons";

const campaigns = site.announcements.campaigns as Campaign[];
const fallback = campaigns.find((c) => c.default) ?? campaigns[0];

/** The first dated campaign that includes today (IST), else the default one. */
function pickId(): string {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const live = campaigns.find((c) => !c.default && c.from <= today && today <= c.to);
  return (live ?? fallback).id;
}
const subscribe = () => () => {};

export function AnnouncementBar() {
  const t = useT();
  const id = useSyncExternalStore(subscribe, pickId, () => fallback.id);
  const [dismissed, setDismissed] = useState(false);
  if (!site.announcements.enabled || dismissed) return null;
  const campaign = campaigns.find((c) => c.id === id) ?? fallback;

  return (
    <div className="on-dark relative bg-maroon-deep text-on-dark">
      <div className="container-x flex items-center justify-center gap-4 py-2 pr-12 text-center text-[0.8125rem] leading-snug sm:text-sm">
        <p>
          {t(`announce.${campaign.id}`)}{" "}
          <Link href={campaign.href} className="whitespace-nowrap font-semibold text-gold-light underline underline-offset-4">
            {t("cta.learnMore")}
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={t("cta.dismiss")}
        className="absolute right-1 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center text-on-dark-muted hover:text-on-dark sm:right-4"
      >
        <CloseIcon size={18} />
      </button>
    </div>
  );
}
