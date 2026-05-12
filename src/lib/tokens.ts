/*
 * GENERATED FILE — DO NOT EDIT.
 * Source of truth: Brand-Tokens.json (company brand/).
 * Regenerate with `pnpm run tokens:build`.
 *
 * Typed export of the full token tree. Use this for runtime values that
 * components need to render (e.g. the WhatsApp number, the tagline) —
 * styling consumers should reach for the CSS variables in tokens.css.
 */

export const tokens = {
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "$description": "Wishfy central design tokens — the single source of truth for ALL branding, sourced directly from Wishfy's official Brand Guidelines '26 (see ./brand-assets/brand-kit-source.pdf). The build pipeline consumes this file to generate: src/styles/tokens.css (CSS variables), tailwind.config.ts (Tailwind theme), src/lib/tokens.ts (TS export), public/brand/* (logo exports), and the public /brand page. Do NOT hard-code colors, fonts, sizes, spacing, or logo paths anywhere — reference these tokens.",
  "$owner": "Waseem Mansha (CEO)",
  "$version": "2.0.0",
  "$last_updated": "2026-05-12",
  "$source_of_truth": "00-Company/brand-assets/brand-kit-source.pdf (Brand Guidelines '26)",
  "brand": {
    "name": {
      "$value": "Wishfy",
      "$type": "string"
    },
    "legal_name": {
      "$value": "Wishfy",
      "$type": "string"
    },
    "domain": {
      "$value": "wishfy.ai",
      "$type": "string"
    },
    "tagline_primary": {
      "$value": "Where Ideas Meet AI Precision",
      "$type": "string",
      "$description": "Canonical tagline from the brand kit. Used in homepage hero, OG images, and the dot-em-dash form 'Wishfy — Where Ideas Meet AI Precision'."
    },
    "tagline_secondary": {
      "$value": "Get found. Get cited. Get chosen.",
      "$type": "string",
      "$description": "Outcome-forward CTA-friendly variant. Use on service pages and conversion moments."
    },
    "contact_email": {
      "$value": "info@wishfy.ai",
      "$type": "string"
    },
    "whatsapp_number": {
      "$value": "31644095332",
      "$type": "string",
      "$description": "Waseem's mobile (NL +31 6 44 09 53 32) in E.164 format, no plus sign. Used directly in wa.me URLs. For schema.org telephone fields, prepend '+'."
    },
    "whatsapp_number_display": {
      "$value": "+31 6 44 09 53 32",
      "$type": "string",
      "$description": "Human-readable formatting for use in the footer, contact page, and email signatures."
    },
    "whatsapp_number_schema": {
      "$value": "+31644095332",
      "$type": "string",
      "$description": "E.164 with leading + for schema.org ContactPoint.telephone."
    },
    "whatsapp_default_message": {
      "$value": "Hi Wishfy, I'd like to talk about a visibility audit.",
      "$type": "string"
    }
  },
  "color": {
    "$description": "Color palettes pulled directly from Brand Guidelines '26. Base = black + white. Five hue families: gray, electric blue, success green, navy, and coral. The brand-defining 'AI sparkle' is a multi-stop gradient handled separately under gradient.sparkle.",
    "base": {
      "black": {
        "$value": "#000000",
        "$type": "color",
        "$description": "Primary brand color — used for the logo circle on light surfaces and as the default ink."
      },
      "white": {
        "$value": "#FFFFFF",
        "$type": "color",
        "$description": "Primary surface color and inverse mark color."
      }
    },
    "gray": {
      "100": {
        "$value": "#D6D6D6",
        "$type": "color"
      },
      "200": {
        "$value": "#AFAFAF",
        "$type": "color"
      },
      "500": {
        "$value": "#656565",
        "$type": "color"
      },
      "800": {
        "$value": "#242424",
        "$type": "color",
        "$description": "Surface for muted dark elements; close to but not pure black."
      },
      "900": {
        "$value": "#000000",
        "$type": "color"
      }
    },
    "blue": {
      "100": {
        "$value": "#E8E8FF",
        "$type": "color"
      },
      "200": {
        "$value": "#BCBCFF",
        "$type": "color"
      },
      "300": {
        "$value": "#8F8FFF",
        "$type": "color"
      },
      "500": {
        "$value": "#6161FE",
        "$type": "color"
      },
      "700": {
        "$value": "#2323FE",
        "$type": "color",
        "$description": "Electric Blue — the saturated brand accent for CTAs, links, and 'found' highlights."
      }
    },
    "green": {
      "100": {
        "$value": "#B9FFC0",
        "$type": "color"
      },
      "300": {
        "$value": "#09E549",
        "$type": "color"
      },
      "500": {
        "$value": "#05B839",
        "$type": "color"
      },
      "700": {
        "$value": "#038E2A",
        "$type": "color"
      },
      "900": {
        "$value": "#01661C",
        "$type": "color"
      }
    },
    "navy": {
      "100": {
        "$value": "#D8DFF4",
        "$type": "color"
      },
      "200": {
        "$value": "#A6B6E6",
        "$type": "color"
      },
      "400": {
        "$value": "#7290D8",
        "$type": "color"
      },
      "700": {
        "$value": "#32497B",
        "$type": "color"
      },
      "900": {
        "$value": "#1B2A4A",
        "$type": "color",
        "$description": "Deep Navy — secondary brand accent; used for credibility-forward sections (case studies, methodology)."
      }
    },
    "coral": {
      "100": {
        "$value": "#FFEDEA",
        "$type": "color"
      },
      "200": {
        "$value": "#FEC4BC",
        "$type": "color"
      },
      "300": {
        "$value": "#FE8A72",
        "$type": "color"
      },
      "500": {
        "$value": "#FF6D4E",
        "$type": "color"
      },
      "700": {
        "$value": "#E8540A",
        "$type": "color",
        "$description": "Coral — warning/highlight; used for citations, awards, and 'attention' moments."
      }
    },
    "alias": {
      "$description": "Semantic aliases — components MUST reference these, not raw scale values. This is what allows palette changes without touching components.",
      "bg_surface": {
        "$value": "{color.base.white}",
        "$type": "color"
      },
      "bg_surface_alt": {
        "$value": "{color.gray.100}",
        "$type": "color"
      },
      "bg_inverse": {
        "$value": "{color.base.black}",
        "$type": "color"
      },
      "bg_brand": {
        "$value": "{color.base.black}",
        "$type": "color",
        "$description": "Brand surface — matches the logo's circle background on light surfaces."
      },
      "text_primary": {
        "$value": "{color.base.black}",
        "$type": "color"
      },
      "text_secondary": {
        "$value": "{color.gray.500}",
        "$type": "color"
      },
      "text_muted": {
        "$value": "{color.gray.200}",
        "$type": "color"
      },
      "text_inverse": {
        "$value": "{color.base.white}",
        "$type": "color"
      },
      "text_accent": {
        "$value": "{color.blue.700}",
        "$type": "color"
      },
      "link": {
        "$value": "{color.blue.700}",
        "$type": "color"
      },
      "link_hover": {
        "$value": "{color.blue.500}",
        "$type": "color"
      },
      "border_default": {
        "$value": "{color.gray.100}",
        "$type": "color"
      },
      "border_strong": {
        "$value": "{color.gray.200}",
        "$type": "color"
      },
      "focus_ring": {
        "$value": "{color.blue.700}",
        "$type": "color"
      },
      "success": {
        "$value": "{color.green.500}",
        "$type": "color"
      },
      "warning": {
        "$value": "{color.coral.500}",
        "$type": "color"
      },
      "error": {
        "$value": "{color.coral.700}",
        "$type": "color"
      },
      "highlight": {
        "$value": "{color.coral.700}",
        "$type": "color"
      },
      "deep": {
        "$value": "{color.navy.900}",
        "$type": "color"
      },
      "whatsapp": {
        "$value": "#25D366",
        "$type": "color",
        "$description": "Official WhatsApp brand green; used ONLY on the WhatsApp contact button."
      }
    },
    "dark_mode_alias": {
      "$description": "Overrides applied under prefers-color-scheme: dark. The brand inverts cleanly because the logo has both light and dark surface variants.",
      "bg_surface": {
        "$value": "{color.base.black}",
        "$type": "color"
      },
      "bg_surface_alt": {
        "$value": "{color.gray.800}",
        "$type": "color"
      },
      "bg_inverse": {
        "$value": "{color.base.white}",
        "$type": "color"
      },
      "bg_brand": {
        "$value": "{color.base.white}",
        "$type": "color",
        "$description": "On dark, the logo's circle inverts to white — and brand-colored surfaces follow suit."
      },
      "text_primary": {
        "$value": "{color.base.white}",
        "$type": "color"
      },
      "text_secondary": {
        "$value": "{color.gray.100}",
        "$type": "color"
      },
      "text_muted": {
        "$value": "{color.gray.500}",
        "$type": "color"
      },
      "text_accent": {
        "$value": "{color.blue.300}",
        "$type": "color"
      },
      "link": {
        "$value": "{color.blue.300}",
        "$type": "color"
      },
      "border_default": {
        "$value": "{color.gray.800}",
        "$type": "color"
      }
    }
  },
  "gradient": {
    "$description": "The Wishfy AI Sparkle gradient — the distinctive 4-point star inside the logo mark. It is the brand's most recognizable visual moment. Use sparingly: in the logo, in hero accent moments, in 'AI-powered' callouts. Never on plain text body content.",
    "sparkle": {
      "$value": "linear-gradient(180deg, #5BC5C5 0%, #B69BFF 28%, #FF6D4E 55%, #6161FE 100%)",
      "$type": "gradient",
      "$description": "Top→bottom: teal → lavender → coral → electric blue. Approximated from the official logo SVG; replace exact stops if Waseem provides finalized values.",
      "stops": [
        {
          "position": "0%",
          "color": "#5BC5C5"
        },
        {
          "position": "28%",
          "color": "#B69BFF"
        },
        {
          "position": "55%",
          "color": "#FF6D4E"
        },
        {
          "position": "100%",
          "color": "#6161FE"
        }
      ]
    },
    "sparkle_radial": {
      "$value": "radial-gradient(circle at 50% 30%, #5BC5C5, #FF6D4E 60%, #6161FE)",
      "$type": "gradient",
      "$description": "Radial variant for use in OG images and decorative blooms."
    }
  },
  "typography": {
    "$description": "Direct from Brand Guidelines '26 — Mona Sans primary, Plus Jakarta Sans secondary. Both are free, open-source (SIL OFL), and self-hostable. Mona Sans is a GitHub-published variable font; Plus Jakarta Sans is on Google Fonts.",
    "family": {
      "display": {
        "$value": "'Mona Sans', system-ui, -apple-system, sans-serif",
        "$type": "fontFamily",
        "$description": "Primary display + UI font."
      },
      "body": {
        "$value": "'Mona Sans', system-ui, -apple-system, sans-serif",
        "$type": "fontFamily",
        "$description": "Body text uses the same family as display per the brand kit's typography spec."
      },
      "secondary": {
        "$value": "'Plus Jakarta Sans', system-ui, sans-serif",
        "$type": "fontFamily",
        "$description": "Secondary face for variety in marketing material; not used on the website's main UI."
      },
      "mono": {
        "$value": "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
        "$type": "fontFamily",
        "$description": "Code blocks and data tables; not in the brand kit but needed for technical content."
      }
    },
    "weight": {
      "regular": {
        "$value": 400,
        "$type": "fontWeight"
      },
      "medium": {
        "$value": 500,
        "$type": "fontWeight"
      },
      "semibold": {
        "$value": 600,
        "$type": "fontWeight"
      },
      "bold": {
        "$value": 700,
        "$type": "fontWeight"
      },
      "extra": {
        "$value": 800,
        "$type": "fontWeight",
        "$description": "Reserved for the wordmark and major display headlines."
      }
    },
    "scale": {
      "$description": "Type scale defined in the brand kit as px values. All sizes share line-height 150% and letter-spacing 0% per the spec. Use the semantic alias below in code; raw values are for reference.",
      "display_xl": {
        "$value": "110px",
        "$type": "dimension",
        "$description": "Hero display only"
      },
      "h1": {
        "$value": "80px",
        "$type": "dimension"
      },
      "h2": {
        "$value": "38px",
        "$type": "dimension"
      },
      "h3": {
        "$value": "30px",
        "$type": "dimension"
      },
      "h4": {
        "$value": "24px",
        "$type": "dimension"
      },
      "h5": {
        "$value": "21px",
        "$type": "dimension"
      },
      "h6": {
        "$value": "19px",
        "$type": "dimension"
      },
      "body_xl": {
        "$value": "24px",
        "$type": "dimension"
      },
      "body_lg": {
        "$value": "17px",
        "$type": "dimension"
      },
      "body": {
        "$value": "15px",
        "$type": "dimension",
        "$description": "Body Main — the canonical body size. Note: 15px (not 16px) per the brand kit."
      },
      "body_sm": {
        "$value": "13px",
        "$type": "dimension"
      },
      "footnote": {
        "$value": "12px",
        "$type": "dimension"
      }
    },
    "leading": {
      "$description": "The brand kit specifies 150% across the board. Display-size leading is tightened slightly only when accessibility/composition require it.",
      "tight": {
        "$value": 1.2,
        "$type": "number",
        "$description": "Optional: for display 60px+ only, where 1.5 would feel airy."
      },
      "normal": {
        "$value": 1.5,
        "$type": "number",
        "$description": "Default per brand kit."
      },
      "relaxed": {
        "$value": 1.6,
        "$type": "number",
        "$description": "Long-form prose only."
      }
    },
    "tracking": {
      "$description": "Brand kit specifies 0% (normal) on all sizes. Wider tracking reserved for uppercase eyebrows.",
      "normal": {
        "$value": "0",
        "$type": "string"
      },
      "wider": {
        "$value": "0.05em",
        "$type": "string",
        "$description": "For uppercase labels, eyebrows, badges."
      }
    },
    "responsive_clamp": {
      "$description": "Suggested fluid-type clamps so display sizes scale gracefully on small screens without breaking the type scale. Engineer implements these in tokens.css.",
      "display_xl_clamp": "clamp(48px, 8vw, 110px)",
      "h1_clamp": "clamp(40px, 6vw, 80px)",
      "h2_clamp": "clamp(28px, 3.2vw, 38px)"
    }
  },
  "space": {
    "0": {
      "$value": "0",
      "$type": "dimension"
    },
    "1": {
      "$value": "4px",
      "$type": "dimension"
    },
    "2": {
      "$value": "8px",
      "$type": "dimension"
    },
    "3": {
      "$value": "12px",
      "$type": "dimension"
    },
    "4": {
      "$value": "16px",
      "$type": "dimension"
    },
    "5": {
      "$value": "20px",
      "$type": "dimension"
    },
    "6": {
      "$value": "24px",
      "$type": "dimension"
    },
    "8": {
      "$value": "32px",
      "$type": "dimension"
    },
    "10": {
      "$value": "40px",
      "$type": "dimension"
    },
    "12": {
      "$value": "48px",
      "$type": "dimension"
    },
    "16": {
      "$value": "64px",
      "$type": "dimension"
    },
    "20": {
      "$value": "80px",
      "$type": "dimension"
    },
    "24": {
      "$value": "96px",
      "$type": "dimension"
    },
    "32": {
      "$value": "128px",
      "$type": "dimension"
    },
    "40": {
      "$value": "160px",
      "$type": "dimension"
    },
    "$description": "4px base unit; brand kit doesn't specify spacing but our system uses a standard 4-px grid."
  },
  "radius": {
    "none": {
      "$value": "0",
      "$type": "dimension"
    },
    "sm": {
      "$value": "6px",
      "$type": "dimension",
      "$description": "Inputs, small chips"
    },
    "md": {
      "$value": "10px",
      "$type": "dimension"
    },
    "lg": {
      "$value": "16px",
      "$type": "dimension",
      "$description": "Cards"
    },
    "xl": {
      "$value": "24px",
      "$type": "dimension",
      "$description": "Hero containers, large surfaces"
    },
    "full": {
      "$value": "9999px",
      "$type": "dimension",
      "$description": "Pills, avatars, the logo's circle"
    }
  },
  "shadow": {
    "none": {
      "$value": "none",
      "$type": "shadow"
    },
    "card": {
      "$value": "0 1px 2px rgba(0,0,0,0.04)",
      "$type": "shadow"
    },
    "modal": {
      "$value": "0 8px 24px rgba(0,0,0,0.08)",
      "$type": "shadow"
    },
    "focus": {
      "$value": "0 0 0 3px rgba(35, 35, 254, 0.35)",
      "$type": "shadow",
      "$description": "Sync hex with focus_ring color alias (#2323FE @ 35% opacity)."
    }
  },
  "motion": {
    "duration": {
      "instant": {
        "$value": "0ms",
        "$type": "duration"
      },
      "fast": {
        "$value": "120ms",
        "$type": "duration"
      },
      "default": {
        "$value": "200ms",
        "$type": "duration"
      },
      "slow": {
        "$value": "400ms",
        "$type": "duration"
      }
    },
    "easing": {
      "default": {
        "$value": "cubic-bezier(0.2, 0, 0, 1)",
        "$type": "cubicBezier"
      },
      "in": {
        "$value": "cubic-bezier(0.4, 0, 1, 1)",
        "$type": "cubicBezier"
      },
      "out": {
        "$value": "cubic-bezier(0, 0, 0.2, 1)",
        "$type": "cubicBezier"
      },
      "in_out": {
        "$value": "cubic-bezier(0.4, 0, 0.2, 1)",
        "$type": "cubicBezier"
      }
    }
  },
  "layout": {
    "container_max": {
      "$value": "1280px",
      "$type": "dimension"
    },
    "container_max_prose": {
      "$value": "720px",
      "$type": "dimension",
      "$description": "Article/blog max-width for readability with 15px body."
    },
    "container_pad_mobile": {
      "$value": "16px",
      "$type": "dimension"
    },
    "container_pad_desktop": {
      "$value": "24px",
      "$type": "dimension"
    },
    "header_height": {
      "$value": "72px",
      "$type": "dimension"
    },
    "footer_min_height": {
      "$value": "240px",
      "$type": "dimension"
    }
  },
  "breakpoint": {
    "sm": {
      "$value": "640px",
      "$type": "dimension"
    },
    "md": {
      "$value": "768px",
      "$type": "dimension"
    },
    "lg": {
      "$value": "1024px",
      "$type": "dimension"
    },
    "xl": {
      "$value": "1280px",
      "$type": "dimension"
    },
    "2xl": {
      "$value": "1536px",
      "$type": "dimension"
    }
  },
  "logo": {
    "$description": "Real logo assets, provided by Waseem. Source-of-truth files live in 00-Company/brand-assets/. The Senior Engineer copies these to public/brand/ in the web repo and references them via these tokens.",
    "files": {
      "master_pdf": {
        "$value": "00-Company/brand-assets/logo-master.pdf",
        "$type": "asset",
        "$description": "Original vector source. Convert to optimized SVG for the web."
      },
      "mark_svg": {
        "$value": "00-Company/brand-assets/logo-mark.svg",
        "$type": "asset",
        "$description": "Mark only (wo script + rainbow sparkle). Transparent background. Recolor the script via currentColor at integration time."
      },
      "wordmark_light": {
        "$value": "00-Company/brand-assets/logo-wordmark-on-light.svg",
        "$type": "asset",
        "$description": "Full logo for use on white/light surfaces — black circle + white script + 'Wishfy' wordmark in black italic."
      },
      "wordmark_dark": {
        "$value": "00-Company/brand-assets/logo-wordmark-on-dark.svg",
        "$type": "asset",
        "$description": "Full logo for use on black/dark surfaces — white circle + black script + 'Wishfy' wordmark in white italic."
      },
      "mark_png": {
        "$value": "00-Company/brand-assets/logo-mark-only.png",
        "$type": "asset",
        "$description": "Raster fallback at 2160×2160 — for Apple touch icon, social profile pics, contexts where SVG isn't supported."
      }
    },
    "web_paths": {
      "$description": "Once the SVGs are copied into the web repo, they live at these public paths. Astro components read these via tokens.logo.web_paths.*",
      "mark": {
        "$value": "/brand/logo-mark.svg",
        "$type": "asset"
      },
      "wordmark_light": {
        "$value": "/brand/logo-wordmark-light.svg",
        "$type": "asset"
      },
      "wordmark_dark": {
        "$value": "/brand/logo-wordmark-dark.svg",
        "$type": "asset"
      },
      "favicon": {
        "$value": "/favicon.svg",
        "$type": "asset"
      },
      "apple_touch": {
        "$value": "/apple-touch-icon.png",
        "$type": "asset"
      },
      "og_default": {
        "$value": "/og/og-default.png",
        "$type": "asset"
      }
    },
    "rules": {
      "min_size_digital_px": {
        "$value": 32,
        "$type": "number",
        "$description": "Minimum height of the mark in digital surfaces. Wordmark min 24px height."
      },
      "min_size_print_mm": {
        "$value": 16,
        "$type": "number"
      },
      "clear_space_rule": {
        "$value": "Minimum clear space on all sides equals the diameter of the small interior sparkle inside the 'w' loop.",
        "$type": "string"
      },
      "preferred_variant_on_light": {
        "$value": "wordmark_light",
        "$type": "string"
      },
      "preferred_variant_on_dark": {
        "$value": "wordmark_dark",
        "$type": "string"
      },
      "sparkle_must_render_gradient": {
        "$value": true,
        "$type": "boolean",
        "$description": "The sparkle's rainbow gradient is part of the brand's identity. Do not flatten it to a solid color outside of micro sizes (<32px) or single-color print."
      }
    }
  },
  "social": {
    "$description": "Per the brand kit's Social Icons page — these are the surfaces we may use icons for. Real handles/URLs filled in when Waseem provides them; until then placeholders.",
    "linkedin": {
      "$value": "TODO_WASEEM_PROVIDE",
      "$type": "url"
    },
    "x": {
      "$value": "TODO_WASEEM_PROVIDE",
      "$type": "url"
    },
    "github": {
      "$value": "TODO_WASEEM_PROVIDE",
      "$type": "url"
    },
    "instagram": {
      "$value": "TODO_WASEEM_PROVIDE",
      "$type": "url"
    },
    "youtube": {
      "$value": "TODO_WASEEM_PROVIDE",
      "$type": "url"
    },
    "telegram": {
      "$value": "TODO_WASEEM_PROVIDE",
      "$type": "url"
    }
  }
} as const;

export type Tokens = typeof tokens;
export default tokens;
