import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { T } from "@/i18n";
import { collections, getCollection, productsIn } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Catalog } from "@/components/catalog/Catalog";
import { Marked, stripMarkers } from "@/components/ui/Marked";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { waLink } from "@/lib/whatsapp";

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => collections.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.heading} Jewellery in Ahmedabad`,
    description: `${c.blurb} ${stripMarkers(c.intro)}`.slice(0, 300),
    path: `/collections/${c.slug}/`,
  });
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();
  const items = productsIn(c.slug);

  return (
    <>
      <PageHero
        eyebrow={<T k="nav.collections" />}
        title={<T k={`collections.${c.slug}.name`} />}
        intro={<Marked text={c.intro} />}
        crumbs={[
          { href: "/", label: <T k="nav.home" /> },
          { href: "/collections/", label: <T k="nav.collections" /> },
          { label: <T k={`collections.${c.slug}.name`} /> },
        ]}
        image={{ src: c.image, alt: c.alt, tone: c.tone }}
      >
        <ButtonLink href={waLink(`Namaste Pushpam Jewellers, I would like to see your ${c.heading} collection.`)} variant="whatsapp" icon={<WhatsAppIcon size={18} />}>
          <T k="cta.enquire" />
        </ButtonLink>
      </PageHero>
      <section className="section-y pt-12 sm:pt-16">
        <div className="container-x">
          <Catalog products={items} />
        </div>
      </section>
    </>
  );
}
