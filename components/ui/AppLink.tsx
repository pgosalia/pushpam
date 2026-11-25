import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * next/link with prefetching off by default.
 *
 * On a static export, Next's viewport prefetch asks for per-segment payload
 * files that some static hosts do not map, which produces noisy 404s in the
 * console. Without prefetch, navigation still works (it fetches the page
 * payload on click) and the page stays small and quiet. To re-enable, pass
 * `prefetch` on an individual link.
 */
export default function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />;
}
