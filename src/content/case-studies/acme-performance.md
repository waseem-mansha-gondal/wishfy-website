---
title: "Acme: cut homepage load time by 63%"
client: "Acme Corp"
industry: "B2B SaaS"
summary: "Replaced a heavyweight React SPA marketing site with an Astro build on the Wishfy stack — saving the marketing team three days a month and unlocking better SEO."
pubDate: 2026-03-15
services: ["Website build", "Performance audit"]
metrics:
  - { label: "Lighthouse Performance", value: "98" }
  - { label: "Time to Interactive", value: "−63%" }
  - { label: "Org bandwidth bill", value: "−40%" }
url: "https://example.com"
---

> Sample case study to demonstrate the layout. Replace with a real one
> before launch.

## The problem

Acme's old marketing site was a 2.1MB React SPA. Every blog post took an
engineer to publish, the homepage's Largest Contentful Paint sat at
3.4 seconds, and the CFO had started asking pointed questions about the
infra bill.

## What we did

- Rebuilt on the Wishfy website stack: Astro 5 + Cloudflare Pages.
- Migrated 47 blog posts into content collections so marketing can publish
  themselves.
- Replaced bundled JS with progressive enhancement only where it earned
  its weight.
- Added schema-rich pages so Acme's product pages started showing up in
  AI Overviews within a fortnight.

## The result

- Lighthouse Performance went from 41 → 98 on the homepage.
- The marketing team published 6 posts in the first month without
  pinging an engineer.
- Page bandwidth dropped by 40% across the site.
