# Pushpam Jewellers

Marketing and catalogue website for a family-run jeweller in Ahmedabad. Built to drive **store visits and WhatsApp enquiries**, not checkout.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · static export · no database.

> This is a **client mockup**. Names, address, phone, hours, prices, testimonials and gold rates are placeholders. See [PLACEHOLDERS.md](PLACEHOLDERS.md) for everything to confirm before launch.

## Run it

Requires Node 20 or newer.

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `out/` |
| `npm start` | Serve `out/` locally (after a build) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run check` | Lint, typecheck and build |
| `npm run images` | Regenerate placeholder images |

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, rate strip, collections, new arrivals, trust band, wedding services, testimonials, gallery, store visit |
| `/collections/` | All collections plus the filterable catalogue |
| `/collections/<slug>/` | One collection (7: bridal, diamond, gold, polki-kundan, silver, mens, kids) |
| `/products/<slug>/` | Product detail: gallery with zoom, specs, WhatsApp enquiry, related pieces (29) |
| `/bridal/` | Bridal and custom design: process, consultation, appointment form |
| `/our-story/` | Heritage, craft, family, certifications |
| `/visit/` | Address, hours, map, appointment form |
| `/gold-rate/` | Gold and silver rates, 7-day trend, value estimator, FAQs |

## Editing content (no code needed)

All content is JSON in [`content/`](content). Edit, save, and rebuild.

| File | What it controls |
| --- | --- |
| `site.json` | Business name, established year, phone, WhatsApp number, address, hours, social links, certifications, **announcement-bar campaigns** |
| `products.json` | Every piece: SKU, name, collection, metal, purity, weights, stones, certification, description, images, `isNew`, optional `approxPrice` |
| `collections.json` | The 7 collections: heading, blurb, intro, image |
| `testimonials.json` | Customer quotes |
| `rates.json` | Gold and silver rates (see below) |
| `faqs.json` | Questions and answers on the Gold Rate page (also feeds FAQ structured data) |
| `gallery.json` | The Instagram-style grid |

### Add a product

Copy an entry in `products.json` and change it. Required fields: `sku`, `slug` (lowercase, hyphens, unique), `name`, `collection` (a slug from `collections.json`), `category`, `metal` (`gold`, `silver` or `platinum`), `purity`, `occasions`, `grossWeight`, `netWeight`, `stones`, `certification`, `description`, `images`.

- Set `"isNew": true` to include it in the **New arrivals** carousel.
- Leave out `approxPrice` to show **Price on request**. Add `"approxPrice": 125000` to show "Indicative from ₹1,25,000" (Indian digit grouping is applied automatically).
- Filters (category, metal, purity, occasion, weight band) are generated from the data, so a new value appears by itself.

### Text containing `[CONFIRM WITH CLIENT]`

Wherever the JSON contains this marker, the site shows a small yellow tag so nothing unverified goes live unnoticed. When the client confirms a fact, delete the marker. To hide every tag at once for a clean preview, set `NEXT_PUBLIC_SHOW_CONFIRM=0`.

### Announcement bar

`site.json` → `announcements.campaigns` lists campaigns with `from` and `to` dates (IST). The bar shows the first dated campaign that includes today, otherwise the one marked `"default": true`. The text for each campaign is in `i18n/*.json` under `announce.<id>`. Festival dates change every year, so check them.

### Languages (English, ગુજરાતી, हिन्दी)

Interface text lives in [`i18n/en.json`](i18n/en.json), `gu.json` and `hi.json`: navigation, hero, CTAs, rates, collection names and blurbs, trust band, filters, product labels, forms and footer are translated. Long-form page copy (Our Story, Bridal process, FAQs) and product descriptions are English only for now.

- Add a string: add the same key to all three files; use it with `<T k="section.key" />` or `t("section.key")`. A missing translation falls back to English.
- The visitor's choice is remembered in the browser. The HTML for every page is English, which is what search engines index.
- Have a native speaker review the Gujarati and Hindi before launch. The copy was written carefully but is not professionally proofread.

## Gold rate

The rate strip and `/gold-rate/` read from a small interface in [`lib/rates.ts`](lib/rates.ts), so a live feed can be plugged in without touching the UI.

- **Today (mock):** edit `content/rates.json`. Update `updatedAt`, the per-gram values and `previousClose`.
- **Live API:** set `NEXT_PUBLIC_RATES_API_URL` to an endpoint that returns JSON in the same shape as `rates.json`. The page shows the build-time values first and swaps in the live ones when they arrive. The endpoint must allow cross-origin requests (CORS) from your site. A tiny Cloudflare Worker or Vercel function that fetches the client's chosen rate source is enough.
- **Different source:** implement `RateProvider` (one method, `getRates()`) and return it from `getRateProvider()`.

## Forms

The appointment forms (Bridal and Visit pages) work with **no backend**:

- With `NEXT_PUBLIC_FORMSPREE_ID` set, they post to [Formspree](https://formspree.io) and you get an email.
- Without it, submitting opens WhatsApp with the details prefilled, so the shop still receives the enquiry.

Product pages have an **Enquire on WhatsApp** button that opens `wa.me` with the product name and design code prefilled. The WhatsApp number is `whatsapp` in `site.json` (digits only, with the country code).

## Images

See [`public/images/README.md`](public/images/README.md) for every slot, recommended sizes, and how to swap. Short version: drop in a photo, update the path in the matching JSON file.

Static export cannot resize images at request time, so export photos at the sizes in that guide. The `next/image` blur placeholders and `sizes` hints are already wired, and `sizes` takes effect if you later host on Vercel with image optimisation (remove `output: "export"` and `images.unoptimized` in `next.config.ts`).

## SEO

- Per-page titles and descriptions, canonical URLs, Open Graph and Twitter cards (`lib/seo.ts`).
- JSON-LD: `JewelryStore` + `LocalBusiness` (every page), `Product` (product pages), `FAQPage` (Gold Rate).
- `sitemap.xml` and `robots.txt` are generated at build time.
- Local keywords ("jewellers in Ahmedabad", "gold rate today Ahmedabad", and so on) are in titles, descriptions and headings.
- Set `NEXT_PUBLIC_SITE_URL` to the real domain before building, or canonical URLs and the sitemap will point at the placeholder domain.

## Environment variables

Copy `.env.example` to `.env.local`. All are optional.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, for canonicals, sitemap and Open Graph |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form id |
| `NEXT_PUBLIC_RATES_API_URL` | Live rate endpoint |
| `NEXT_PUBLIC_SHOW_CONFIRM` | `0` hides the yellow confirm tags |

Values are baked in at build time, so rebuild after changing them.

## Deploy

`npm run build` writes a plain HTML site to `out/`. Any static host works.

**Cloudflare Pages** (free): connect the repository, build command `npm run build`, output directory `out`. Add the environment variables under Settings. `public/_headers` already sets long caching for static assets.

**Vercel** (free): import the repository; it detects Next.js automatically. Add the environment variables in the dashboard.

**Netlify**: build command `npm run build`, publish directory `out`.

**GitHub Pages** (custom domain `pushpam.parsh.app`): the workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`. One-time setup: push the repo to GitHub, then Settings > Pages > Source: **GitHub Actions**, set the custom domain to `pushpam.parsh.app`, and add a DNS `CNAME` record `pushpam` pointing to `<your-github-username>.github.io`. Optional build settings go in Settings > Secrets and variables > Actions > Variables (`FORMSPREE_ID`, `RATES_API_URL`, `SHOW_CONFIRM`). The `_headers` file is ignored on GitHub Pages.

**Any other host:** upload the contents of `out/`.

Pages are written as `folder/index.html`, so URLs end in a slash (`/bridal/`) on every host.

## Project layout

```
app/                Routes (App Router), global CSS, sitemap, robots
components/
  layout/           Header, footer, announcement bar, WhatsApp button, language switcher
  home/             Home sections
  catalog/          Product card, filterable grid, gallery
  gold/             Rate board, trend chart, estimator
  forms/            Appointment form
  ui/               Buttons, headings, images, icons, shared bits
content/            Editable JSON (see above)
i18n/               en.json, gu.json, hi.json and the tiny translation store
lib/                Content loaders, formatting, WhatsApp links, rates, SEO
public/             Images, og.png, _headers
scripts/            Placeholder image generator
```

## Quality report

Measured with Lighthouse 12 (mobile preset: simulated Moto G Power on slow 4G), headless Edge, against the static export served locally. Lab numbers, not field data; re-run after deploying.

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 91 | 100 | 100 | 100 |
| Collections | 94 | 100 | 100 | 100 |
| Collection (Bridal) | 96 | 100 | 100 | 100 |
| Product | 96 | 100 | 100 | 100 |
| Bridal | 96 | 100 | 100 | 100 |
| Our Story | 96 | 100 | 100 | 100 |
| Visit | 98 | 100 | 100 | 100 |
| Gold Rate | 96 | 100 | 100 | 100 |

Cumulative layout shift is 0 and total blocking time is 10 to 30 ms on every page. Home is the tightest on performance: its simulated mobile LCP is about 3.5 s (the unthrottled LCP measures about 0.3 s), mostly the hero image and fonts sharing a throttled connection. **Real photographs will weigh more than these placeholders**, so keep the hero under about 150 KB and re-test. Lint and typecheck are clean and the build produces 47 static pages.

To re-run:

```powershell
npm run build
npm start
npx lighthouse http://localhost:3000/ --view
```

## Notes

- **Link prefetch is off** (`components/ui/AppLink.tsx`). In local testing, Next's viewport prefetch on this static export asked for per-segment payload files (`__next.<route>.__PAGE__.txt`) that the export writes under a different path, which filled the console with 404s. Navigation works without prefetch; it just fetches on click. If your host serves those files correctly you can pass `prefetch` on individual links.
- Design tokens, type scale and component rules are in [DESIGN.md](DESIGN.md).
