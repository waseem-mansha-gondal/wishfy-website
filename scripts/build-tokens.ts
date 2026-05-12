/**
 * Token build pipeline: Brand-Tokens.json → generated artifacts
 *
 * Outputs:
 *   src/styles/tokens.css      — CSS custom properties (light + dark)
 *   src/lib/tokens.ts          — typed TS export
 *   tailwind.config.ts         — Tailwind theme extension
 *   public/brand/tokens.json   — published copy for /brand page
 *
 * Run: pnpm tokens:build
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const COMPANY_ROOT = resolve(
  ROOT,
  '../../../.paperclip/instances/default/companies/408f79ba-0309-4659-a5b2-490f81c492e5'
);

const tokensPath = resolve(COMPANY_ROOT, 'brand/Brand-Tokens.json');
const tokens = JSON.parse(readFileSync(tokensPath, 'utf-8'));

/** Resolve {color.blue.700} references within the token tree */
function resolveRef(value: string, tree: Record<string, unknown>): string {
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value;
  const path = match[1]!.split('.');
  let current: unknown = tree;
  for (const key of path) {
    if (current && typeof current === 'object') {
      current = (current as Record<string, unknown>)[key];
    } else {
      return value; // unresolvable, return as-is
    }
  }
  if (current && typeof current === 'object' && '$value' in (current as object)) {
    const resolved = (current as Record<string, string>)['$value']!;
    return resolveRef(resolved, tree); // recurse for chained refs
  }
  return value;
}

const c = tokens.color;
const t = tokens.typography;
const s = tokens.space;
const r = tokens.radius;
const sh = tokens.shadow;
const m = tokens.motion;
const l = tokens.layout;
const g = tokens.gradient;

function res(val: string): string {
  return resolveRef(val, tokens);
}

