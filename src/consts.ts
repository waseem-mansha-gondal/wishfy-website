/*
 * Per-client constants.
 *
 * This file is the entry point a new engineer touches to re-skin the template
 * for a client. Everything that is "branding" or "structural identity" of the
 * site lives here — meta tags, sitemap, JSON-LD, header nav, and footer all
 * read off these values.
 *
 * Anything that is page content (long-form copy, blog posts, case studies)
 * lives in `src/content/` so the Content Strategist can edit it without
 * touching code.
 */

export const SITE = {
  /** Display name. Shown in title bar, footer, and JSON-LD. */
  name: "Hello Client",

  /** Short tagline. One short sentence. */
  tagline: "A website that gets out of the way and gets work done.",

  /** Default meta description (≤160 chars). */
  description:
    "Hello Client — a starter site built on the Wishfy website stack.",

  /** Legal entity name used in JSON-LD Organization + footer copyright. */
  organization: "Hello Client, Inc.",

  /** ISO 639-1 language code. Drives <html lang> and og:locale. */
  locale: "en",

  /** Brand chrome color for browser UI. */
  themeColor: "#0f172a",

  /** Twitter/X handle, including the leading @. Falsey to disable. */
  twitterHandle: "@helloclient",

  /** Contact email surfaced on /contact and in JSON-LD. */
  contactEmail: "hello@example.com",
} as const;

/**
 * Primary navigation. Rendered in <Header>. Keep to 5–6 items max for
 * readability. Order matters — `href` is matched literally for "current page"
 * highlighting (trailing slashes are normalised).
 */
export const NAV: { label: string; href: string }[] = [
  { label: "Services", href: "/services/" },
  { label: "Case studies", href: "/case-studies/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

/**
 * Footer link groups. Each group renders as a column.
 */
export const FOOTER_GROUPS: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Work",
    links: [
      { label: "Services", href: "/services/" },
      { label: "Case studies", href: "/case-studies/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
      { label: "Blog", href: "/blog/" },
    ],
  },
  {
    title: "Legal",
    links: [{ label: "Sitemap", href: "/sitemap-index.xml" }],
  },
];
