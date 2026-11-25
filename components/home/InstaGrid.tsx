import { T } from "@/i18n";
import { gallery, site } from "@/lib/content";
import { Img } from "@/components/ui/Img";
import { InstagramIcon } from "@/components/ui/Icons";

export function InstaGrid() {
  return (
    <section aria-labelledby="gallery-heading" className="section-y">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="t-eyebrow mb-4">
              <T k="gallery.sub" />
            </p>
            <h2 id="gallery-heading" className="t-h2">
              <T k="gallery.heading" />
            </h2>
            <span className="gold-rule-short mt-6 block" aria-hidden="true" />
          </div>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="link-arrow">
            <InstagramIcon size={18} />
            <T k="gallery.follow" vars={{ handle: site.social.instagramHandle }} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {gallery.map((g) => (
            <li key={g.image} className="group">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="zoom-frame relative block aspect-square">
                <Img src={g.image} alt={g.alt} fill tone="ink" sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw" className="object-cover" loading="lazy" />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                  <span className="text-xs leading-snug text-on-dark">{g.caption}</span>
                </span>
                <span className="sr-only">{g.caption} (opens Instagram in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