// ─── tokens.css ──────────────────────────────────────────────────────────────
const tokensCss = `/* AUTO-GENERATED — do not edit manually. Run: pnpm tokens:build */
/* Source: Brand-Tokens.json v${tokens['$version']} */

@import './fonts.css';

:root {
  /* === Base colors === */
  --color-black: ${c.base.black.$value};
  --color-white: ${c.base.white.$value};

  /* === Gray scale === */
  --color-gray-100: ${c.gray[100].$value};
  --color-gray-200: ${c.gray[200].$value};
  --color-gray-500: ${c.gray[500].$value};
  --color-gray-800: ${c.gray[800].$value};
  --color-gray-900: ${c.gray[900].$value};

  /* === Blue (Electric Blue) === */
  --color-blue-100: ${c.blue[100].$value};
  --color-blue-200: ${c.blue[200].$value};
  --color-blue-300: ${c.blue[300].$value};
  --color-blue-500: ${c.blue[500].$value};
  --color-blue-700: ${c.blue[700].$value};

  /* === Green === */
  --color-green-100: ${c.green[100].$value};
  --color-green-300: ${c.green[300].$value};
  --color-green-500: ${c.green[500].$value};
  --color-green-700: ${c.green[700].$value};
  --color-green-900: ${c.green[900].$value};

  /* === Navy === */
  --color-navy-100: ${c.navy[100].$value};
  --color-navy-200: ${c.navy[200].$value};
  --color-navy-400: ${c.navy[400].$value};
  --color-navy-700: ${c.navy[700].$value};
  --color-navy-900: ${c.navy[900].$value};

  /* === Coral === */
  --color-coral-100: ${c.coral[100].$value};
  --color-coral-200: ${c.coral[200].$value};
  --color-coral-300: ${c.coral[300].$value};
  --color-coral-500: ${c.coral[500].$value};
  --color-coral-700: ${c.coral[700].$value};

  /* === Semantic aliases === */
  --bg-surface: ${res(c.alias.bg_surface.$value)};
  --bg-surface-alt: ${res(c.alias.bg_surface_alt.$value)};
  --bg-inverse: ${res(c.alias.bg_inverse.$value)};
  --bg-brand: ${res(c.alias.bg_brand.$value)};
  --text-primary: ${res(c.alias.text_primary.$value)};
  --text-secondary: ${res(c.alias.text_secondary.$value)};
  --text-muted: ${res(c.alias.text_muted.$value)};
  --text-inverse: ${res(c.alias.text_inverse.$value)};
  --text-accent: ${res(c.alias.text_accent.$value)};
  --link: ${res(c.alias.link.$value)};
  --link-hover: ${res(c.alias.link_hover.$value)};
  --border-default: ${res(c.alias.border_default.$value)};
  --border-strong: ${res(c.alias.border_strong.$value)};
  --focus-ring: ${res(c.alias.focus_ring.$value)};
  --success: ${res(c.alias.success.$value)};
  --warning: ${res(c.alias.warning.$value)};
  --error: ${res(c.alias.error.$value)};
  --highlight: ${res(c.alias.highlight.$value)};
  --deep: ${res(c.alias.deep.$value)};
  --color-whatsapp: ${c.alias.whatsapp.$value};

  /* === Gradients === */
  --gradient-sparkle: ${g.sparkle.$value};
  --gradient-sparkle-radial: ${g.sparkle_radial.$value};

  /* === Typography === */
  --font-display: ${t.family.display.$value};
  --font-body: ${t.family.body.$value};
  --font-secondary: ${t.family.secondary.$value};
  --font-mono: ${t.family.mono.$value};

  --fw-regular: ${t.weight.regular.$value};
  --fw-medium: ${t.weight.medium.$value};
  --fw-semibold: ${t.weight.semibold.$value};
  --fw-bold: ${t.weight.bold.$value};
  --fw-extra: ${t.weight.extra.$value};

  --text-display-xl: clamp(48px, 8vw, ${t.scale.display_xl.$value});
  --text-h1: clamp(40px, 6vw, ${t.scale.h1.$value});
  --text-h2: clamp(28px, 3.2vw, ${t.scale.h2.$value});
  --text-h3: ${t.scale.h3.$value};
  --text-h4: ${t.scale.h4.$value};
  --text-h5: ${t.scale.h5.$value};
  --text-h6: ${t.scale.h6.$value};
  --text-body-xl: ${t.scale.body_xl.$value};
  --text-body-lg: ${t.scale.body_lg.$value};
  --text-body: ${t.scale.body.$value};
  --text-body-sm: ${t.scale.body_sm.$value};
  --text-footnote: ${t.scale.footnote.$value};

  --leading-tight: ${t.leading.tight.$value};
  --leading-normal: ${t.leading.normal.$value};
  --leading-relaxed: ${t.leading.relaxed.$value};
  --tracking-normal: ${t.tracking.normal.$value};
  --tracking-wider: ${t.tracking.wider.$value};

  /* === Spacing === */
  --space-0: ${s[0].$value};
  --space-1: ${s[1].$value};
  --space-2: ${s[2].$value};
  --space-3: ${s[3].$value};
  --space-4: ${s[4].$value};
  --space-5: ${s[5].$value};
  --space-6: ${s[6].$value};
  --space-8: ${s[8].$value};
  --space-10: ${s[10].$value};
  --space-12: ${s[12].$value};
  --space-16: ${s[16].$value};
  --space-20: ${s[20].$value};
  --space-24: ${s[24].$value};
  --space-32: ${s[32].$value};
  --space-40: ${s[40].$value};

  /* === Border radius === */
  --radius-none: ${r.none.$value};
  --radius-sm: ${r.sm.$value};
  --radius-md: ${r.md.$value};
  --radius-lg: ${r.lg.$value};
  --radius-xl: ${r.xl.$value};
  --radius-full: ${r.full.$value};

  /* === Shadows === */
  --shadow-none: ${sh.none.$value};
  --shadow-card: ${sh.card.$value};
  --shadow-modal: ${sh.modal.$value};
  --shadow-focus: ${sh.focus.$value};

  /* === Motion === */
  --motion-instant: ${m.duration.instant.$value};
  --motion-fast: ${m.duration.fast.$value};
  --motion-default: ${m.duration.default.$value};
  --motion-slow: ${m.duration.slow.$value};
  --easing-default: ${m.easing.default.$value};
  --easing-in: ${m.easing.in.$value};
  --easing-out: ${m.easing.out.$value};
  --easing-in-out: ${m.easing.in_out.$value};

  /* === Layout === */
  --container-max: ${l.container_max.$value};
  --container-prose: ${l.container_max_prose.$value};
  --container-pad-mobile: ${l.container_pad_mobile.$value};
  --container-pad-desktop: ${l.container_pad_desktop.$value};
  --header-height: ${l.header_height.$value};
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-surface: ${res(c.dark_mode_alias.bg_surface.$value)};
    --bg-surface-alt: ${res(c.dark_mode_alias.bg_surface_alt.$value)};
    --bg-inverse: ${res(c.dark_mode_alias.bg_inverse.$value)};
    --bg-brand: ${res(c.dark_mode_alias.bg_brand.$value)};
    --text-primary: ${res(c.dark_mode_alias.text_primary.$value)};
    --text-secondary: ${res(c.dark_mode_alias.text_secondary.$value)};
    --text-muted: ${res(c.dark_mode_alias.text_muted.$value)};
    --text-accent: ${res(c.dark_mode_alias.text_accent.$value)};
    --link: ${res(c.dark_mode_alias.link.$value)};
    --border-default: ${res(c.dark_mode_alias.border_default.$value)};
  }
}
`;

