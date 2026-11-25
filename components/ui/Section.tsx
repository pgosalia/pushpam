import type { ReactNode } from "react";

export function GoldRule({ className = "" }: { className?: string }) {
  return <hr className={`gold-rule ${className}`} aria-hidden="true" />;
}

export function Ornament() {
  return (
    <span className="flex items-center justify-center gap-3" aria-hidden="true">
      <span className="gold-rule-short" />
      <span className="ornament" />
      <span className="gold-rule-short" />
    </span>
  );
}

interface HeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({ eyebrow, title, sub, align = "center", as: Tag = "h2", className = "" }: HeadingProps) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <p className={`t-eyebrow mb-4 ${center ? "flex justify-center" : ""}`}>{eyebrow}</p>}
      <Tag className={Tag === "h1" ? "t-h1" : "t-h2"}>{title}</Tag>
      {sub && <p className={`t-lead mt-5 ${center ? "mx-auto" : ""} max-w-xl`}>{sub}</p>}
      <div className={`mt-6 ${center ? "flex justify-center" : ""}`}>{center ? <Ornament /> : <span className="gold-rule-short block" aria-hidden="true" />}</div>
    </div>
  );
}
