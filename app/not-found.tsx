import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section-y container-x">
      <SectionHeading as="h1" eyebrow="404" title="This page has gone missing." sub="The piece you were looking for may have moved. Start again from the collections, or ask us on WhatsApp." />
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/collections/">Browse collections</ButtonLink>
        <ButtonLink href="/" variant="outline">Back to home</ButtonLink>
      </div>
    </section>
  );
}