// ─── tokens.ts ───────────────────────────────────────────────────────────────
const tokensTs = `// AUTO-GENERATED — do not edit manually. Run: pnpm tokens:build
// Source: Brand-Tokens.json v${tokens['$version']}

export const tokens = {
  brand: {
    name: ${JSON.stringify(tokens.brand.name.$value)},
    domain: ${JSON.stringify(tokens.brand.domain.$value)},
    taglinePrimary: ${JSON.stringify(tokens.brand.tagline_primary.$value)},
    taglineSecondary: ${JSON.stringify(tokens.brand.tagline_secondary.$value)},
    contactEmail: ${JSON.stringify(tokens.brand.contact_email.$value)},
    whatsappNumber: ${JSON.stringify(tokens.brand.whatsapp_number.$value)},
    whatsappNumberDisplay: ${JSON.stringify(tokens.brand.whatsapp_number_display.$value)},
    whatsappNumberSchema: ${JSON.stringify(tokens.brand.whatsapp_number_schema.$value)},
    whatsappDefaultMessage: ${JSON.stringify(tokens.brand.whatsapp_default_message.$value)},
  },
  social: {
    linkedin: ${JSON.stringify(tokens.social.linkedin.$value)},
    x: ${JSON.stringify(tokens.social.x.$value)},
    github: ${JSON.stringify(tokens.social.github.$value)},
    instagram: ${JSON.stringify(tokens.social.instagram.$value)},
    youtube: ${JSON.stringify(tokens.social.youtube.$value)},
    telegram: ${JSON.stringify(tokens.social.telegram.$value)},
  },
  logo: {
    mark: ${JSON.stringify(tokens.logo.web_paths.mark.$value)},
    wordmarkLight: ${JSON.stringify(tokens.logo.web_paths.wordmark_light.$value)},
    wordmarkDark: ${JSON.stringify(tokens.logo.web_paths.wordmark_dark.$value)},
  },
} as const;

export type Tokens = typeof tokens;
`;

