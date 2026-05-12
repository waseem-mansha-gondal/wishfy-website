// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Set this per client. Used for canonical URLs, sitemap, and OG tags.
const SITE_URL = process.env.SITE_URL ?? "https://hello-client.pages.dev";

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "auto",
  },
});
