/**
 * i18n helpers for wishfy.ai (WIS-14).
 *
 * The strategy and acceptance criteria live in `context/i18n-Strategy.md`.
 * Everything routing-related (URLs, hreflang, language switcher, html lang)
 * reads from this module so that adding a new locale tomorrow is a one-file
 * change: drop a new JSON into `src/locales/`, append the code to `LOCALES`,
 * and the rest follows.
 */
import enStrings from "../locales/en.json";
import nlStrings from "../locales/nl.json";
import deStrings from "../locales/de.json";
import frStrings from "../locales/fr.json";

/** Locales we ship in v1.0. Order = display order in the language switcher. */
export const LOCALES = ["en", "nl", "de", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

/** The locale we fall back to when nothing else matches. */
export const DEFAULT_LOCALE: Locale = "en";

/** Cookie used to remember the visitor's manual language pick (no tracking). */
export const LANG_COOKIE = "wishfy_lang";

/** One year, in seconds. Long enough that returning visitors keep their pick. */
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// JSON imports come in as wider `string` types; cast through `unknown` so the
// strict shape contract is enforced at the consumer boundary only.
const STRINGS: Record<Locale, LocaleStrings> = {
  en: enStrings as unknown as LocaleStrings,
  nl: nlStrings as unknown as LocaleStrings,
  de: deStrings as unknown as LocaleStrings,
  fr: frStrings as unknown as LocaleStrings,
};

/** Typed shape of a locale JSON. Mirrors `src/locales/en.json` exactly. */
export interface LocaleStrings {
  locale: Locale;
  name: string;
  shortName: string;
  direction: "ltr" | "rtl";
  htmlLang: string;
  ogLocale: string;
  schemaInLanguage: string;
  ui: Record<string, string>;
  meta: Record<string, string>;
  router: Record<string, string>;
}

/** Type guard. Returns true if `value` is a supported locale code. */
export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}

/** Return strongly-typed UI strings for a locale. */
export function getStrings(locale: Locale): LocaleStrings {
  return STRINGS[locale];
}

/**
 * Pull the locale out of a request path.
 *
 * Examples:
 *   "/en/"               -> "en"
 *   "/nl/services/seo/"  -> "nl"
 *   "/about/"            -> null  (no prefix; root router will redirect)
 *   "/xx/foo/"           -> null  (unsupported)
 */
export function getLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.replace(/^\/+/, "").split("/", 1)[0] ?? "";
  return isLocale(segment) ? segment : null;
}

/**
 * Strip the locale segment from a path, returning everything after it.
 *
 * "/en/services/seo/" -> "/services/seo/"
 * "/en/"              -> "/"
 * "/about/"           -> "/about/" (no locale segment to strip)
 */
export function stripLocaleFromPath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (!locale) return pathname;
  const stripped = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");
  return stripped === "" ? "/" : stripped;
}

/**
 * Build a localized path for a given locale + sub-path.
 *
 * localizedPath("nl", "/services/seo/") -> "/nl/services/seo/"
 * localizedPath("en", "/")              -> "/en/"
 * localizedPath("de", "")               -> "/de/"
 *
 * Sub-paths can be passed with or without a leading slash. Trailing slash is
 * preserved (matches astro.config `trailingSlash: 'always'` when configured).
 */
export function localizedPath(locale: Locale, subPath = "/"): string {
  const normalized = subPath.startsWith("/") ? subPath : `/${subPath}`;
  if (normalized === "/") return `/${locale}/`;
  return `/${locale}${normalized}`;
}

/**
 * Build the absolute URL for a localized path under the site origin.
 * Used in hreflang generation and structured-data `@id` fields.
 */
export function absoluteUrl(
  siteUrl: URL | string,
  locale: Locale,
  subPath = "/",
): string {
  const base = typeof siteUrl === "string" ? new URL(siteUrl) : siteUrl;
  return new URL(localizedPath(locale, subPath), base).toString();
}

/**
 * Generate the full set of hreflang link descriptors for a translation_key.
 *
 * `translations` maps the locales that have a real translated equivalent to
 * the localized URL sub-path *without* the locale prefix (e.g. /services/seo/).
 * Locales not in `translations` are deliberately omitted — per
 * i18n-Strategy.md §3 we do NOT emit hreflang pointing at a fallback English
 * page for languages that don't have a real translation.
 *
 * The returned list always includes an `x-default` pointing at the English
 * equivalent if English is present, otherwise the first available locale.
 */
export function buildHreflangs(
  siteUrl: URL | string,
  translations: Partial<Record<Locale, string>>,
): Array<{ hreflang: string; href: string }> {
  const entries: Array<{ hreflang: string; href: string }> = [];

  for (const locale of LOCALES) {
    const sub = translations[locale];
    if (!sub) continue;
    entries.push({
      hreflang: getStrings(locale).htmlLang,
      href: absoluteUrl(siteUrl, locale, sub),
    });
  }

  const xDefaultSub =
    translations[DEFAULT_LOCALE] ??
    translations[LOCALES.find((l) => translations[l]) ?? DEFAULT_LOCALE];
  if (xDefaultSub) {
    const xDefaultLocale = translations[DEFAULT_LOCALE]
      ? DEFAULT_LOCALE
      : (LOCALES.find((l) => translations[l]) ?? DEFAULT_LOCALE);
    entries.push({
      hreflang: "x-default",
      href: absoluteUrl(siteUrl, xDefaultLocale, xDefaultSub),
    });
  }

  return entries;
}

/**
 * Data model for the language switcher UI.
 *
 * Returns one entry per supported locale with:
 *  - `locale`: the code (use as `aria-current` key)
 *  - `name`: native-language full name ("Nederlands")
 *  - `shortName`: switcher label ("NL")
 *  - `href`: the equivalent page in that locale (falls back to /<locale>/ if
 *     the page doesn't have a real translation in that locale)
 *  - `isCurrent`: whether this is the locale of the current page
 */
export function getSwitcherLinks(
  currentLocale: Locale,
  translations: Partial<Record<Locale, string>>,
): Array<{
  locale: Locale;
  name: string;
  shortName: string;
  href: string;
  isCurrent: boolean;
}> {
  return LOCALES.map((locale) => {
    const sub = translations[locale];
    const href = sub ? localizedPath(locale, sub) : localizedPath(locale, "/");
    const strings = getStrings(locale);
    return {
      locale,
      name: strings.name,
      shortName: strings.shortName,
      href,
      isCurrent: locale === currentLocale,
    };
  });
}

/**
 * Resolve a preferred locale from an Accept-Language header value.
 *
 * Returns `null` (not `DEFAULT_LOCALE`) when no listed language matches a
 * supported locale, so callers can decide between "use default" and "this
 * user explicitly asked for something we don't have — show language picker".
 *
 * Example: "nl-NL,nl;q=0.9,en;q=0.8" -> "nl"
 */
export function resolveLocaleFromAcceptLanguage(
  header: string | null | undefined,
): Locale | null {
  if (!header) return null;
  const candidates = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number(qParam.split("=")[1]) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of candidates) {
    const primary = tag.split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return null;
}

/**
 * Stable mapping of locale -> CSS `dir` attribute. RTL locales are not in v1,
 * but components should already read from this helper so adding Arabic later
 * is a one-line change in en.json/nl.json/... metadata.
 */
export function getDirection(locale: Locale): "ltr" | "rtl" {
  return getStrings(locale).direction;
}
