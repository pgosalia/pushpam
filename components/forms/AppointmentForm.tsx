"use client";

import { useState, type FormEvent } from "react";
import { translate, useT } from "@/i18n";
import { FORMSPREE_ID, site } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";

type Status = "idle" | "sending" | "success" | "fallback" | "error";
const PURPOSES = ["bridal", "custom", "diamond", "gift", "exchange", "other"] as const;

/**
 * Appointment request. With NEXT_PUBLIC_FORMSPREE_ID set it posts to Formspree;
 * otherwise it opens WhatsApp with the details prefilled, so no backend is needed.
 */
export function AppointmentForm({ defaultPurpose = "bridal" }: { defaultPurpose?: (typeof PURPOSES)[number] }) {
  const t = useT();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("_gotcha")) return; // honeypot
    const purposeKey = String(fd.get("purpose"));
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      date: String(fd.get("date") ?? ""),
      purpose: translate("en", `form.purposes.${purposeKey}`),
      message: String(fd.get("message") ?? "").trim(),
    };

    if (FORMSPREE_ID) {
      setStatus("sending");
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _subject: `Appointment request from ${data.name}` }),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus("success");
      } catch {
        setStatus("error");
      }
      return;
    }

    const text =
      `Namaste ${site.name}, I would like to request an appointment.\n` +
      `Name: ${data.name}\nPhone: ${data.phone}\n` +
      (data.date ? `Preferred date: ${data.date}\n` : "") +
      `Looking for: ${data.purpose}` +
      (data.message ? `\nNotes: ${data.message}` : "");
    window.open(waLink(text), "_blank", "noopener,noreferrer");
    setStatus("fallback");
  }

  const req = (
    <span className="text-maroon" aria-hidden="true">
      {" "}
      *
    </span>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="af-name" className="label">
            {t("form.name")}
            {req}
          </label>
          <input id="af-name" name="name" type="text" autoComplete="name" required className="field" />
        </div>
        <div>
          <label htmlFor="af-phone" className="label">
            {t("form.phone")}
            {req}
          </label>
          <input id="af-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="[0-9+\s\-]{10,16}" className="field" />
        </div>
        <div>
          <label htmlFor="af-date" className="label">
            {t("form.date")}
          </label>
          <input id="af-date" name="date" type="date" className="field" suppressHydrationWarning />
        </div>
        <div>
          <label htmlFor="af-purpose" className="label">
            {t("form.purpose")}
          </label>
          <select id="af-purpose" name="purpose" defaultValue={defaultPurpose} className="field">
            {PURPOSES.map((p) => (
              <option key={p} value={p}>
                {t(`form.purposes.${p}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="af-message" className="label">
          {t("form.message")}
        </label>
        <textarea id="af-message" name="message" rows={4} className="field" />
      </div>
      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Leave empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? t("form.sending") : t("form.submit")}
        </button>
        {!FORMSPREE_ID && (
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <WhatsAppIcon size={16} /> WhatsApp
          </span>
        )}
      </div>

      <div aria-live="polite" className="min-h-6">
        {status === "success" && <p className="font-semibold text-[#1d6b46]">{t("form.success")}</p>}
        {status === "fallback" && <p className="font-semibold text-[#1d6b46]">{t("form.fallback")}</p>}
        {status === "error" && (
          <p role="alert" className="font-semibold text-[#9a2a2a]">
            {t("form.error")}
          </p>
        )}
      </div>
    </form>
  );
}
