# Placeholders and assumptions to confirm with the client

Everything on this list was invented or assumed so the mockup looks finished. **None of it is verified.** In the running site, anything in a content file marked `[CONFIRM WITH CLIENT]` shows as a small yellow tag; delete the marker once confirmed.

## 1. Business facts (`content/site.json`)

| Item | Placeholder used | Where it shows |
| --- | --- | --- |
| Year established | 1987 | Hero eyebrow, "39 years of legacy", Our Story, structured data |
| Phone | +91 98250 00000 | Header menu, footer, visit blocks, structured data |
| WhatsApp number | 919825000000 | Every WhatsApp button and the floating button |
| Email | hello@pushpamjewellers.example | Footer, structured data |
| Street address | Shop 12, Ratan Pol, Manek Chowk, Ahmedabad 380001 | Footer, Visit, structured data |
| Map | Google Maps embed searches for "Ratan Pol, Manek Chowk, Ahmedabad" | Home, Visit. Replace with the shop's exact Google Maps embed link |
| Coordinates | 23.0258, 72.5873 (approximate) | Structured data only |
| Opening hours | Mon to Sat 10:30 am to 8:30 pm; Sun 11 am to 7 pm | Footer, Visit, structured data |
| Weekly off and festival hours | Not stated | Add if relevant |
| Instagram | @pushpamjewellers (link may not exist) | Gallery, footer |
| Facebook, YouTube | Empty | Add to `site.json` and they appear in structured data |
| GSTIN | Not provided | Footer |
| Nearest landmark and parking | Not provided | Visit page |

## 2. Story and people

- Founder name(s), family name, and the year-one story (`app/our-story/page.tsx`). The founding narrative is generic; it must be replaced with the real one.
- Names, roles and a line about each family member at the store, plus a real family or store photo.
- Whether the workshop is in-house or uses partner karigars, and the real quality-check process.
- The pull quote ("We would rather lose a sale than lose your trust") is written in the brand voice; confirm the family is happy to be quoted saying it.
- Typical custom-order timeline (assumed 3 to 6 weeks) on the Bridal page and in the FAQs.

## 3. Trust claims and policies. Do not publish unconfirmed.

These are legal or regulatory claims. The copy is written to be plausible, not to be true.

- **BIS hallmarking**: that all gold is hallmarked, BIS licence or registration number, HUID on every invoice.
- **IGI / GIA certification**: which labs, which stones get reports, from what size.
- **Polki certification**, **Pt950** (platinum) hallmark, **925** silver hallmark, **999** fine silver.
- **GST-compliant billing** and GSTIN.
- **Exchange policy**: valuation method, deductions, when it applies.
- **Buyback policy**: rate, percentage, conditions, invoice requirement.
- **Making charges** structure and rate-lock on large orders.
- **Free resizing** and after-sales policy.
- That the shop stocks **platinum** at all (one placeholder product exists).

All appear in `content/faqs.json`, `content/products.json`, `content/site.json` and `app/our-story/page.tsx`.

## 4. Catalogue (`content/products.json`, `content/collections.json`)

- All **29 products** are fictional: names, SKUs (`PJ-BR-001` format), weights, stone details, descriptions.
- **7 products** carry an `approxPrice` (₹32,000 to ₹3,00,000) so the Indian grouping and "Indicative from" display can be seen; these figures are invented. Delete the field to show "Price on request".
- Which pieces are marked **New**.
- Collection names, blurbs and intros. The set (Bridal, Diamond, Gold, Polki & Kundan, Silver, Men's, Kids) is from the brief.
- Weight bands (under 10 g, 10 to 25 g, 25 to 50 g, 50 g and above) are based on gross weight.

## 5. Gold and silver rates (`content/rates.json`)

- **All rates are mock data**: 24K ₹13,450, 22K ₹12,330, 18K ₹10,090, silver ₹185 per gram, with a made-up 7-day history. They are labelled "Sample rates for the mockup" on the page.
- Decide the source (the client's daily rate, IBJA, or a bullion API) and who updates it. See the README for the live-API hook.
- Whether to show silver, and 995/999 purity labelling.

## 6. Testimonials (`content/testimonials.json`)

- All four are **invented** sample quotes with invented first names and areas. Replace with real customer words, with their permission, or remove the section. Do not launch fake reviews.

## 7. Announcement bar (`site.json` and `i18n/*.json`)

- Campaign dates are assumed: Dhanteras 28 Oct to 7 Nov 2026, Akshaya Tritiya 4 to 11 Apr 2027, wedding season 15 Nov 2026 to 28 Feb 2027 (default). Festival dates move every year; check against the panchang.
- The offer wording ("gold coins, silver and new designs in store now") is placeholder; do not promise stock or offers the shop does not have.

## 8. Translations

- Gujarati and Hindi were written for this mockup and **need review by a native speaker** (and ideally the client's family) before launch. Check tone, spelling of "Pushpam" in each script, and jewellery terms.
- Only interface copy is translated. Long-form pages (Our Story, Bridal process), product descriptions and FAQ answers are English only.
- The brand name stays in Latin letters (text wordmark).

## 9. Brand assets

- **Wordmark**: text placeholder ("PUSHPAM / JEWELLERS"). Replace `components/layout/Wordmark.tsx` with the real logo.
- **Favicon**: `app/icon.svg` is a plain "P" monogram.
- **All photography**: every image is a generated placeholder. See `public/images/README.md`.
- **Social share image**: `public/og.png` is built from the placeholder hero.

## 10. Technical items to set before launch

- **Domain**: set `NEXT_PUBLIC_SITE_URL` (currently `https://www.pushpamjewellers.example`), then rebuild so canonicals, sitemap and Open Graph are correct.
- **Form delivery**: create a Formspree form and set `NEXT_PUBLIC_FORMSPREE_ID`; until then the forms open WhatsApp. Confirm who receives the emails.
- **Privacy**: the appointment forms collect a name and phone number. Add a privacy policy page (and a cookie banner if analytics are added). None is included. This is not legal advice; ask the client's adviser what the DPDP Act requires of them.
- **Analytics**: none installed.
- **Lighthouse scores** were measured locally against a static server, not the live host. Re-test after deployment.

## 11. Assumptions made

- This is a visit-and-enquire site: **no cart, no checkout, no online payments**.
- The shop is in the Ratan Pol / Manek Chowk jewellery market (a guess based on where Ahmedabad's traditional jewellers cluster).
- Prices are optional and mostly "on request", as is normal in Indian jewellery retail.
- Language choice is stored in the browser, not in the URL, so Gujarati and Hindi are not separately indexed by search engines.
- The palette is maroon and ivory with antique gold, not bottle green. Bottle green appears only in some placeholder images (Polki & Kundan).
