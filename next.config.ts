import type { NextConfig } from "next";

// Fully static site: `next build` writes plain HTML/CSS/JS to `out/`,
// which is deployed to Cloudflare Pages (free, commercial use allowed).
const nextConfig: NextConfig = {
  output: "export",
  // Emit /work/slug/index.html so every static host serves clean URLs.
  trailingSlash: true,
  // No image server in a static export; images in /public are pre-optimised WebP.
  images: { unoptimized: true },
  // Hide the floating "N" badge Next.js shows in development.
  devIndicators: false,
  turbopack: {
    // A stray package-lock.json in the home folder would otherwise be picked as the root.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
