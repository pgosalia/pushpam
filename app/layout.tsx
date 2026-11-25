import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
  Noto_Serif_Devanagari,
  Noto_Serif_Gujarati,
} from "next/font/google";
import "./globals.css";
import { LangSync, T } from "@/i18n";
import { SITE_URL, site } from "@/lib/content";
import { localBusinessJsonLd } from "@/lib/seo";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { JsonLd } from "@/components/ui/JsonLd";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
  style: "normal",
  variable: "--font-cormorant",
  display: "swap",
});
/* Italic is only used for pull quotes, below the fold: do not preload */
const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
  style: "italic",
  variable: "--font-cormorant-italic",
  display: "swap",
  preload: false,
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
/* Indic fonts load only when a Gujarati or Hindi glyph is rendered (unicode-range) */
const notoSansGu = Noto_Sans_Gujarati({ subsets: ["gujarati"], variable: "--font-noto-sans-gu", display: "swap", preload: false });
const notoSansHi = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-noto-sans-hi", display: "swap", preload: false });
const notoSerifGu = Noto_Serif_Gujarati({ subsets: ["gujarati"], variable: "--font-noto-serif-gu", display: "swap", preload: false });
const notoSerifHi = Noto_Serif_Devanagari({ subsets: ["devanagari"], variable: "--font-noto-serif-hi", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | Jewellers in Ahmedabad: Gold, Diamond & Bridal Jewellery`,
    template: `%s | ${site.name}, Ahmedabad`,
  },
  description:
    "Pushpam Jewellers, a family-run jeweller in Ahmedabad. BIS hallmarked gold, certified diamonds, polki, kundan and bridal jewellery. Visit the store or enquire on WhatsApp.",
  applicationName: site.name,
  keywords: [
    "jewellers in Ahmedabad",
    "gold jewellery Ahmedabad",
    "bridal jewellery Ahmedabad",
    "diamond jewellery Ahmedabad",
    "polki kundan jewellery",
    "gold rate today Ahmedabad",
    "BIS hallmark jewellery",
  ],
  openGraph: { siteName: site.name, locale: "en_IN", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#5e1224",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [cormorant, cormorantItalic, dmSans, notoSansGu, notoSansHi, notoSerifGu, notoSerifHi].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts}>
      <body>
        <LangSync />
        <a href="#main" className="skip-link">
          <T k="skip" />
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
