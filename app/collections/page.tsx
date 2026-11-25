import type { Metadata } from "next";
import { T } from "@/i18n";
import { products } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Catalog } from "@/components/catalog/Catalog";
import { PageHero } from "@/components/ui/PageHero";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";

export const metadata: Metadata = pageMetadata({
  title: "Jewellery Collections: Bridal, Diamond, Gold, Polki & Kundan",
  description:
    "Browse Pushpam's jewellery collections in Ahmedabad: bridal sets, diamond, 22K gold, polki and kundan, silver, men's and kids' jewellery. Filter by metal, purity, occasion and weight.",
  path: "/collections/",
});

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Pushpam"
        title={<T k="collections.heading" />}
        intro="Every piece below is available to see in the store. Prices depend on the day's gold rate and making charges, so we share them on request."
        crumbs={[{ href: "/", label: <T k="nav.home" /> }, { label: <T k="nav.collections" /> }]}
      />
      <CollectionsGrid />
      <section id="all-pieces" aria-labelledby="all-heading" className="section-y border-t border-[var(--line-soft)] pt-12">
        <div className="container-x">
          <h2 id="all-heading" className="t-h2 mb-10">
            All pieces
          </h2>
          <Catalog products={products} showCollectionFilter />
        </div>
      </section>
    </>
  );
}
