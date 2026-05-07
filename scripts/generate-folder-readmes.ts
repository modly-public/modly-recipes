#!/usr/bin/env -S npx tsx
/**
 * Walk the recipes tree and (re)generate per-folder README.md files.
 *
 * Reads every *.json in each folder, extracts `name` and `description`
 * (or sensible fallbacks), and writes a README.md with a manifest table.
 *
 * Run:
 *   npx tsx scripts/generate-folder-readmes.ts
 *   # or
 *   node --import tsx scripts/generate-folder-readmes.ts
 *
 * The script is idempotent — re-run after adding/renaming a recipe.
 *
 * Conventions:
 *   - Top-level folders (automod-packs/, embeds/, …) get a README that
 *     tables every direct-child recipe + lists subfolders if present.
 *   - Per-shape subfolders (<module>/full/, <module>/partial/) get a
 *     README that tables their direct-child recipes.
 *   - Folders that don't contain JSON recipes are skipped (e.g. an
 *     empty placeholder folder gets a stub README so the link from
 *     the parent doesn't 404).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

// Folders we never traverse.
const SKIP_DIRS = new Set([".git", ".github", "node_modules", "scripts", "docs"]);

interface RecipeMeta {
  file: string;        // basename
  name: string;
  description: string;
  kind?: string;
  module?: string;
}

async function readRecipe(filePath: string): Promise<RecipeMeta | null> {
  const file = path.basename(filePath);
  // Plain-text snippets (e.g. welcome/snippets/casual-pool.txt) get a
  // synthetic meta — they don't carry an envelope, but still appear in
  // folder tables so authors can discover them.
  if (file.endsWith(".txt")) {
    return {
      file,
      name: file.replace(/\.txt$/, "").replace(/[-_]/g, " "),
      description: "Plain-text content snippet.",
    };
  }
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  const obj = parsed as Record<string, unknown>;
  const name =
    (typeof obj["name"] === "string" && obj["name"]) ||
    (typeof obj["title"] === "string" && (obj["title"] as string)) ||
    file.replace(/\.json$/, "");
  const description =
    (typeof obj["description"] === "string" && obj["description"]) ||
    "(no description)";
  const kind = typeof obj["kind"] === "string" ? obj["kind"] : undefined;
  const module = typeof obj["module"] === "string" ? obj["module"] : undefined;
  return { file, name, description, ...(kind ? { kind } : {}), ...(module ? { module } : {}) };
}

async function listEntries(dir: string): Promise<{ files: string[]; subdirs: string[] }> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  const subdirs: string[] = [];
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    if (e.isDirectory()) subdirs.push(e.name);
    else if (e.isFile() && (e.name.endsWith(".json") || e.name.endsWith(".txt"))) {
      files.push(e.name);
    }
  }
  files.sort();
  subdirs.sort();
  return { files, subdirs };
}

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n+/g, " ").trim();
}

async function buildFolderReadme(
  absDir: string,
  relDir: string,
  isTopLevel: boolean,
): Promise<string | null> {
  const { files, subdirs } = await listEntries(absDir);

  // No content + no subfolders → skip.
  if (files.length === 0 && subdirs.length === 0) return null;

  const recipes: RecipeMeta[] = [];
  for (const f of files) {
    const meta = await readRecipe(path.join(absDir, f));
    if (meta) recipes.push(meta);
  }

  const folderName = path.basename(absDir);
  const today = new Date().toISOString().slice(0, 10);

  const lines: string[] = [];
  lines.push(`# ${folderName}`);
  lines.push("");
  lines.push(
    isTopLevel
      ? `Recipes for the **${folderName}** category. Drop any of these into your Modly server via dashboard import, the [\`install_recipe\`](https://github.com/modly-public/modly-mcp/blob/main/docs/tools.md#install_recipe) MCP tool, or curl.`
      : `Recipes in **${relDir}**. See the [parent folder](../README.md) for context on this category.`,
  );
  lines.push("");

  if (recipes.length > 0) {
    lines.push("## Recipes");
    lines.push("");
    lines.push("| File | Name | Description |");
    lines.push("|---|---|---|");
    for (const r of recipes) {
      lines.push(`| [\`${r.file}\`](./${r.file}) | ${escapeCell(r.name)} | ${escapeCell(r.description)} |`);
    }
    lines.push("");
  }

  if (subdirs.length > 0) {
    lines.push("## Subfolders");
    lines.push("");
    for (const sd of subdirs) {
      const sdAbs = path.join(absDir, sd);
      const { files: sf, subdirs: ss } = await listEntries(sdAbs);
      const count = sf.length;
      const note = count > 0 ? `${count} recipe${count === 1 ? "" : "s"}` : "empty (placeholder)";
      lines.push(`- [\`${sd}/\`](./${sd}) — ${note}${ss.length > 0 ? ` + ${ss.length} sub-folder(s)` : ""}`);
    }
    lines.push("");
  }

  if (isTopLevel) {
    lines.push("## Install");
    lines.push("");
    lines.push("Three install paths — see [`docs/install.md`](../docs/install.md) for details.");
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push(`Last updated: ${today}`);
  lines.push("");

  return lines.join("\n");
}

async function walk(absDir: string, relDir: string, isTopLevel: boolean): Promise<number> {
  let written = 0;
  const readme = await buildFolderReadme(absDir, relDir, isTopLevel);
  if (readme !== null) {
    const target = path.join(absDir, "README.md");
    await fs.writeFile(target, readme, "utf8");
    written++;
    console.log(`  wrote ${path.relative(ROOT, target)}`);
  }
  // Recurse into subfolders one level (e.g. <module>/full, <module>/partial).
  const { subdirs } = await listEntries(absDir);
  for (const sd of subdirs) {
    written += await walk(path.join(absDir, sd), path.join(relDir, sd), false);
  }
  return written;
}

interface IndexEntry {
  path: string;
  name: string;
  description: string;
  kind?: string;
  module?: string;
  category: string;     // top-level folder name
  shape?: "full" | "partial" | "snippet" | "module-root";
}

async function collectAllRecipes(absDir: string, relDir: string, category: string): Promise<IndexEntry[]> {
  const out: IndexEntry[] = [];
  const { files, subdirs } = await listEntries(absDir);
  const shape: IndexEntry["shape"] =
    relDir.endsWith("/full") ? "full" :
    relDir.endsWith("/partial") ? "partial" :
    relDir.endsWith("/snippets") ? "snippet" : "module-root";
  for (const f of files) {
    const meta = await readRecipe(path.join(absDir, f));
    if (meta) {
      const entry: IndexEntry = {
        path: path.posix.join(relDir, f),
        name: meta.name,
        description: meta.description,
        category,
        shape,
      };
      if (meta.kind) entry.kind = meta.kind;
      if (meta.module) entry.module = meta.module;
      out.push(entry);
    }
  }
  for (const sd of subdirs) {
    out.push(...(await collectAllRecipes(path.join(absDir, sd), path.posix.join(relDir, sd), category)));
  }
  return out;
}

async function writeIndex(): Promise<number> {
  const topEntries = await fs.readdir(ROOT, { withFileTypes: true });
  const all: IndexEntry[] = [];
  for (const e of topEntries) {
    if (!e.isDirectory() || SKIP_DIRS.has(e.name)) continue;
    all.push(...(await collectAllRecipes(path.join(ROOT, e.name), e.name, e.name)));
  }
  all.sort((a, b) => a.path.localeCompare(b.path));
  const index = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    totals: {
      recipes: all.length,
      categories: [...new Set(all.map((r) => r.category))].length,
    },
    recipes: all,
  };
  await fs.writeFile(path.join(ROOT, "index.json"), JSON.stringify(index, null, 2) + "\n", "utf8");
  console.log(`  wrote index.json (${all.length} recipes)`);
  return all.length;
}

async function main(): Promise<void> {
  console.log("Generating folder READMEs…");
  const topEntries = await fs.readdir(ROOT, { withFileTypes: true });
  let total = 0;
  for (const e of topEntries) {
    if (!e.isDirectory()) continue;
    if (SKIP_DIRS.has(e.name)) continue;
    total += await walk(path.join(ROOT, e.name), e.name, true);
  }
  await writeIndex();
  console.log(`Done. Wrote ${total} README.md file(s) + index.json.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
