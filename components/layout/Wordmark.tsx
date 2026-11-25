import Link from "@/components/ui/AppLink";

/** Text-based wordmark placeholder. Replace with the client's logo SVG when available. */
export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Pushpam Jewellers, home" className="inline-flex flex-col leading-none no-underline">
      <span
        className={`font-display text-[1.45rem] font-medium tracking-[0.2em] sm:text-[1.7rem] sm:tracking-[0.24em] ${light ? "text-on-dark" : "text-maroon"}`}
      >
        PUSHPAM
      </span>{" "}
      <span
        className={`mt-1.5 flex items-center gap-2 text-[0.58rem] font-semibold tracking-[0.46em] ${light ? "text-gold-light" : "text-gold-ink"}`}
        aria-hidden="true"
      >
        <span className="ornament !h-[5px] !w-[5px]" />
        JEWELLERS
        <span className="ornament !h-[5px] !w-[5px]" />
      </span>
    </Link>
  );
}
