import { SITE } from "../consts";

/**
 * JSON-LD schema generators. Centralised so the shape stays consistent
 * across every page and the schema-validation step (manual today, CI later)
 * has a single source to inspect.
 *
 * Pass the output of these into BaseHead via the `jsonLd` prop, which renders
 * `<script type="application/ld+json">` for each entry.
 */

interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbSchema(siteUrl: URL, crumbs: Crumb[]) {
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

export function organizationSchema(siteUrl: URL) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.organization,
    url: siteUrl.toString(),
    email: SITE.contactEmail,
  };
}

export function websiteSchema(siteUrl: URL) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: siteUrl.toString(),
  };
}

export function articleSchema(opts: {
  siteUrl: URL;
  url: string;
  title: string;
  description: string;
  datePublished: Date;
  dateModified?: Date;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished.toISOString(),
    dateModified: (opts.dateModified ?? opts.datePublished).toISOString(),
    author: {
      "@type": "Person",
      name: opts.author ?? SITE.organization,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.organization,
    },
    mainEntityOfPage: new URL(opts.url, opts.siteUrl).toString(),
  };
}

export function serviceSchema(opts: {
  siteUrl: URL;
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: new URL(opts.url, opts.siteUrl).toString(),
    provider: {
      "@type": "Organization",
      name: SITE.organization,
    },
  };
}
