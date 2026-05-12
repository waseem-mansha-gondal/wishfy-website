// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Production site URL — override via SITE_URL env var at build time.
const SITE_URL = process.env.SITE_URL ?? "https://wishfy.ai";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "auto",
    format: "directory",
  },
});
