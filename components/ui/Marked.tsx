import { Fragment } from "react";

const SHOW = process.env.NEXT_PUBLIC_SHOW_CONFIRM !== "0";
const PATTERN = /\[CONFIRM WITH CLIENT[^\]]*\]/g;

/**
 * Renders text that may contain "[CONFIRM WITH CLIENT ...]" notes. While the
 * site is a mockup these show as small highlighted tags so nothing unverified
 * goes live by accident. Set NEXT_PUBLIC_SHOW_CONFIRM=0 to hide them all.
 */
export function Marked({ text }: { text: string }) {
  const parts = text.split(PATTERN);
  const marks = text.match(PATTERN) ?? [];
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {SHOW && marks[i] && (
            <mark className="confirm-mark" title={marks[i]}>
              {marks[i].replace(/^\[|\]$/g, "").replace(/^CONFIRM WITH CLIENT:?\s*/, "Confirm: ") || "Confirm"}
            </mark>
          )}
        </Fragment>
      ))}
    </>
  );
}

/** Strip the markers, for places where only plain text is allowed (meta tags, JSON-LD). */
export const stripMarkers = (text: string) => text.replace(PATTERN, "").replace(/\s{2,}/g, " ").replace(/\s+([.,])/g, "$1").trim();
