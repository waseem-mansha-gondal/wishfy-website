#!/usr/bin/env tsx
/**
 * Build the Wishfy design-token pipeline.
 *
 * Reads `Brand-Tokens.json` (from the company brand directory, the single
 * source of truth) and emits four artifacts the website consumes:
 *
 *   1. src/styles/tokens.css        — CSS custom properties (light + dark) +
 *                                     a Tailwind v4 @theme block that exposes
 *                                     scales as utilities, incl. `bg-sparkle`.
 *   2. tailwind.config.ts           — Tailwind theme override mirroring the
 *                                     scales (typed reference / v3-compat).
 *   3. src/lib/tokens.ts            — Typed TS export for runtime consumption
 *                                     (e.g. the WhatsApp button reading the
 *                                     contact number).
 *   4. public/brand/tokens.json     — Resolved, published copy for the public
 *                                     /brand page and any external consumer.
 *
 * Pass `--check` (CI mode): re-build to a temp buffer, diff against the
 * on-disk artifacts, exit non-zero if any drift is detected. This catches
 * hand-edits to `tokens.css` and friends.
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");

/**
 * Source of truth lives in the company brand directory (outside the web repo)
 * because it is shared across every Wishfy artifact. The path is intentionally
 * resolved relative to this script's location so the pipeline is portable
 * across local dev, CI, and Vercel build environments — set
 * `WISHFY_BRAND_TOKENS` to override.
 */
