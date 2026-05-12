---
title: "How we ship a marketing site in 30 minutes"
description: "The four-step routine we use to take a new client engagement from fork to live URL in under half an hour."
pubDate: 2026-05-08
author: "Wishfy"
tags: ["workflow", "deploy"]
---

The Wishfy website stack is built around one constraint: a fresh client
engagement should be live on a real URL the same afternoon we kick off,
without sacrificing performance or accessibility.

## The routine

1. **Fork** this template repo into the client's GitHub.
2. **Re-skin** by editing `src/consts.ts` (name, tagline, nav) and
   `src/styles/tokens.css` (colours, type).
3. **Connect** Cloudflare Pages → set the GitHub Actions secrets.
4. **Push** to `main` → live in under a minute.

We've done this enough times that the steps fit on a sticky note. Most of
the half-hour is waiting on DNS and the Cloudflare account paperwork.

## What we *don't* do at this stage

- No bespoke design system. The default tokens look intentional and modern.
- No CMS. Content collections in `src/content/` are enough until the client
  asks for a richer authoring tool.
- No analytics dashboard customisation. Cloudflare Web Analytics covers
  the basics; we'll bolt on Plausible later if needed.

This is the boring version of "move fast and ship". It works.
