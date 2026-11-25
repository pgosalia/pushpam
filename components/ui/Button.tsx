import Link from "@/components/ui/AppLink";
import type { ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "outline-light" | "whatsapp";

interface Props {
  href: string;
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
  className?: string;
  icon?: ReactNode;
}

/** Link styled as a button. Internal hrefs use next/link; external open in a new tab. */
export function ButtonLink({ href, variant = "primary", children, external, className = "", icon }: Props) {
  const cls = `btn btn-${variant} ${className}`.trim();
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {icon}
        {children}
        {newTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {icon}
      {children}
    </Link>
  );
}
