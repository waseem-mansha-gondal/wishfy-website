// Schema.org JSON-LD helpers used across pages.
// See Website-Brief.md §6 for the canonical templates.

import { SITE } from './consts';

type Crumb = { name: string; url: string };

export function breadcrumbSchema(siteUrl: URL, crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.url, siteUrl).toString(),
    })),
  };
}

export function serviceSchema(input: {
  siteUrl: URL;
  name: string;
  description: string;
  url: string;
  priceRange: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: new URL(input.url, input.siteUrl).toString(),
    provider: { '@id': new URL('/#organization', input.siteUrl).toString() },
    areaServed: 'Worldwide',
    offers: {
      '@type': 'Offer',
      price: input.priceRange,
      priceCurrency: 'USD',
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function organizationSchema(siteUrl: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': new URL('/#organization', siteUrl).toString(),
    name: SITE.name,
    url: siteUrl.toString(),
    email: SITE.contactEmail,
    description: SITE.description,
  };
}

export function websiteSchema(siteUrl: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': new URL('/#website', siteUrl).toString(),
    name: SITE.name,
    url: siteUrl.toString(),
    publisher: { '@id': new URL('/#organization', siteUrl).toString() },
    inLanguage: SITE.locale,
  };
}
