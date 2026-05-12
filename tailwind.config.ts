// AUTO-GENERATED — do not edit manually. Run: pnpm tokens:build
// Source: Brand-Tokens.json v2.0.0
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        blue: {
          100: '#E8E8FF',
          200: '#BCBCFF',
          300: '#8F8FFF',
          500: '#6161FE',
          700: '#2323FE',
        },
        coral: {
          100: '#FFEDEA',
          200: '#FEC4BC',
          300: '#FE8A72',
          500: '#FF6D4E',
          700: '#E8540A',
        },
        navy: {
          100: '#D8DFF4',
          200: '#A6B6E6',
          400: '#7290D8',
          700: '#32497B',
          900: '#1B2A4A',
        },
        green: {
          100: '#B9FFC0',
          300: '#09E549',
          500: '#05B839',
          700: '#038E2A',
          900: '#01661C',
        },
        gray: {
          100: '#D6D6D6',
          200: '#AFAFAF',
          500: '#656565',
          800: '#242424',
          900: '#000000',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ["'Mona Sans'","system-ui","-apple-system","sans-serif"],
        body: ["'Mona Sans'","system-ui","-apple-system","sans-serif"],
        mono: ["'JetBrains Mono'","ui-monospace","'SF Mono'","Menlo","monospace"],
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
