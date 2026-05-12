/*
 * Content collections — the "CMS hooks" for the template.
 *
 * Three collections ship with the template:
 *   - `blog`         → `src/content/blog/*.md` or `*.mdx`
 *   - `case-studies` → `src/content/case-studies/*.md` or `*.mdx`
 *   - `services`     → `src/content/services/*.md` or `*.mdx`
 *
 * The Content Strategist edits content by adding/editing files in those
 * folders. Schemas below define which frontmatter fields are required and
 * what shape they take. Astro type-checks every file against the schema at
 * build time, so a missing field fails the build with a clear error message
 * pointing at the file and field.
 */

import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default("Wishfy"),
      tags: z.array(z.string()).default([]),
      hero: image().optional(),
      heroAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const caseStudies = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      industry: z.string().optional(),
      summary: z.string(),
      pubDate: z.coerce.date(),
      services: z.array(z.string()).default([]),
      metrics: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .default([]),
      hero: image().optional(),
      heroAlt: z.string().optional(),
      url: z.string().url().optional(),
      draft: z.boolean().default(false),
    }),
});

const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** Sort order on /services/ — lower = earlier. */
    order: z.number().default(100),
    /** Optional bullet list shown on the services index. */
    highlights: z.array(z.string()).default([]),
    /** Optional emoji or short icon glyph for the index card. */
    icon: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  "case-studies": caseStudies,
  services,
};
