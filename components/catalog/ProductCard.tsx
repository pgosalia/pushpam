import Link from "@/components/ui/AppLink";
import { T } from "@/i18n";
import { formatINR, formatWeight } from "@/lib/format";
import type { Product } from "@/lib/types";
import { Img } from "@/components/ui/Img";

export function ProductCard({ product, priority = false, sizes }: { product: Product; priority?: boolean; sizes?: string }) {
  return (
    <article className="group relative">
      <Link href={`/products/${product.slug}/`} className="block no-underline">
        <div className="zoom-frame aspect-[4/5]">
          <Img
            src={product.images[0]}
            alt={`Placeholder photo of ${product.name}`}
            fill
            tone={product.tone}
            sizes={sizes ?? "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"}
            className="object-cover"
            priority={priority}
          />
          {product.isNew && (
            <span className="absolute left-3 top-3 bg-maroon px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-on-dark">
              <T k="product.new" />
            </span>
          )}
        </div>
        <div className="pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-ink">
            {product.purity} · <T k={`metal.${product.metal}`} />
          </p>
          <h3 className="mt-1 font-display text-xl font-medium leading-snug text-maroon sm:text-[1.4rem]">{product.name}</h3>
          <p className="mt-1.5 text-sm text-muted">
            <T k="product.approxWeight" vars={{ w: formatWeight(product.grossWeight).replace(" g", "") }} />
            {" · "}
            {product.approxPrice ? (
              <>
                <T k="product.indicative" /> {formatINR(product.approxPrice)}
              </>
            ) : (
              <T k="product.priceOnRequest" />
            )}
          </p>
        </div>
      </Link>
    </article>
  );
}
