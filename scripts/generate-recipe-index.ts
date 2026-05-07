#!/usr/bin/env -S npx tsx
/**
 * Regenerate `public/modly-recipes/index.json`.
 *
 * Walks every `*.json` and `*.txt` recipe file under the repo root,
 * pulls the envelope's name/description/kind/module fields, and emits a
 * single manifest the dashboard's `ServerRecipesManager` reads.
 *
 * Two recipe shapes are recognised:
 *   - module-export   → full preset, replaces module config + content
 *   - module-recipe   → curated slice, additive merge
 * Legacy un-enveloped recipes (the older `automod-packs/*.json` shape)
 * are still indexed; their `kind` falls back to `legacy`.
 */
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

interface ManifestEntry {
  id: string;
  slug: string;
  path: string;
  format: "json" | "text";
  name: string;
  description: string;
  category: string;
  module?: string;
  kind?: string;
  archetype?: "full" | "partial";
}

interface CategoryMeta {
  slug: string;
  title: string;
  description: string;
}

interface Manifest {
  schemaVersion: 1;
  generatedAt: string;
  categories: CategoryMeta[];
  recipes: ManifestEntry[];
}

const SKIP_DIRS = new Set([".git", "scripts", "node_modules"]);

async function walk(dir: string, out: string[] = []): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else if (entry.isFile() && (entry.name.endsWith(".json") || entry.name.endsWith(".txt"))) {
      // Skip the manifest itself.
      if (relative(ROOT, full) === "index.json") continue;
      out.push(full);
    }
  }
  return out;
}

function deriveCategory(rel: string): string {
  // Top-level folder is the category. e.g. `automod/full/strict.json` -> `automod`.
  return rel.split(sep)[0] ?? "misc";
}

function deriveArchetype(rel: string): "full" | "partial" | undefined {
  const parts = rel.split(sep);
  if (parts.includes("full")) return "full";
  if (parts.includes("partial")) return "partial";
  return undefined;
}

function deriveSlug(rel: string): string {
  // Use the file's basename minus extension.
  const base = rel.split(sep).pop() ?? rel;
  return base.replace(/\.(json|txt)$/, "");
}

async function loadJson(path: string): Promise<Record<string, unknown> | null> {
  try {
    return JSON.parse(await readFile(path, "utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function buildEntry(absPath: string): Promise<ManifestEntry | null> {
  const rel = relative(ROOT, absPath);
  const category = deriveCategory(rel);
  const slug = deriveSlug(rel);
  const archetype = deriveArchetype(rel);
  const format = absPath.endsWith(".txt") ? "text" : "json";

  let name = slug.replace(/[-_]/g, " ");
  let description = "";
  let module: string | undefined;
  let kind: string | undefined;

  if (format === "json") {
    const body = await loadJson(absPath);
    if (body) {
      name = (body.name as string) ?? name;
      description = (body.description as string) ?? "";
      module = body.module as string | undefined;
      kind = (body.kind as string | undefined) ?? "legacy";
    }
  } else {
    description = `Text pool · ${slug}`;
  }

  return {
    id: `${category}/${slug}`,
    slug,
    path: rel.split(sep).join("/"),
    format,
    name,
    description,
    category,
    module,
    kind,
    archetype,
  };
}

const CATEGORY_TITLES: Record<string, string> = {
  "automod-packs": "Automod packs",
  "welcome-flows": "Welcome flows",
  "welcome-messages": "Welcome messages",
  "ai-automation": "AI automation",
  "custom-commands": "Custom commands",
  "embeds": "Embeds",
  "engagement": "Engagement",
  "forms": "Forms",
  "giveaways": "Giveaways",
  "integrations": "Integrations",
};

function titleFor(cat: string): string {
  if (CATEGORY_TITLES[cat]) return CATEGORY_TITLES[cat];
  return cat.split(/[-_]/g).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

async function main(): Promise<void> {
  const files = await walk(ROOT);
  const entries: ManifestEntry[] = [];
  for (const f of files) {
    const e = await buildEntry(f);
    if (e) entries.push(e);
  }
  entries.sort((a, b) => a.id.localeCompare(b.id));

  const categorySet = new Set(entries.map((e) => e.category));
  const categories: CategoryMeta[] = [...categorySet].sort().map((slug) => ({
    slug,
    title: titleFor(slug),
    description: `${entries.filter((e) => e.category === slug).length} recipes`,
  }));

  const manifest: Manifest = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    categories,
    recipes: entries,
  };

  const outPath = join(ROOT, "index.json");
  await writeFile(outPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`Wrote ${entries.length} recipes across ${categories.length} categories → ${relative(ROOT, outPath)}`);
}

void main().catch((err) => {
  console.error(err);
  process.exit(1);
});
