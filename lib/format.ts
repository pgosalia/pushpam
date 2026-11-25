/** Indian digit grouping: 125000 -> ₹1,25,000 */
const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export const formatINR = (value: number) => inr.format(value);

export const formatWeight = (g: number) => `${g.toFixed(g % 1 === 0 ? 0 : 1)} g`;

/** "24 Nov 2026, 10:30 am IST" in the viewer's chosen language */
export function formatUpdated(iso: string, locale: string) {
  const d = new Date(iso);
  const map: Record<string, string> = { en: "en-IN", gu: "gu-IN", hi: "hi-IN" };
  return (
    new Intl.DateTimeFormat(map[locale] ?? "en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    }).format(d) + " IST"
  );
}

export const formatShortDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" }).format(new Date(iso));

export const to12h = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${suffix}`;
};
