import Link from "@/components/ui/AppLink";
import { T } from "@/i18n";
import { NAV } from "@/lib/nav";
import { site } from "@/lib/content";
import { to12h } from "@/lib/format";
import { InstagramIcon, PhoneIcon } from "@/components/ui/Icons";
import { Marked } from "@/components/ui/Marked";
import { Wordmark } from "./Wordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const year = new Date().getFullYear();
  const a = site.address;
  return (
    <footer className="on-dark pattern pattern-jali bg-maroon-deep text-on-dark" style={{ ["--pattern-opacity" as string]: 0.06 }}>
      <div className="container-x pb-28 pt-16 sm:pb-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div>
            <Wordmark light />
            <p className="mt-6 max-w-xs text-on-dark-muted">
              <T k="footer.tagline" />
            </p>
            <div className="mt-6 flex items-center gap-1">
              {site.social.instagram && (
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center text-gold-light hover:text-on-dark"
                  aria-label="Instagram (opens in a new tab)"
                >
                  <InstagramIcon />
                </a>
              )}
            </div>
            <div className="mt-4 border-t border-[rgb(217_190_128/0.25)] pt-3">
              <LanguageSwitcher light />
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="t-eyebrow !text-gold-light">
              <T k="footer.explore" />
            </h2>
            <ul className="mt-4 space-y-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-block py-2 text-on-dark no-underline hover:text-gold-light">
                    <T k={n.key} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="t-eyebrow !text-gold-light">
              <T k="footer.contact" />
            </h2>
            <address className="mt-4 space-y-3 not-italic text-on-dark-muted">
              <p>
                {a.line1}, {a.line2}
                <br />
                {a.city}, {a.state} {a.postalCode}
              </p>
              <p>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-on-dark hover:text-gold-light">
                  <PhoneIcon size={18} /> {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center text-on-dark underline underline-offset-4 hover:text-gold-light">
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h2 className="t-eyebrow !text-gold-light">
              <T k="footer.hours" />
            </h2>
            <ul className="mt-4 space-y-3 text-on-dark-muted">
              {site.hours.map((h) => (
                <li key={h.days}>
                  <span className="block text-on-dark">{h.days}</span>
                  {to12h(h.open)} to {to12h(h.close)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="gold-rule mt-14" aria-hidden="true" />

        <div className="mt-8 grid gap-3 text-sm text-on-dark-muted lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-2">
            <p>
              <T k="footer.gst" /> <Marked text={`GSTIN: ${site.gstin}`} />
            </p>
            <p className="max-w-3xl">
              <T k="footer.disclaimer" />
            </p>
          </div>
          <p>
            <T k="footer.rights" vars={{ year }} />
          </p>
        </div>
      </div>
    </footer>
  );
}
