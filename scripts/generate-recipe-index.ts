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
 * Recipes without an explicit envelope `kind` get their kind inferred
 * from the folder archetype (`<module>/full/...` → module-export,
 * `<module>/partial/...` → module-recipe). Pure text content lives in
 * `<module>/snippets/<slug>.txt`.
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
  archetype?: "full" | "partial" | "snippet";
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

function deriveArchetype(rel: string): "full" | "partial" | "snippet" | undefined {
  const parts = rel.split(sep);
  if (parts.includes("full")) return "full";
  if (parts.includes("partial")) return "partial";
  if (parts.includes("snippets")) return "snippet";
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
      // Prefer the envelope `kind`. Fall back to the folder archetype
      // so every recipe ends up classified as one of the two canonical
      // kinds (module-export / module-recipe).
      kind =
        (body.kind as string | undefined) ??
        (archetype === "full"
          ? "module-export"
          : archetype === "partial"
            ? "module-recipe"
            : undefined);
    }
  } else {
    description = `Text snippet · ${slug}`;
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
  "ai-tools": "AI tools",
  "appeal-portal": "Appeal portal",
  "channel-games": "Channel games",
  "channel-utils": "Channel utilities",
  "color-of-the-day": "Color of the day",
  "command-access": "Command access",
  "custom-commands": "Custom commands",
  "embed-builder": "Embed builder",
  "evader-detection": "Evader detection",
  "github-activity": "GitHub activity",
  "member-notes": "Member notes",
  "mod-coach": "Mod coach",
  "role-events": "Role events",
  "scheduled-actions": "Scheduled actions",
  "server-goals": "Server goals",
  "server-stats": "Server stats",
  "smart-channels": "Smart channels",
  "social-alerts": "Social alerts",
  "time-capsule": "Time capsule",
  "voice-clipper": "Voice clipper",
  "voice-recording": "Voice recording",
  "webhook-broadcaster": "Webhook broadcaster",
  "activity-roles": "Activity roles",
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
