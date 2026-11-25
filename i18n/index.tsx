"use client";

import { useCallback, useEffect, useSyncExternalStore, type ReactNode } from "react";
import en from "./en.json";

export type Locale = "en" | "gu" | "hi";
export const LOCALES: Locale[] = ["en", "gu", "hi"];

/** Labels for the language switcher. Kept here so the switcher never has to import a dictionary. */
export const LOCALE_META: Record<Locale, { short: string; name: string; htmlLang: string }> = {
  en: { short: "EN", name: "English", htmlLang: "en" },
  gu: { short: "ગુ", name: "ગુજરાતી", htmlLang: "gu" },
  hi: { short: "हि", name: "हिन्दी", htmlLang: "hi" },
};

type Dictionary = typeof en;
const STORAGE_KEY = "pushpam-lang";

/* English ships with every page. Gujarati and Hindi are separate chunks that
   load the first time they are needed, so English visitors never download them.
   Until a dictionary arrives, strings fall back to English. */
const dictionaries: Partial<Record<Locale, Dictionary>> = { en };
const loaders: Record<Exclude<Locale, "en">, () => Promise<{ default: Dictionary }>> = {
  gu: () => import("./gu.json"),
  hi: () => import("./hi.json"),
};

/* A tiny external store keeps the language in localStorage and lets every
   <T/> re-render when it changes. The server (and first paint) is always
   English, so the static HTML is complete for search engines. */
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((f) => f());
let memory: Locale | null = null; // used if localStorage is unavailable (private mode)

function readStored(): Locale {
  if (memory) return memory;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "gu" || v === "hi" ? v : "en";
  } catch {
    return "en";
  }
}

function ensureLoaded(locale: Locale) {
  if (locale === "en" || dictionaries[locale]) return;
  loaders[locale]().then((m) => {
    dictionaries[locale] = m.default;
    notify();
  });
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/* The snapshot is a string so React can compare it cheaply: "<locale>:<ready>" */
function getSnapshot(): string {
  const l = readStored();
  ensureLoaded(l);
  return `${l}:${dictionaries[l] ? 1 : 0}`;
}
const getServerSnapshot = () => "en:1";

export function setLocale(l: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
    memory = null;
  } catch {
    memory = l;
  }
  ensureLoaded(l);
  notify();
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot).split(":")[0] as Locale;
}

type Vars = Record<string, string | number>;

function lookup(dict: unknown, path: string): string | undefined {
  let cur: unknown = dict;
  for (const part of path.split(".")) {
    if (cur && typeof cur === "object" && part in (cur as object)) cur = (cur as Record<string, unknown>)[part];
    else return undefined;
  }
  return typeof cur === "string" ? cur : undefined;
}

export function translate(locale: Locale, key: string, vars?: Vars): string {
  let s = lookup(dictionaries[locale], key) ?? lookup(en, key) ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

export function useT() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const locale = snapshot.split(":")[0] as Locale;
  // `snapshot` changes when a dictionary finishes loading, so `t` is refreshed too.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((key: string, vars?: Vars) => translate(locale, key, vars), [locale, snapshot]);
}

/** Inline translated text: <T k="hero.title" /> */
export function T({ k, vars }: { k: string; vars?: Vars }): ReactNode {
  const t = useT();
  return <>{t(k, vars)}</>;
}

/** Keeps <html lang> in sync for screen readers and font selection. */
export function LangSync() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
  }, [locale]);
  return null;
}
