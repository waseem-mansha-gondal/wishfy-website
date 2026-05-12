/*
 * GENERATED FILE — DO NOT EDIT.
 * Source of truth: Brand-Tokens.json (company brand/).
 * Regenerate with `pnpm run tokens:build`.
 *
 * Tailwind v4 reads its theme from the @theme block in
 * src/styles/tokens.css. This config file exists for downstream tools
 * (Storybook, IDE plugins) and for type-safe reference. Each value
 * points at the corresponding CSS variable so behaviour is identical.
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      "colors": {
        "black": "var(--color-base-black)",
        "white": "var(--color-base-white)",
        "gray": {
          "100": "var(--color-gray-100)",
          "200": "var(--color-gray-200)",
          "500": "var(--color-gray-500)",
          "800": "var(--color-gray-800)",
          "900": "var(--color-gray-900)"
        },
        "blue": {
          "100": "var(--color-blue-100)",
          "200": "var(--color-blue-200)",
          "300": "var(--color-blue-300)",
          "500": "var(--color-blue-500)",
          "700": "var(--color-blue-700)"
        },
        "green": {
          "100": "var(--color-green-100)",
          "300": "var(--color-green-300)",
          "500": "var(--color-green-500)",
          "700": "var(--color-green-700)",
          "900": "var(--color-green-900)"
        },
        "navy": {
          "100": "var(--color-navy-100)",
          "200": "var(--color-navy-200)",
          "400": "var(--color-navy-400)",
          "700": "var(--color-navy-700)",
          "900": "var(--color-navy-900)"
        },
        "coral": {
          "100": "var(--color-coral-100)",
          "200": "var(--color-coral-200)",
          "300": "var(--color-coral-300)",
          "500": "var(--color-coral-500)",
          "700": "var(--color-coral-700)"
        },
        "bg-surface": "var(--bg-surface)",
        "bg-surface-alt": "var(--bg-surface-alt)",
        "bg-inverse": "var(--bg-inverse)",
        "bg-brand": "var(--bg-brand)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-inverse": "var(--text-inverse)",
        "text-accent": "var(--text-accent)",
        "link": "var(--link)",
        "link-hover": "var(--link-hover)",
        "border-default": "var(--border-default)",
        "border-strong": "var(--border-strong)",
        "focus-ring": "var(--focus-ring)",
        "success": "var(--success)",
        "warning": "var(--warning)",
        "error": "var(--error)",
        "highlight": "var(--highlight)",
        "deep": "var(--deep)",
        "whatsapp": "var(--whatsapp)"
      },
      "backgroundImage": {
        "sparkle": "var(--gradient-sparkle)",
        "sparkle_radial": "var(--gradient-sparkle-radial)"
      },
      "spacing": {
        "0": "var(--space-0)",
        "1": "var(--space-1)",
        "2": "var(--space-2)",
        "3": "var(--space-3)",
        "4": "var(--space-4)",
        "5": "var(--space-5)",
        "6": "var(--space-6)",
        "8": "var(--space-8)",
        "10": "var(--space-10)",
        "12": "var(--space-12)",
        "16": "var(--space-16)",
        "20": "var(--space-20)",
        "24": "var(--space-24)",
        "32": "var(--space-32)",
        "40": "var(--space-40)"
      },
      "borderRadius": {
        "none": "var(--radius-none)",
        "sm": "var(--radius-sm)",
        "md": "var(--radius-md)",
        "lg": "var(--radius-lg)",
        "xl": "var(--radius-xl)",
        "full": "var(--radius-full)"
      },
      "boxShadow": {
        "none": "var(--shadow-none)",
        "card": "var(--shadow-card)",
        "modal": "var(--shadow-modal)",
        "focus": "var(--shadow-focus)"
      },
      "fontFamily": {
        "display": "var(--font-display)",
        "body": "var(--font-body)",
        "secondary": "var(--font-secondary)",
        "mono": "var(--font-mono)"
      },
      "fontSize": {
        "display_xl": "var(--text-display-xl)",
        "h1": "var(--text-h1)",
        "h2": "var(--text-h2)",
        "h3": "var(--text-h3)",
        "h4": "var(--text-h4)",
        "h5": "var(--text-h5)",
        "h6": "var(--text-h6)",
        "body_xl": "var(--text-body-xl)",
        "body_lg": "var(--text-body-lg)",
        "body": "var(--text-body)",
        "body_sm": "var(--text-body-sm)",
        "footnote": "var(--text-footnote)"
      },
      "fontWeight": {
        "regular": "var(--font-weight-regular)",
        "medium": "var(--font-weight-medium)",
        "semibold": "var(--font-weight-semibold)",
        "bold": "var(--font-weight-bold)",
        "extra": "var(--font-weight-extra)"
      },
      "screens": {
        "sm": "var(--breakpoint-sm)",
        "md": "var(--breakpoint-md)",
        "lg": "var(--breakpoint-lg)",
        "xl": "var(--breakpoint-xl)",
        "2xl": "var(--breakpoint-2xl)"
      },
      "transitionDuration": {
        "instant": "var(--duration-instant)",
        "fast": "var(--duration-fast)",
        "default": "var(--duration-default)",
        "slow": "var(--duration-slow)"
      },
      "transitionTimingFunction": {
        "default": "var(--ease-default)",
        "in": "var(--ease-in)",
        "out": "var(--ease-out)",
        "in_out": "var(--ease-in-out)"
      }
    },
  },
};

export default config;
