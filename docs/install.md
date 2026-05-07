# Installing recipes

Three ways to install. Pick whichever fits your workflow.

## 1. Dashboard (browser)

The cleanest path. Every importable module has a built-in **Import** button.

1. Open <https://modly.net> → your server → the relevant module page.
2. Click **Import** (usually next to **Export**, top-right of the settings panel).
3. Paste the recipe JSON, or drag-drop the file.
4. Review the placeholder mapping screen — the dashboard surfaces every `{role:*}` / `{channel:*}` and lets you point it at one of your existing roles/channels.
5. Click **Install**.

Installs are reversible: every install creates a snapshot in the module's version history. **Settings → Versions → Restore** rolls back.

## 2. MCP — `install_recipe` tool

If you've configured the [`@modly_public/mcp-server`](https://github.com/modly-public/modly-mcp) and you're chatting with Claude Desktop / Cursor / Cline / any MCP host:

> **You:** "Install the `automod/full/community-safe` recipe. Route the mod-log to <#1234567890>."

The agent calls `install_recipe` with:

```json
{
  "recipeSlug": "automod/full/community-safe",
  "overrides": { "{channel:mod-log}": "1234567890" }
}
```

It can then call `list_automod_rules` (or whichever read tool corresponds to the module) to confirm the install in the same turn.

See the [tool schema](https://github.com/modly-public/modly-mcp/blob/main/docs/tools.md#install_recipe) and the [rollout-recipe example transcript](https://github.com/modly-public/modly-mcp/blob/main/examples/rollout-recipe.md).

## 3. curl / API

For automation, scripting, or self-host CI:

```bash
GUILD_ID="1234567890"
MODLY_API_KEY="modly_pat_..."

curl -X POST "https://modly.net/api/guilds/$GUILD_ID/recipes/install" \
  -H "Authorization: Bearer $MODLY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "automod/full/community-safe",
    "overrides": {
      "{channel:mod-log}": "1234567890"
    }
  }'
```

To install a local-only recipe (not from the public catalog), pass the recipe envelope inline:

```bash
curl -X POST "https://modly.net/api/guilds/$GUILD_ID/recipes/install" \
  -H "Authorization: Bearer $MODLY_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --slurpfile r ./my-custom-recipe.json '{recipe: $r[0]}')"
```

The response includes a snapshot ID for rollback:

```json
{
  "ok": true,
  "snapshotId": "snap_2k4j3lk2",
  "module": "automod",
  "rulesCreated": 4,
  "rulesUpdated": 0
}
```

## Pre-flight: dry-run

Both the dashboard and API support `dryRun: true`:

```bash
curl ... -d '{"slug": "...", "dryRun": true}'
```

Returns the diff (rules added / removed / changed) without applying. Useful for previewing in a CI check before merging a recipe PR.

## Rolling back

| Path | How |
|---|---|
| Dashboard | Module page → **Versions** → pick the pre-install snapshot → **Restore**. |
| API | `POST /api/guilds/$GUILD_ID/<module>/restore` with `{ "snapshotId": "..." }`. |
| MCP | Currently dashboard-only — write tools that mutate full module state stay gated for safety. |

---

Last updated: 2026-04-30