function resolveBrandTokensPath(): string {
  const fromEnv = process.env.WISHFY_BRAND_TOKENS;
  if (fromEnv) return resolve(fromEnv);

  // Walk upward looking for a sibling `companies/<id>/brand/Brand-Tokens.json`.
  // The Paperclip layout puts the web repo at
  // `instances/<i>/projects/<p>/<task>/_default/` (optionally inside a
  // `_wisNN/` worktree) and the company at
  // `instances/<i>/companies/<id>/brand/Brand-Tokens.json`.
  let dir = repoRoot;
  for (let i = 0; i < 10; i++) {
    const candidate = join(dir, "brand", "Brand-Tokens.json");
    if (existsSync(candidate)) return candidate;
    const companiesDir = join(dir, "companies");
    if (existsSync(companiesDir)) {
      for (const entry of readdirSync(companiesDir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const cand = join(
          companiesDir,
          entry.name,
          "brand",
          "Brand-Tokens.json",
        );
        if (existsSync(cand)) return cand;
      }
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(
    "Could not locate Brand-Tokens.json. Set WISHFY_BRAND_TOKENS to its absolute path.",
  );
}

// ---------------------------------------------------------------------------
// Token tree types + alias resolution
// ---------------------------------------------------------------------------

/**
 * Design Tokens Community Group format leaf. Every concrete value carries a
 * `$value` and a `$type`; the value may be an alias of the form `{a.b.c}`.
 */
interface TokenLeaf {
  $value: string | number | boolean;
  $type: string;
  $description?: string;
  // Some leaves (e.g. gradient.sparkle) carry extra fields like `stops`.
  [extra: string]: unknown;
}

function isLeaf(node: unknown): node is TokenLeaf {
  return (
    typeof node === "object" &&
    node !== null &&
    "$value" in (node as Record<string, unknown>) &&
    "$type" in (node as Record<string, unknown>)
  );
}

/** Read a dotted path (`color.alias.bg_surface`) from the root tree. */
function getPath(root: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, root);
}

/**
 * Resolve a single value, following `{path}` aliases up to a depth limit.
 * Aliases that resolve to another leaf inherit its `$value`.
 */
function resolveValue(
  raw: string | number | boolean,
  root: Record<string, unknown>,
  depth = 0,
): string | number | boolean {
  if (depth > 8) {
    throw new Error(`Alias cycle (or excessive depth) at value: ${String(raw)}`);
  }
  if (typeof raw !== "string") return raw;
  const m = raw.match(/^\{(.+)\}$/);
  if (!m) return raw;
  const target = getPath(root, m[1]);
  if (!isLeaf(target)) {
    throw new Error(`Unresolved alias: ${raw} (path ${m[1]} is not a leaf)`);
  }
  return resolveValue(target.$value, root, depth + 1);
}

// ---------------------------------------------------------------------------
// Naming helpers
// ---------------------------------------------------------------------------

function kebab(input: string): string {
  return input
    .replace(/_/g, "-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * CSS custom property name for a token path. Aliases drop the
 * `color.alias.` prefix so they read as the semantic role
 * (e.g. `--bg-surface`, `--text-primary`).
 */
function cssVarName(path: string[]): string {
  const [head, ...rest] = path;

  if (head === "color" && rest[0] === "alias") {
    return "--" + kebab(rest.slice(1).join("-"));
  }
  if (head === "color" && rest[0] === "dark_mode_alias") {
    return "--" + kebab(rest.slice(1).join("-"));
  }
  if (head === "typography" && rest[0] === "scale") {
    return "--text-" + kebab(rest.slice(1).join("-"));
  }
  if (head === "typography" && rest[0] === "family") {
    return "--font-" + kebab(rest.slice(1).join("-"));
  }
  if (head === "typography" && rest[0] === "weight") {
    return "--font-weight-" + kebab(rest.slice(1).join("-"));
  }
  if (head === "typography" && rest[0] === "leading") {
    return "--leading-" + kebab(rest.slice(1).join("-"));
  }
  if (head === "typography" && rest[0] === "tracking") {
    return "--tracking-" + kebab(rest.slice(1).join("-"));
  }
  if (head === "motion" && rest[0] === "duration") {
    return "--duration-" + kebab(rest.slice(1).join("-"));
  }
  if (head === "motion" && rest[0] === "easing") {
    return "--ease-" + kebab(rest.slice(1).join("-"));
  }
  if (head === "layout") {
    return "--layout-" + kebab(rest.join("-"));
  }
  if (head === "breakpoint") {
    return "--breakpoint-" + kebab(rest.join("-"));
  }
  // color.<scale>.<step>, gradient.<name>, space.<n>, radius.<n>, shadow.<n>
  return "--" + kebab([head, ...rest].join("-"));
}

// ---------------------------------------------------------------------------
// Walk the tree, collecting resolved leaves
// ---------------------------------------------------------------------------

interface ResolvedLeaf {
  path: string[];
  cssVar: string;
  value: string | number | boolean;
  $type: string;
  raw: TokenLeaf;
}

function walk(
  node: unknown,
  path: string[],
  root: Record<string, unknown>,
  out: ResolvedLeaf[],
): void {
  if (isLeaf(node)) {
    out.push({
      path,
      cssVar: cssVarName(path),
      value: resolveValue(node.$value, root),
      $type: node.$type,
      raw: node,
    });
    return;
  }
  if (typeof node !== "object" || node === null) return;
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("$")) continue;
    walk(v, [...path, k], root, out);
  }
}

// ---------------------------------------------------------------------------
// Artifact builders
// ---------------------------------------------------------------------------

interface BuildOutput {
  tokensCss: string;
  tailwindConfigTs: string;
  tokensTs: string;
  publicTokensJson: string;
}

function build(): BuildOutput {
  const tokensPath = resolveBrandTokensPath();
  const raw = JSON.parse(readFileSync(tokensPath, "utf8")) as Record<
    string,
    unknown
  >;

  const leaves: ResolvedLeaf[] = [];
  walk(raw, [], raw, leaves);

  // Partition for CSS emission:
  //   - dark-mode aliases go to a @media block
  //   - visual tokens (color, gradient, typography, space, radius, shadow,
  //     motion, layout, breakpoint) go to :root
  //   - metadata tokens (brand strings, logo asset paths, social URLs) are
  //     NOT emitted as CSS — they live in tokens.ts / public/brand/tokens.json
  //     for runtime consumption. Embedding strings like the WhatsApp number
  //     or an apostrophe-bearing tagline as raw CSS custom property values
  //     breaks the CSS parser; quoting them would make `var()` use awkward.
  const VISUAL_ROOTS = new Set([
    "color",
    "gradient",
    "typography",
    "space",
    "radius",
    "shadow",
    "motion",
    "layout",
    "breakpoint",
  ]);
  const lightLeaves: ResolvedLeaf[] = [];
  const darkLeaves: ResolvedLeaf[] = [];
  for (const leaf of leaves) {
    if (!VISUAL_ROOTS.has(leaf.path[0])) continue;
    if (leaf.path[0] === "color" && leaf.path[1] === "dark_mode_alias") {
      darkLeaves.push(leaf);
    } else {
      lightLeaves.push(leaf);
    }
  }

  // Subset that should flow into Tailwind utilities (colors, fonts, spacing,
  // radii, shadows, breakpoints, gradients, motion). Pure brand strings like
  // `whatsapp_number` are excluded — they are not visual tokens.
  const themeLeaves = lightLeaves.filter((l) => {
    if (l.path[0] === "color" && l.$type === "color") return true;
    if (l.path[0] === "gradient") return true;
    if (l.path[0] === "space") return true;
    if (l.path[0] === "radius") return true;
    if (l.path[0] === "shadow") return true;
    if (l.path[0] === "breakpoint") return true;
    if (l.path[0] === "typography" && l.path[1] === "family") return true;
    if (l.path[0] === "typography" && l.path[1] === "scale") return true;
    if (l.path[0] === "typography" && l.path[1] === "weight") return true;
    if (l.path[0] === "motion") return true;
    return false;
  });

  return {
    tokensCss: renderTokensCss(lightLeaves, darkLeaves, themeLeaves),
    tailwindConfigTs: renderTailwindConfigTs(themeLeaves),
    tokensTs: renderTokensTs(raw),
    publicTokensJson: renderPublicTokensJson(leaves, raw),
  };
}

// --- tokens.css -------------------------------------------------------------

function renderTokensCss(
  light: ResolvedLeaf[],
  dark: ResolvedLeaf[],
  theme: ResolvedLeaf[],
): string {
  const header = [
    "/*",
    " * GENERATED FILE — DO NOT EDIT.",
    " * Source of truth: Brand-Tokens.json (company brand/).",
    " * Regenerate with `pnpm run tokens:build`.",
    " * CI fails if this file drifts from the generator output.",
    " *",
    " * Consumed via `@import './tokens.css';` from src/styles/base.css,",
    " * which owns the `@import \"tailwindcss\";` directive so this file",
    " * stays portable.",
    " */",
    "",
  ];

  const sortedLight = sortForCss(light);
  const sortedDark = sortForCss(dark);

  const rootLines: string[] = [":root {"];
  for (const leaf of sortedLight) {
    rootLines.push(`  ${leaf.cssVar}: ${formatCssValue(leaf)};`);
  }
  rootLines.push("}");

  const darkLines: string[] = [];
  if (sortedDark.length > 0) {
    darkLines.push("");
    darkLines.push("@media (prefers-color-scheme: dark) {");
    darkLines.push("  :root {");
    for (const leaf of sortedDark) {
      darkLines.push(`    ${leaf.cssVar}: ${formatCssValue(leaf)};`);
    }
    darkLines.push("  }");
    darkLines.push("}");
  }

  // Tailwind v4 @theme block — exposes design tokens to utility generation.
  // Each @theme key maps to its :root counterpart via `var()` so the
  // single runtime source remains the `:root` block (and any dark-mode
  // override flows through every Tailwind utility automatically).
  const themeLines: string[] = [];
  themeLines.push("");
  themeLines.push("/* Tailwind v4 theme — keep in sync with :root above. */");
  themeLines.push("@theme {");
  for (const leaf of theme) {
    const themeKey = tailwindThemeKey(leaf);
    if (!themeKey) continue;
    themeLines.push(`  ${themeKey}: var(${leaf.cssVar});`);
  }
  themeLines.push("}");

  return [...header, ...rootLines, ...darkLines, ...themeLines, ""].join("\n");
}

/** Stable order so the diff is reviewable. */
function sortForCss(leaves: ResolvedLeaf[]): ResolvedLeaf[] {
  const order = [
    "color",
    "gradient",
    "typography",
    "space",
    "radius",
    "shadow",
    "motion",
    "layout",
    "breakpoint",
    "brand",
    "logo",
    "social",
  ];
  return [...leaves].sort((a, b) => {
    const ai = order.indexOf(a.path[0]);
    const bi = order.indexOf(b.path[0]);
    if (ai !== bi) return ai - bi;
    return a.cssVar.localeCompare(b.cssVar);
  });
}

function formatCssValue(leaf: ResolvedLeaf): string {
  return String(leaf.value);
}

/**
 * Map a resolved leaf into its Tailwind v4 @theme key.
 * Returns null for leaves that should not produce a utility.
 */
function tailwindThemeKey(leaf: ResolvedLeaf): string | null {
  const [head, ...rest] = leaf.path;

  if (head === "color" && leaf.$type === "color") {
    if (rest[0] === "base") return `--color-${kebab(rest.slice(1).join("-"))}`;
    if (rest[0] === "alias") return `--color-${kebab(rest.slice(1).join("-"))}`;
    return `--color-${kebab(rest.join("-"))}`;
  }
  if (head === "gradient") {
    // gradient.sparkle -> --background-image-sparkle, enabling `bg-sparkle`.
    return `--background-image-${kebab(rest.join("-"))}`;
  }
  if (head === "space") {
    // Tailwind v4 uses `--spacing-*` for utilities like p-4, m-4, gap-4.
    return `--spacing-${kebab(rest.join("-"))}`;
  }
  if (head === "radius") return `--radius-${kebab(rest.join("-"))}`;
  if (head === "shadow") return `--shadow-${kebab(rest.join("-"))}`;
  if (head === "breakpoint") return `--breakpoint-${kebab(rest.join("-"))}`;
  if (head === "typography" && rest[0] === "family") {
    return `--font-${kebab(rest.slice(1).join("-"))}`;
  }
  if (head === "typography" && rest[0] === "scale") {
    return `--text-${kebab(rest.slice(1).join("-"))}`;
  }
  if (head === "typography" && rest[0] === "weight") {
    return `--font-weight-${kebab(rest.slice(1).join("-"))}`;
  }
  if (head === "motion" && rest[0] === "duration") {
    return `--duration-${kebab(rest.slice(1).join("-"))}`;
  }
  if (head === "motion" && rest[0] === "easing") {
    return `--ease-${kebab(rest.slice(1).join("-"))}`;
  }
  return null;
}

// --- tailwind.config.ts -----------------------------------------------------

/**
 * Even though Tailwind v4 reads its theme from the @theme block in tokens.css,
 * we also emit a typed `tailwind.config.ts` so:
 *   - editors get autocomplete from the explicit `theme.extend` shape,
 *   - downstream tools (Storybook, IDE plugins, v3 callers) see the same scales,
 *   - the spec from WIS-13 is satisfied (one of the four required artifacts).
 *
 * Each value points at `var(--token-name)` so the CSS layer remains the single
 * runtime source — flipping a CSS variable in dark mode updates utilities
 * automatically.
 */
function renderTailwindConfigTs(theme: ResolvedLeaf[]): string {
  const colors: Record<string, string | Record<string, string>> = {};
  const backgroundImage: Record<string, string> = {};
  const spacing: Record<string, string> = {};
  const borderRadius: Record<string, string> = {};
  const boxShadow: Record<string, string> = {};
  const fontFamily: Record<string, string> = {};
  const fontSize: Record<string, string> = {};
  const fontWeight: Record<string, string> = {};
  const screens: Record<string, string> = {};
  const transitionDuration: Record<string, string> = {};
  const transitionTimingFunction: Record<string, string> = {};

  for (const leaf of theme) {
    const [head, ...rest] = leaf.path;
    const cssRef = `var(${leaf.cssVar})`;

    if (head === "color") {
      if (rest[0] === "base" || rest[0] === "alias") {
        const name = rest.slice(1).map(kebab).join("-");
        colors[name] = cssRef;
      } else {
        const scale = rest[0];
        const step = rest.slice(1).join("-");
        if (typeof colors[scale] !== "object") colors[scale] = {};
        (colors[scale] as Record<string, string>)[step] = cssRef;
      }
    } else if (head === "gradient") {
      backgroundImage[rest.join("-")] = cssRef;
    } else if (head === "space") {
      spacing[rest.join("-")] = cssRef;
    } else if (head === "radius") {
      borderRadius[rest.join("-")] = cssRef;
    } else if (head === "shadow") {
      boxShadow[rest.join("-")] = cssRef;
    } else if (head === "breakpoint") {
      screens[rest.join("-")] = cssRef;
    } else if (head === "typography") {
      if (rest[0] === "family") fontFamily[rest.slice(1).join("-")] = cssRef;
      if (rest[0] === "scale") fontSize[rest.slice(1).join("-")] = cssRef;
      if (rest[0] === "weight") fontWeight[rest.slice(1).join("-")] = cssRef;
    } else if (head === "motion") {
      if (rest[0] === "duration")
        transitionDuration[rest.slice(1).join("-")] = cssRef;
      if (rest[0] === "easing")
        transitionTimingFunction[rest.slice(1).join("-")] = cssRef;
    }
  }

  const themeExtend = {
    colors,
    backgroundImage,
    spacing,
    borderRadius,
    boxShadow,
    fontFamily,
    fontSize,
    fontWeight,
    screens,
    transitionDuration,
    transitionTimingFunction,
  };

  // Pretty-print and indent the literal so the emitted file is reviewable.
  const literal = JSON.stringify(themeExtend, null, 2)
    .split("\n")
    .map((line, idx) => (idx === 0 ? line : "    " + line))
    .join("\n");

  return [
    "/*",
    " * GENERATED FILE — DO NOT EDIT.",
    " * Source of truth: Brand-Tokens.json (company brand/).",
    " * Regenerate with `pnpm run tokens:build`.",
    " *",
    " * Tailwind v4 reads its theme from the @theme block in",
    " * src/styles/tokens.css. This config file exists for downstream tools",
    " * (Storybook, IDE plugins) and for type-safe reference. Each value",
    " * points at the corresponding CSS variable so behaviour is identical.",
    " */",
    "",
    "import type { Config } from 'tailwindcss';",
    "",
    "const config: Config = {",
    "  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],",
    "  theme: {",
    `    extend: ${literal},`,
    "  },",
    "};",
    "",
    "export default config;",
    "",
  ].join("\n");
}

// --- src/lib/tokens.ts ------------------------------------------------------

/**
 * Typed TS export. The website reads runtime brand data here — e.g. the
 * WhatsApp button reads `tokens.brand.whatsapp_number`. We export the raw
 * (unresolved) tree so consumers retain access to descriptions and types
 * alongside the resolved `$value`s.
 */
function renderTokensTs(raw: Record<string, unknown>): string {
  const literal = JSON.stringify(raw, null, 2);
  return [
    "/*",
    " * GENERATED FILE — DO NOT EDIT.",
    " * Source of truth: Brand-Tokens.json (company brand/).",
    " * Regenerate with `pnpm run tokens:build`.",
    " *",
    " * Typed export of the full token tree. Use this for runtime values that",
    " * components need to render (e.g. the WhatsApp number, the tagline) —",
    " * styling consumers should reach for the CSS variables in tokens.css.",
    " */",
    "",
    `export const tokens = ${literal} as const;`,
    "",
    "export type Tokens = typeof tokens;",
    "export default tokens;",
    "",
  ].join("\n");
}

// --- public/brand/tokens.json ----------------------------------------------

/**
 * The published copy of the resolved token tree. The `/brand` page reads this
 * to render the public design-system reference, and it doubles as a fetchable
 * artifact (`https://wishfy.ai/brand/tokens.json`) for partners/LLMs.
 */
function renderPublicTokensJson(
  leaves: ResolvedLeaf[],
  raw: Record<string, unknown>,
): string {
  // Attach `$resolved` to each leaf so downstream consumers don't need to
  // perform alias resolution themselves.
  const resolvedTree = JSON.parse(JSON.stringify(raw)) as Record<
    string,
    unknown
  >;
  for (const leaf of leaves) {
    let cursor: Record<string, unknown> = resolvedTree;
    for (let i = 0; i < leaf.path.length - 1; i++) {
      cursor = cursor[leaf.path[i]] as Record<string, unknown>;
    }
    const key = leaf.path[leaf.path.length - 1];
    const original = cursor[key] as Record<string, unknown>;
    cursor[key] = { ...original, $resolved: leaf.value };
  }
  return JSON.stringify(resolvedTree, null, 2) + "\n";
}

// ---------------------------------------------------------------------------
// Write or verify
// ---------------------------------------------------------------------------

const ARTIFACTS = {
  tokensCss: "src/styles/tokens.css",
  tailwindConfigTs: "tailwind.config.ts",
  tokensTs: "src/lib/tokens.ts",
  publicTokensJson: "public/brand/tokens.json",
} as const;

function ensureDir(filePath: string) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function writeArtifacts(output: BuildOutput): void {
  for (const [key, rel] of Object.entries(ARTIFACTS)) {
    const abs = join(repoRoot, rel);
    ensureDir(abs);
    writeFileSync(abs, output[key as keyof BuildOutput]);
    process.stdout.write(`  wrote ${rel}\n`);
  }
}

function verifyArtifacts(output: BuildOutput): number {
  let drift = 0;
  for (const [key, rel] of Object.entries(ARTIFACTS)) {
    const abs = join(repoRoot, rel);
    const expected = output[key as keyof BuildOutput];
    if (!existsSync(abs)) {
      process.stderr.write(`  MISSING ${rel}\n`);
      drift++;
      continue;
    }
    const actual = readFileSync(abs, "utf8");
    if (actual !== expected) {
      process.stderr.write(`  DRIFT   ${rel}\n`);
      drift++;
    } else {
      process.stdout.write(`  ok      ${rel}\n`);
    }
  }
  return drift;
}

function main() {
  const check = process.argv.includes("--check");
  const output = build();
  if (check) {
    process.stdout.write("Verifying token artifacts against source…\n");
    const drift = verifyArtifacts(output);
    if (drift > 0) {
      process.stderr.write(
        `\nDetected ${drift} artifact drift(s). Run \`pnpm run tokens:build\` and commit.\n`,
      );
      process.exit(1);
    }
    process.stdout.write("All artifacts in sync.\n");
    return;
  }
  process.stdout.write("Building token artifacts…\n");
  writeArtifacts(output);
  process.stdout.write("Done.\n");
}

main();
