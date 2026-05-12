// Per-client site constants. Update these when copying the template for a new
// engagement; everything else (meta tags, sitemap, JSON-LD) is wired off of
// these values.
export const SITE = {
  name: "Hello Client",
  description:
    "Hello Client — a starter site built on the Wishfy website stack.",
  // Canonical URL is read from astro.config `site` (SITE_URL env var) at build time.
  // This is the human-readable owner that appears in JSON-LD.
  organization: "Hello Client, Inc.",
  locale: "en",
  themeColor: "#0f172a",
  twitterHandle: "@helloclient",
};
