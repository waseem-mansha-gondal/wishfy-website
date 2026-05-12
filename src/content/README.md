# `src/content/` — content for non-engineers

This folder is the editable surface of the template. Three collections live
here. Everything is plain Markdown (`.md`) or MDX (`.mdx`) with YAML
frontmatter. Edit files in your editor of choice (VS Code, Obsidian) or via
GitHub's web UI — no engineering required.

The shape of each frontmatter block is enforced by `src/content/config.ts`;
if a required field is missing, the next build will fail with a clear error.

## Collections

### `blog/` — long-form posts

```yaml
---
title: "How to ship a marketing site in 30 minutes"
description: "Short summary used in meta tags and the blog index."
pubDate: 2026-05-01
updatedDate: 2026-05-05    # optional
author: "Wishfy"            # optional, defaults to "Wishfy"
tags: ["astro", "deploy"]   # optional
draft: false                # optional, hides from index when true
heroAlt: "Alt text for hero image" # optional, required if `hero` set
---
```

Filename → URL: `src/content/blog/hello.md` → `/blog/hello/`.

### `case-studies/` — client work writeups

```yaml
---
title: "Acme: cut load time 4×"
client: "Acme Corp"
industry: "B2B SaaS"           # optional
summary: "One-paragraph result the visitor cares about."
pubDate: 2026-03-15
services: ["Performance", "SEO"]  # optional, used as chips
metrics:                          # optional, rendered as a stats strip
  - { label: "Lighthouse", value: "98" }
  - { label: "TTI", value: "−63%" }
url: "https://acme.com"           # optional, the live site
draft: false
---
```

Filename → URL: `src/content/case-studies/acme.md` → `/case-studies/acme/`.

### `services/` — what you offer

```yaml
---
title: "Performance audit"
summary: "Short paragraph for the index card."
order: 10                     # lower = earlier in the index
highlights:                   # optional, bullets on the index card
  - "Lighthouse, CWV, INP"
  - "Concrete remediation list"
icon: "⚡"                    # optional, emoji used on the card
draft: false
---
```

Filename → URL: `src/content/services/audit.md` → `/services/audit/`.

## Workflow

1. Create or edit a `.md` / `.mdx` file inside the relevant folder.
2. Fill in the frontmatter (required fields above).
3. Write the body in Markdown or MDX.
4. Commit & push — preview deploys for every PR, prod on merge to `main`.

## Tips

- Use MDX (`.mdx`) only when you need to embed a custom component. Plain
  Markdown is faster and easier to edit.
- Set `draft: true` to stage a post without publishing it.
- Hero images go alongside the content file (e.g. next to `hello.md`) and
  are referenced from frontmatter as `hero: ./hero.png`. Astro optimises
  them automatically.
