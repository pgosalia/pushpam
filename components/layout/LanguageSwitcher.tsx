"use client";

import { LOCALES, LOCALE_META, setLocale, useLocale, useT } from "@/i18n";

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const current = useLocale();
  const t = useT();
  return (
    <div role="group" aria-label={t("nav.language")} className="flex items-center">
      {LOCALES.map((l) => {
        const active = l === current;
        const meta = LOCALE_META[l];
        return (
          <button
            key={l}
            type="button"
            lang={meta.htmlLang}
            aria-pressed={active}
            aria-label={`${meta.short} ${meta.name}`}
            onClick={() => setLocale(l)}
            className={`font-system min-h-11 min-w-10 px-1.5 text-[0.95rem] transition-colors sm:min-w-11 ${
              active
                ? `font-semibold ${light ? "text-gold-light" : "text-maroon"} underline decoration-gold decoration-2 underline-offset-8`
                : `${light ? "text-on-dark-muted hover:text-on-dark" : "text-muted hover:text-maroon"}`
            }`}
          >
            {meta.short}
          </button>
        );
      })}
    </div>
  );
}
