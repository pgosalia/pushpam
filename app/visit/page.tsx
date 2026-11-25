import type { Metadata } from "next";
import { T } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { StoreVisit } from "@/components/home/StoreVisit";
import { Marked } from "@/components/ui/Marked";

export const metadata: Metadata = pageMetadata({
  title: "Visit Us: Jewellery Store in Ahmedabad | Address, Hours, Map",
  description:
    "Visit Pushpam Jewellers in Ahmedabad. Store address, opening hours, phone, WhatsApp and Google Map. Book an appointment for a bridal or custom jewellery consultation.",
  path: "/visit/",
});

export default function VisitPage() {
  return (
    <>
      <StoreVisit headingLevel={1} />
      <section aria-labelledby="getting-here" className="section-y border-t border-[var(--line-soft)] pt-14">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <p className="t-eyebrow mb-4">
              <T k="cta.bookAppointment" />
            </p>
            <h2 id="getting-here" className="t-h2">
              Plan your visit
            </h2>
            <span className="gold-rule-short mt-6 block" aria-hidden="true" />
            <p className="t-lead mt-6">
              You are welcome any time during opening hours. For bridal shopping, an appointment keeps a designer and a private room free for you.
            </p>
            <ul className="mt-8 space-y-4 text-muted">
              <li className="flex gap-4">
                <span className="ornament mt-[0.65rem] shrink-0" aria-hidden="true" />
                <span>
                  <Marked text="Nearest landmark and parking: [CONFIRM WITH CLIENT]" />
                </span>
              </li>
              <li className="flex gap-4">
                <span className="ornament mt-[0.65rem] shrink-0" aria-hidden="true" />
                <span>Please bring a photo ID if you plan to sell or exchange old gold.</span>
              </li>
              <li className="flex gap-4">
                <span className="ornament mt-[0.65rem] shrink-0" aria-hidden="true" />
                <span>Coming with elders or children? Tell us and we will arrange seating near the entrance.</span>
              </li>
            </ul>
          </div>
          <div className="border border-[var(--line)] bg-paper p-6 sm:p-10">
            <AppointmentForm defaultPurpose="other" />
          </div>
        </div>
      </section>
    </>
  );
}
