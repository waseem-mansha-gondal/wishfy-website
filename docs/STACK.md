# Stack

Source of truth for the wishfy.ai v1 build stack. This document mirrors the
locked decision in [WIS-24 → `decision`](/WIS/issues/WIS-24#document-decision)
(§2 Stack, §5 Hosting). Any deviation requires a new ADR plus CEO approval —
do not change versions or vendors here without updating WIS-24 first.

## Pinned major versions

The CEO guardrail on WIS-24 explicitly pins these majors. Lockfile + CI
upgrade gate land in the scaffolding child issue (next sibling under
WIS-2); this file is the human-readable lock.

| Component        | Pinned major  | Range we accept  | Why                                                                          |
| ---------------- | ------------- | ---------------- | ---------------------------------------------------------------------------- |
| `astro`          | **5.x**       | `^5`             | Static output, content collections, zero-JS-by-default — locked on WIS-24 §2 |
| `tailwindcss`    | **4.x**       | `^4`             | New engine, native CSS variables — locked on WIS-24 §2                       |
| `typescript`     | **5.x**       | `^5`             | Strict mode required by Senior Engineer quality bar                          |
| `pnpm`           | **9.x**       | `9.0.0` (exact)  | Pinned via `packageManager` in `package.json`                                |
| `node`           | **22.x LTS**  | `^22`            | Vercel Hobby + local dev parity                                              |

Major-version bumps for `astro`, `tailwindcss`, or `pnpm` MUST be opened
as their own ticket with an ADR — they are not bundled into feature work.

## Stack at a glance

- **Framework:** Astro 5 + TypeScript (strict). Static output (`output: 'static'`).
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`.
- **Content:** MDX in repo via Astro content collections (per-locale dirs;
  `translation_key` frontmatter links siblings).
- **CMS:** Keystatic (primary, git-based, free) at `admin.wishfy.ai`. Decap
  CMS is the documented fallback. Sanity is the named migration path if we
  outgrow git-based.
- **Forms:** Server endpoint → Resend → CEO inbox.
- **Spam protection:** Cloudflare Turnstile.
- **Analytics:** Plausible (cookie-less).
- **Monitoring:** Sentry.
- **Hosting:** Vercel (Hobby tier) — preview deploys per PR. Production
  deploys disabled on the project until separate CEO approval per WIS-28.
- **DNS / CDN:** Cloudflare zone for `wishfy.ai`. Production cutover is a
  separate gated change.
- **Repo:** `wishfyai/wishfy-website` (this repo).

## Internationalisation

Subdirectories on a single `.ai` domain — `/en /nl /de /fr`. Hreflang
reciprocity is enforced as a CI gate. See WIS-24 §i18n.

## Performance budgets (launch gates)

These are the "must hold or fail CI" numbers from WIS-24:

- Lighthouse ≥ 98 in all four categories
- LCP ≤ 1.8 s
- INP ≤ 100 ms
- CLS ≤ 0.05
- JS ≤ 30 KB per route
- CSS ≤ 20 KB per route

## Cost ceiling

Until the first paying client, total recurring spend on this stack is
capped at **≤ $10/month** (Plausible at $9 is the only paid line). Each
upgrade requires a fresh CEO spend approval.

## Cross-references

- Stack decision: [WIS-24 → `decision`](/WIS/issues/WIS-24#document-decision)
- Service-line parent: [WIS-2](/WIS/issues/WIS-2)
- This issue: [WIS-28](/WIS/issues/WIS-28)
