# Wishfy Website Stack — `hello-client`

This repo is the **baseline website build stack** Wishfy reuses for every
client engagement, plus a deployable `hello-client` template that proves the
stack works end-to-end.

If you're starting a new client site, **fork or copy this repo**, change the
constants in `src/consts.ts`, point a Cloudflare Pages project at it, and
ship.

---

## The stack

| Layer        | Pick                                  | Why                                                                                                                                                                            |
| ------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework    | **Astro 5**                           | Content-first, ships zero JS by default → excellent Core Web Vitals and SEO. MDX/Markdown native. Great for marketing sites, which is what client engagements look like.       |
| Hosting      | **Cloudflare Pages**                  | Generous free tier (500 builds/mo, unlimited bandwidth), global edge CDN, Git or direct-upload deploys, instant preview URLs per PR. No vendor-aggressive pricing surprises.   |
| CI           | **GitHub Actions**                    | Industry default. Free for the volumes we'll see. The Cloudflare `wrangler-action` is officially maintained.                                                                   |
| Analytics    | **Cloudflare Web Analytics**          | Privacy-friendly, no cookies → no consent banner needed in most jurisdictions. Free. One token, drop in. Clients who want richer dashboards can layer Plausible/PostHog later. |
| SEO baseline | **`@astrojs/sitemap` + manual meta**  | Auto-generated sitemap, canonical URLs, Open Graph + Twitter cards, JSON-LD `Organization`, `robots.txt` pointing at the sitemap. Semantic HTML by default.                    |
| Language     | **TypeScript (strict)**               | Astro's strict tsconfig preset.                                                                                                                                                |
| Node         | **20 LTS** (see `.nvmrc`)             | Matches Cloudflare Pages' supported runtime.                                                                                                                                   |

### Trade-offs I considered

