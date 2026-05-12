// Site constants for wishfy.ai (internal marketing site v1 — WIS-8).
// All branding/meta/JSON-LD/nav/footer reads from this file.
export const SITE = {
  name: "Wishfy",
  tagline: "Where ideas meet AI precision.",
  description:
    "Wishfy makes your business the obvious answer in Google, ChatGPT, Claude, and Perplexity. Get found. Get cited. Get chosen.",
  organization: "Wishfy",
  locale: "en",
  themeColor: "#2323FE",
  twitterHandle: "",
  contactEmail: "info@wishfy.ai",
  whatsappNumber: "31644095332",
} as const;

export const NAV: { label: string; href: string }[] = [
  { label: "Services", href: "/services/" },
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const FOOTER_GROUPS: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Work",
    links: [
      { label: "Services", href: "/services/" },
      { label: "Case studies", href: "/work/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    title: "Legal",
    links: [{ label: "Sitemap", href: "/sitemap-index.xml" }],
  },
];
