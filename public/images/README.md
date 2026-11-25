# Images: what to replace

Every picture on the site is currently a **generated placeholder** (SVG, labelled "Placeholder image"). Replace them with real photography before launch.

## How to swap an image

**Easiest:** save your photo in the same folder with the same base name and a new extension, then update the path in the matching JSON file (for example `"/images/hero.svg"` becomes `"/images/hero.jpg"`). Where the path is written in code rather than JSON, it is listed below.

**Format:** JPG or WebP, sRGB, quality 80 to 85. Resize before uploading; the site does not resize images for you on a static export.

| Slot | Size to export | Notes |
| --- | --- | --- |
| Hero | 2400 × 1500 | Subject on the **right**, calm velvet on the left for text |
| Product | 1200 × 1500 (4:5) | 3 per piece: front, close-up, on ivory |
| Collection tile | 1200 × 1500 (4:5) | Also used as the collection page banner |
| Gallery (Instagram-style) | 1200 × 1200 | Square |
| Story, bridal steps, store | 1400 × 1050 (4:3) or 1200 × 1500 | See table below |
| Social share (`public/og.png`) | 1200 × 630 | Shown when the site is shared on WhatsApp, Facebook, etc. |

Keep each file under about 250 KB. [Squoosh](https://squoosh.app) is a free way to resize and compress.

## File list

| Path | Used on | Where the path is set |
| --- | --- | --- |
| `hero.svg` | Home hero | `components/home/Hero.tsx` |
| `collections/<slug>.svg` (7) | Home grid, collection page banners | `content/collections.json` |
| `products/<product-slug>-1.svg` to `-3.svg` (29 products × 3) | Cards, product gallery | `content/products.json` (`images`) |
| `gallery/g1.svg` to `g6.svg` | Home "From the shop floor" grid | `content/gallery.json` |
| `bridal/hero.svg` | Bridal page banner, home wedding block | `app/bridal/page.tsx`, `components/home/WeddingServices.tsx` |
| `bridal/step-consult.svg`, `-sketch.svg`, `-craft.svg`, `-deliver.svg` | Bridal process steps | `app/bridal/page.tsx` |
| `story/heritage.svg`, `craft.svg`, `family.svg`, `store.svg` | Our Story page | `app/our-story/page.tsx` |
| `../og.png` | Social share card | `lib/seo.ts` |
| `../app/icon.svg` | Browser tab icon | replace the file |

## Alt text

The alt text on placeholders starts with "Placeholder:". When you add a real photo, rewrite it to describe the piece ("Kundan choker with emerald drops on green velvet"). Product alt text is built from the product name in `ProductCard.tsx` and `ProductGallery.tsx`; edit the template there.

## Regenerating the placeholders

```powershell
npm run images
```

This rewrites everything in `public/images` from the data in `content/*.json`. Do not run it after you have added real photos with the same file names, or it will overwrite them.
