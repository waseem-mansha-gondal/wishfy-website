// Site-wide constants. Pulls brand identity from generated tokens so the
// values stay in sync with Brand-Tokens.json (single source of truth).
import { tokens } from './tokens';

export const SITE = {
  name: tokens.brand.name,
  domain: tokens.brand.domain,
  tagline: tokens.brand.taglinePrimary,
  description:
    'Wishfy makes your business the obvious answer in Google, ChatGPT, Claude, Perplexity, and every search that matters in 2026.',
  url: `https://${tokens.brand.domain}`,
  locale: 'en-US',
  contactEmail: tokens.brand.contactEmail,
  whatsappNumber: tokens.brand.whatsappNumber,
  whatsappNumberDisplay: tokens.brand.whatsappNumberDisplay,
  whatsappNumberSchema: tokens.brand.whatsappNumberSchema,
} as const;
