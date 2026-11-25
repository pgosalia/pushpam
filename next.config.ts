import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes a plain HTML site to ./out that can be
 * hosted free on Cloudflare Pages, Netlify, GitHub Pages or Vercel.
 *
 * `images.unoptimized` is required for static export. If you deploy to Vercel
 * and want on-demand image optimisation, delete `output` and `images` below.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
