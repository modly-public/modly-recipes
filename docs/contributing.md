# Contributing a recipe

Welcome! Recipes are JSON, the catalog is CC0, and the bar is "useful in 2+ servers without modification."

## Check before you write

Search [`index.json`](../index.json) for similar recipes. If one already exists and just needs a tweak, open a PR against it instead of duplicating.

## Naming conventions

Recipes live under one of two layouts:

### Module-keyed (preferred for new recipes)

```
<module>/full/<archetype>.json       # complete snapshot
<module>/partial/<slug>.json         # targeted slice
```

| Where | Filename | Example |
|---|---|---|
| `<module>/full/` | One of `default.json`, `strict.json`, `community.json` (or another well-known archetype). | `welcome/full/community.json` |
| `<module>/partial/` | Action-or-feature kebab slug. | `welcome/partial/boost-celebration.json` |

### Use-case keyed (legacy / flat)

```
automod-packs/<server-archetype>.json
welcome-flows/<flow-name>.json
engagement/<feature>.json
integrations/<source>-<sink>.json
ai-automation/<feature>.json
embeds/<purpose>.json
custom-commands/<pack-name>.json
forms/<form-purpose>.json
giveaways/<starter-name>.json
```

Use these for cross-module flows or for content that doesn't map to a single module's config schema (e.g. an embed template, a command pack).

## Envelope shape

```json
{
  "name": "Boost celebration",
  "kind": "module-partial",
  "module": "welcome",
  "mode": "merge",
  "description": "Drop-in boost message + celebration embed without disturbing existing welcome / leave config.",
  "config": { ... }
}
```

Required: `name`, `description`, `config`. Strongly recommended: `kind`, `module`, `mode`. Full schema in [`envelope.md`](./envelope.md).

## Placeholders, not IDs

Never paste real Discord IDs. Use:

- `{role:mods}` not `<@&1234567890>` not `1234567890`
- `{channel:logs}` not `<#1234567890>`
- Legacy uppercase form (`MOD_LOG_CHANNEL_ID`) is also accepted — but prefer bracket form for new recipes.

If a recipe references a feature that doesn't have a name (e.g. an integration secret), use a placeholder env-var name: `secretEnv: "MODLY_GITHUB_WEBHOOK_SECRET"` — the dashboard prompts the installer to set it.

## Validation

Run the regenerator before pushing — it parses every JSON file and rebuilds `index.json`:

```bash
npx tsx scripts/generate-folder-readmes.ts
```

If your recipe doesn't appear in `index.json`, the JSON didn't parse. Fix and re-run.

The bot side validates against the live module schema at install time (`GET /api/modules/:key/schema`). To dry-run before opening a PR, install your local recipe via curl with `dryRun: true` — see [`install.md`](./install.md).

## Style

- **Tone:** descriptive, not promotional. The catalog is the storefront — names like "Aggressive raid filter" beat "AMAZING ULTRA RAID PROTECTION".
- **Description:** one or two sentences. What it does, who it's for, when to use it.
- **i18n:** if the recipe surfaces user-facing text, prefer `i18n:key.path` over hardcoded strings. The bot's locale system will translate.
- **Comments:** JSON doesn't have comments. Use the `notes` field on the envelope if you need authoring notes.

## Regenerate `index.json` and folder READMEs

The script in [`scripts/generate-folder-readmes.ts`](../scripts/generate-folder-readmes.ts) walks the tree, rebuilds every `<folder>/README.md`, and rewrites `index.json`. Idempotent — safe to re-run.

```bash
npx tsx scripts/generate-folder-readmes.ts
git diff
```

A pre-commit / CI check that runs the script and fails if the working tree changes will catch stale READMEs.

## Open the PR

1. Branch off `main`.
2. Add the recipe + run the regenerator.
3. Commit both the JSON and the regenerated READMEs/`index.json`.
4. Title the PR `<module>: <recipe name>` (e.g. `welcome: add boost-celebration partial`).
5. Use the bug/feature templates if reporting an issue with an existing recipe.

## Licensing

By contributing, you agree your recipe is released under [CC0](../LICENSE). Public domain. No attribution required.

---

Last updated: 2026-04-30
