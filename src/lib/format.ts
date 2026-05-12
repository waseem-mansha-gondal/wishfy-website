import { SITE } from "../consts";

/**
 * Format a date for human display, using the site locale.
 *
 * Returns a stable string like "May 12, 2026". Used in blog posts and case
 * studies. Re-export rather than inline so the date format is consistent
 * site-wide.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(SITE.locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/** ISO 8601 date for `<time datetime>` and JSON-LD. */
export function isoDate(date: Date): string {
  return date.toISOString();
}
