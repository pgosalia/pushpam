import type { Metadata } from "next";
import { newArrivals } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { RateStrip } from "@/components/home/RateStrip";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";
import { NewArrivals } from "@/components/home/NewArrivals";
import { TrustBand } from "@/components/home/TrustBand";
import { WeddingServices } from "@/components/home/WeddingServices";
import { Testimonials } from "@/components/home/Testimonials";
import { InstaGrid } from "@/components/home/InstaGrid";
import { StoreVisit } from "@/components/home/StoreVisit";

export const metadata: Metadata = pageMetadata({
  title: "Jewellers in Ahmedabad | Gold, Diamond, Polki & Bridal Jewellery",
  description:
    "Pushpam Jewellers is a family-run jeweller in Ahmedabad. BIS hallmarked gold, certified diamonds, polki, kundan and bridal sets. See today's gold rate, visit the store or enquire on WhatsApp.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <RateStrip />
      <CollectionsGrid />
      <NewArrivals products={newArrivals()} />
      <TrustBand />
      <WeddingServices />
      <Testimonials />
      <InstaGrid />
      <StoreVisit />
    </>
  );
}
