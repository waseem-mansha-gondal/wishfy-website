import { SITE } from "../consts";

/** Sitewide Organization schema. */
export function organizationSchema(siteUrl: URL) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": new URL("/#organization", siteUrl).toString(),
    name: SITE.organization,
    url: siteUrl.toString(),
    email: `mailto:${SITE.contactEmail}`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.contactEmail,
        availableLanguage: ["English", "Dutch", "German", "French"],
        telephone: `+${SITE.whatsappNumber}`,
      },
    ],
  };
}

/** Sitewide WebSite schema. */
export function websiteSchema(siteUrl: URL) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": new URL("/#website", siteUrl).toString(),
    url: siteUrl.toString(),
    name: SITE.name,
    inLanguage: SITE.locale,
    publisher: { "@id": new URL("/#organization", siteUrl).toString() },
  };
}

export function breadcrumbSchema(
  siteUrl: URL,
  crumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: new URL(c.url, siteUrl).toString(),
    })),
  };
}

export function serviceSchema(opts: {
  siteUrl: URL;
  name: string;
  description: string;
  url: string;
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: new URL(opts.url, opts.siteUrl).toString(),
    provider: { "@id": new URL("/#organization", opts.siteUrl).toString() },
    inLanguage: SITE.locale,
    ...(opts.priceRange
      ? { offers: { "@type": "Offer", priceCurrency: "USD", price: opts.priceRange } }
      : {}),
  };
}

export function faqSchema(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