// ─── tailwind.config.ts ──────────────────────────────────────────────────────
const tailwindConfig = `// AUTO-GENERATED — do not edit manually. Run: pnpm tokens:build
// Source: Brand-Tokens.json v${tokens['$version']}
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '${c.base.black.$value}',
        white: '${c.base.white.$value}',
        blue: {
          100: '${c.blue[100].$value}',
          200: '${c.blue[200].$value}',
          300: '${c.blue[300].$value}',
          500: '${c.blue[500].$value}',
          700: '${c.blue[700].$value}',
        },
        coral: {
          100: '${c.coral[100].$value}',
          200: '${c.coral[200].$value}',
          300: '${c.coral[300].$value}',
          500: '${c.coral[500].$value}',
          700: '${c.coral[700].$value}',
        },
        navy: {
          100: '${c.navy[100].$value}',
          200: '${c.navy[200].$value}',
          400: '${c.navy[400].$value}',
          700: '${c.navy[700].$value}',
          900: '${c.navy[900].$value}',
        },
        green: {
          100: '${c.green[100].$value}',
          300: '${c.green[300].$value}',
          500: '${c.green[500].$value}',
          700: '${c.green[700].$value}',
          900: '${c.green[900].$value}',
        },
        gray: {
          100: '${c.gray[100].$value}',
          200: '${c.gray[200].$value}',
          500: '${c.gray[500].$value}',
          800: '${c.gray[800].$value}',
          900: '${c.gray[900].$value}',
        },
        whatsapp: '${c.alias.whatsapp.$value}',
      },
      fontFamily: {
        display: ${JSON.stringify(tokens.typography.family.display.$value.split(', '))},
        body: ${JSON.stringify(tokens.typography.family.body.$value.split(', '))},
        mono: ${JSON.stringify(tokens.typography.family.mono.$value.split(', '))},
      },
      fontSize: {
        'display-xl': ['clamp(48px,8vw,110px)', { lineHeight: '1.05' }],
        h1: ['clamp(40px,6vw,80px)', { lineHeight: '1.1' }],
        h2: ['clamp(28px,3.2vw,38px)', { lineHeight: '1.2' }],
        h3: ['30px', { lineHeight: '1.3' }],
        h4: ['24px', { lineHeight: '1.4' }],
        h5: ['21px', { lineHeight: '1.4' }],
        h6: ['19px', { lineHeight: '1.4' }],
        'body-xl': ['24px', { lineHeight: '1.5' }],
        'body-lg': ['17px', { lineHeight: '1.5' }],
        body: ['15px', { lineHeight: '1.5' }],
        'body-sm': ['13px', { lineHeight: '1.5' }],
        footnote: ['12px', { lineHeight: '1.5' }],
      },
      spacing: {
        1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px',
        6: '24px', 8: '32px', 10: '40px', 12: '48px', 16: '64px',
        20: '80px', 24: '96px', 32: '128px', 40: '160px',
      },
      borderRadius: {
        none: '0', sm: '6px', md: '10px', lg: '16px', xl: '24px', full: '9999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04)',
        modal: '0 8px 24px rgba(0,0,0,0.08)',
        focus: '0 0 0 3px rgba(35, 35, 254, 0.35)',
      },
      backgroundImage: {
        sparkle: 'linear-gradient(180deg, #5BC5C5 0%, #B69BFF 28%, #FF6D4E 55%, #6161FE 100%)',
        'sparkle-radial': 'radial-gradient(circle at 50% 30%, #5BC5C5, #FF6D4E 60%, #6161FE)',
      },
      maxWidth: {
        container: '1280px',
        prose: '720px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        fast: '120ms',
        slow: '400ms',
      },
    },
  },
  plugins: [],
};

export default config;
`;

// ─── Write files ─────────────────────────────────────────────────────────────
function write(path: string, content: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf-8');
  console.log(`✓ ${path.replace(ROOT + '/', '')}`);
}

write(resolve(ROOT, 'src/styles/tokens.css'), tokensCss);
write(resolve(ROOT, 'src/lib/tokens.ts'), tokensTs);
write(resolve(ROOT, 'tailwind.config.ts'), tailwindConfig);
write(resolve(ROOT, 'public/brand/tokens.json'), JSON.stringify(tokens, null, 2));

console.log('\nToken build complete.');