- **Astro vs. Next.js.** Next.js is the obvious default, but most client work
  here is marketing / content / lead-gen sites — Astro produces faster
  pages, simpler mental model (no client/server component split), better
  out-of-the-box SEO, and is still well-documented and popular. If a future
  engagement needs a real app (auth'd dashboards, SSR-heavy logic), we'll
  swap to Next.js for that engagement specifically.
- **Astro vs. SvelteKit.** Both are excellent. Astro wins because it's
  framework-agnostic (you can drop React/Vue/Svelte components into the same
  page) and is purpose-built for content sites.
- **Cloudflare Pages vs. Vercel.** Vercel has the better DX, but pricing
  scales aggressively with bandwidth and seats once you have multiple
  clients. Cloudflare Pages is "boring enough" and the cost story stays
  predictable as we add clients. Migrating to Vercel later is trivial.
- **Cloudflare Pages vs. Netlify.** Comparable, but Cloudflare's edge
  network is broader and we already need a Cloudflare account for analytics.
- **Cloudflare Web Analytics vs. Plausible/Fathom/GA4.** GA4 is rejected on
  privacy + consent-banner grounds. Plausible/Fathom are excellent but
  paid-per-site. CF Web Analytics is free and meets the bar for a baseline.
  Per-client we can add Plausible if they want exportable dashboards.
- **No CSS framework.** Tailwind is a strong default but it's a tooling
  choice that earns its keep on bigger sites. For a baseline / hello site,
  vanilla CSS keeps the surface area small. Add Tailwind per client if
  needed.

### What's deliberately NOT here

- No headless CMS yet. The default authoring surface is Markdown/MDX in
  `src/content/` (see [Content & CMS hooks](#content--cms-hooks) below) —
  the Content Strategist can edit copy without engineering changes. If a
  client wants a hosted CMS later we bolt on Sanity, Contentful, or Decap.
- No A/B testing or feature flags.
- No e-commerce.

---

## Deploy in under 30 minutes

You need: a Cloudflare account, a GitHub account, and Node 20+.

### 1. Local sanity check (≈3 min)

```bash
nvm use            # or asdf, or just have Node 20 installed
npm ci
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
```

### 2. Create the Cloudflare Pages project (≈5 min)

1. Sign in to Cloudflare → **Workers & Pages** → **Create application** →
   **Pages** → **Connect to Git**.
2. Pick this repo. For the build settings, choose:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave blank (or the subdirectory if monorepo'd)
3. Save and let the first deploy run. You'll get a `*.pages.dev` URL.

> **Alternative (recommended for us):** use the GitHub Actions workflow
> below instead of Cloudflare's built-in CI. It's faster, gives us a single
> CI surface across clients, and lets us run checks before deploy.

### 3. Wire up GitHub Actions deploys (≈10 min)

The workflow in `.github/workflows/deploy.yml` builds on every push/PR and
deploys to Cloudflare Pages on push to `main`.

In **your GitHub repo settings**:

**Secrets** (Settings → Secrets and variables → Actions → Secrets):

- `CLOUDFLARE_API_TOKEN` — create at Cloudflare → My Profile → API Tokens →
  use the **"Edit Cloudflare Workers"** template, scope it to the account.
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare dashboard → Workers & Pages → right
  sidebar.
- `PUBLIC_CF_ANALYTICS_TOKEN` — Cloudflare → Analytics → Web Analytics →
  add a site → copy the token from the JS snippet (the token only, not the
  full script).

**Variables** (same screen, Variables tab):

- `SITE_URL` — the canonical URL for this site (e.g. `https://acme.com`).
- `CF_PAGES_PROJECT` — the Pages project name you picked in step 2.

Push to `main` → workflow runs → site is live. Subsequent deploys are
typically <1 minute.

### 4. Per-client customization checklist (fork → live in ≤ 1 hour)

- [ ] Update `src/consts.ts`:
      - `SITE` — name, tagline, description, organization, locale,
        themeColor, twitterHandle, contactEmail.
      - `NAV` — top nav items.
      - `FOOTER_GROUPS` — footer link columns.
- [ ] Re-skin tokens in `src/styles/tokens.css` if the client has a brand
      palette (set `--color-accent`, `--font-sans`, etc. — every component
      consumes tokens, no other CSS needs to change).
- [ ] Replace `public/favicon.svg`.
- [ ] Replace `public/og-default.png` with a 1200×630 OG card (currently
      not committed — add one for the client).
- [ ] Swap seed content in `src/content/`:
      - `services/*.md` — your client's offers.
      - `blog/*.md(x)` — at least one launch post.
      - `case-studies/*.md(x)` — proof points if available.
- [ ] Update copy on `src/pages/about.astro` and `src/pages/contact.astro`.
- [ ] Set `SITE_URL` GitHub variable to the client's canonical URL.
- [ ] Add the client's custom domain in Cloudflare Pages → Custom domains.
- [ ] Confirm `robots.txt` and `/sitemap-index.xml` resolve after deploy.

---

## Content & CMS hooks

The template uses **Astro content collections** as its CMS surface — Markdown
and MDX files in `src/content/`, validated against a Zod schema in
`src/content/config.ts`. This is the lowest-friction CMS we can offer: the
Content Strategist edits files in GitHub (or a local clone) and a push
triggers a deploy. No external service, no API keys, no rate limits.

Three collections are wired up:

| Collection      | Path                        | Used by                                     |
| --------------- | --------------------------- | ------------------------------------------- |
| `services`      | `src/content/services/`     | `/services/`, `/services/[slug]/`, homepage |
| `blog`          | `src/content/blog/`         | `/blog/`, `/blog/[slug]/`, homepage         |
| `case-studies`  | `src/content/case-studies/` | `/case-studies/`, `/case-studies/[slug]/`, homepage |

Each collection has typed frontmatter; the build fails fast if a required
field is missing. The Content Strategist gets a quick-reference cheatsheet
in **`src/content/README.md`** (frontmatter shape per collection, draft
flag, ordering rules, tips).

If a client later wants a hosted CMS, we can layer Sanity, Contentful, or
Decap on top of the same collections without changing the page templates.

---

## Layout primitives

These compose every page; everything else is content.

| Component                          | Purpose                                                     |
| ---------------------------------- | ----------------------------------------------------------- |
| `layouts/BaseLayout.astro`         | HTML shell — head, skip-link, header, main, footer.         |
| `layouts/ProseLayout.astro`        | BaseLayout + a constrained `.prose` article container.      |
| `components/Container.astro`       | Width-constrained wrapper (`default` or `prose`).           |
| `components/Section.astro`         | Vertical rhythm + optional tonal background.                |
| `components/Header.astro`          | Sticky header with brand + `NAV` from `consts.ts`.          |
| `components/Footer.astro`          | Brand + `FOOTER_GROUPS` columns + meta row.                 |
| `components/Hero.astro`            | Eyebrow / title / lede + slot for CTA.                      |
| `components/Button.astro`          | `primary` / `ghost`, auto-detects external links.           |
| `components/BaseHead.astro`        | All `<head>` content — meta, OG, JSON-LD, analytics beacon. |
| `lib/schema.ts`                    | JSON-LD generators (Organization, WebSite, Breadcrumb, Article, Service). |
| `lib/format.ts`                    | `formatDate`, `isoDate` — locale-aware via `SITE.locale`.   |

Tokens live in `src/styles/tokens.css`. Reset / base element styles in
`src/styles/base.css`. Dark mode flips automatically via
`prefers-color-scheme`.

---

## Repo layout

```
.
├── .github/workflows/deploy.yml   # CI: build + deploy to Cloudflare Pages
├── astro.config.mjs               # Astro config + @astrojs/mdx + sitemap
├── public/                        # Static assets served as-is
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/                # Layout primitives (see table above)
│   ├── content/                   # CMS surface — Markdown/MDX + schema
│   │   ├── config.ts              # Zod schemas for each collection
│   │   ├── README.md              # Content Strategist cheatsheet
│   │   ├── blog/
│   │   ├── case-studies/
│   │   └── services/
│   ├── layouts/                   # BaseLayout + ProseLayout
│   ├── lib/                       # schema.ts, format.ts
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── blog/                  # Index + [...slug]
│   │   ├── case-studies/          # Index + [...slug]
│   │   └── services/              # Index + [...slug]
│   ├── styles/                    # tokens.css, base.css
│   ├── consts.ts                  # Per-client constants (NAV, FOOTER, SITE)
│   └── env.d.ts
├── .env.example
├── .nvmrc
├── package.json
└── tsconfig.json
```

---

## Owner & escalation

Owned by Wishfy's Founding Engineer. Stack changes that affect multiple
clients (framework swap, hosting migration, analytics replacement) require
CEO sign-off — see [WIS-4](../WIS-4) for the original decision record.
