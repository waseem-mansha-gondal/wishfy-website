/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        'electric-blue': {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#1D4ED8',
        },
        surface: {
          dark: '#111111',
          card: '#1A1A1A',
          light: '#F8F8F8',
        },
      },
      fontFamily: {
        sans: ['Mona Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-xl': ['110px', { lineHeight: '1.1' }],
        'h1': ['80px', { lineHeight: '1.1' }],
        'h2': ['38px', { lineHeight: '1.3' }],
        'h3': ['30px', { lineHeight: '1.3' }],
        'h4': ['24px', { lineHeight: '1.5' }],
        'h5': ['21px', { lineHeight: '1.5' }],
        'h6': ['19px', { lineHeight: '1.5' }],
        'body-xl': ['24px', { lineHeight: '1.5' }],
        'body-lg': ['17px', { lineHeight: '1.5' }],
        'body': ['15px', { lineHeight: '1.5' }],
        'body-sm': ['13px', { lineHeight: '1.5' }],
        'footnote': ['12px', { lineHeight: '1.5' }],
      },
      borderRadius: {
        sm: '6px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)',
        modal: '0 8px 32px rgba(0,0,0,0.5)',
      },
      maxWidth: {
        container: '1280px',
        prose: '720px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
