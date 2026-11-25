import type { Metadata } from "next";
import Link from "@/components/ui/AppLink";
import { notFound } from "next/navigation";
import { T } from "@/i18n";
import { SITE_URL, getCollection, getProduct, products, relatedProducts, site } from "@/lib/content";
import { formatINR, formatWeight } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { productMessage, waLink } from "@/lib/whatsapp";
import { ProductGallery } from "@/components/catalog/ProductGallery";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Marked, stripMarkers } from "@/components/ui/Marked";
import { Breadcrumbs } from "@/components/ui/PageHero";

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name} | ${p.purity} ${p.metal[0].toUpperCase()}${p.metal.slice(1)} Jewellery`,
    description: `${stripMarkers(p.description)} ${p.purity} ${p.metal}, about ${formatWeight(p.grossWeight)}. Enquire on WhatsApp or visit our Ahmedabad store.`.slice(0, 300),
    path: `/products/${p.slug}/`,
  });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const collection = getCollection(p.collection)!;
  const related = relatedProducts(p);
  const pageUrl = process.env.NEXT_PUBLIC_SITE_URL ? `${SITE_URL}/products/${p.slug}/` : undefined;

  const specs: { label: string; value: React.ReactNode }[] = [
    { label: "product.sku", value: p.sku },
    { label: "product.metal", value: <T k={`metal.${p.metal}`} /> },
    { label: "product.purity", value: p.purity },
    { label: "product.gross", value: formatWeight(p.grossWeight) },
    { label: "product.net", value: formatWeight(p.netWeight) },
    { label: "product.stones", value: <Marked text={p.stones} /> },
    { label: "product.cert", value: <Marked text={p.certification} /> },
    {
      label: "product.occasion",
      value: p.occasions.map((o, i) => (
        <span key={o}>
          {i > 0 && ", "}
          <T k={`occ.${o}`} />
        </span>
      )),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.sku,
    description: stripMarkers(p.description),
    image: p.images.map((i) => `${SITE_URL}${i}`),
    category: p.category,
    material: `${p.purity} ${p.metal}`,
    brand: { "@type": "Brand", name: site.name },
    weight: { "@type": "QuantitativeValue", value: p.grossWeight, unitCode: "GRM" },
    url: `${SITE_URL}/products/${p.slug}/`,
    ...(p.approxPrice
      ? { offers: { "@type": "Offer", priceCurrency: "INR", price: p.approxPrice, url: `${SITE_URL}/products/${p.slug}/`, seller: { "@type": "Organization", name: site.name } } }
      : {}),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="container-x pb-6 pt-8 sm:pt-10">
        <Breadcrumbs
          items={[
            { href: "/", label: <T k="nav.home" /> },
            { href: "/collections/", label: <T k="nav.collections" /> },
            { href: `/collections/${collection.slug}/`, label: <T k={`collections.${collection.slug}.name`} /> },
            { label: p.name },
          ]}
        />
      </section>

      <section className="container-x grid gap-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
        <ProductGallery images={p.images} name={p.name} tone={p.tone} />

        <div className="lg:pt-2">
          <p className="t-eyebrow mb-3">
            <Link href={`/collections/${collection.slug}/`} className="no-underline hover:underline">
              <T k={`collections.${collection.slug}.name`} />
            </Link>
          </p>
          <h1 className="t-h1 !text-[clamp(2rem,4.4vw,3.2rem)]">{p.name}</h1>
          <span className="gold-rule-short mt-6 block" aria-hidden="true" />

          <p className="mt-6 font-display text-3xl font-medium text-maroon">
            {p.approxPrice ? (
              <>
                <span className="mr-2 text-base font-sans font-normal text-muted">
                  <T k="product.indicative" />
                </span>
                {formatINR(p.approxPrice)}
              </>
            ) : (
              <T k="product.priceOnRequest" />
            )}
          </p>
          <p className="mt-1 text-sm text-muted">{site.priceDisclaimer}</p>

          <p className="mt-6 text-[1.05rem] leading-relaxed text-charcoal">{p.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={waLink(productMessage(p.name, p.sku, pageUrl))} variant="whatsapp" icon={<WhatsAppIcon size={18} />} className="sm:flex-1">
              <T k="cta.enquire" />
            </ButtonLink>
            <ButtonLink href="/visit/" variant="outline" className="sm:flex-1">
              <T k="cta.visitStore" />
            </ButtonLink>
          </div>

          <h2 className="mt-12 font-display text-2xl text-maroon">
            <T k="product.specs" />
          </h2>
          <dl className="mt-4 divide-y divide-[var(--line-soft)] border-y border-[var(--line)]">
            {specs.map((s) => (
              <div key={s.label} className="grid grid-cols-[8.5rem_1fr] gap-4 py-3 text-[0.95rem] sm:grid-cols-[10rem_1fr]">
                <dt className="font-semibold text-muted">
                  <T k={s.label} />
                </dt>
                <dd className="text-charcoal">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-muted">
            <T k="footer.gst" />
          </p>
        </div>
      </section>

      <section aria-labelledby="related-heading" className="section-y border-t border-[var(--line-soft)] bg-paper pt-14">
        <div className="container-x">
          <h2 id="related-heading" className="t-h2 mb-10">
            <T k="product.related" />
          </h2>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.slug}>
                <ProductCard product={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
