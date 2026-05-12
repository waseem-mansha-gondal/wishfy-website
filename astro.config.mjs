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
  // i18n routing (WIS-14). All four launch locales live under /<lang>/ on a
  // single domain — see context/i18n-Strategy.md §2.
  //
  // - `prefixDefaultLocale: true` keeps English on /en/ instead of bare /,
  //   so the language-router page at / can do an explicit redirect.
  // - `redirectToDefaultLocale: false` disables Astro's built-in /-to-/en/
  //   redirect because the strategy requires cookie + Accept-Language
  //   detection, which we handle in src/pages/index.astro.
  // - Unknown locales are NOT listed and have no `fallback`, so /xx/ paths
  //   404 instead of silently redirecting (per i18n-Strategy.md §2).
  i18n: {
    defaultLocale: "en",
    locales: ["en", "nl", "de", "fr"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
