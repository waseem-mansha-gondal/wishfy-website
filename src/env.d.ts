/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CF_ANALYTICS_TOKEN?: string;
  readonly SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
