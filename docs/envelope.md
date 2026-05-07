# Recipe envelope

Every recipe is a JSON document with a small set of standardized top-level fields and a module-specific `config` payload. This page is the canonical schema reference.

## Two shapes

| Shape | Path | Behavior on install |
|---|---|---|
| **Full** | `<module>/full/<slug>.json` | Module-export snapshot. Replaces the entire current config for the module. |
| **Partial** | `<module>/partial/<slug>.json` | Targeted slice. Merges into the current config. |
| **Snippet** | `<module>/snippets/<slug>.txt` | Plain-text content asset (e.g. welcome message pools). |

## TypeScript-style schema

```ts
/**
 * Top-level envelope every recipe satisfies. Optional fields are honored
 * by the dashboard / install_recipe API; missing fields fall back to
 * sensible defaults (mode: "merge" for partials, "replace" for full).
 */
interface RecipeEnvelope {
  /** Human-readable recipe name. Shown in the dashboard catalog. */
  name: string;

  /** One- or two-sentence description. Shown in cards + tables. */
  description: string;

  /** Recipe family — used by the installer to pick a handler. */
  kind?:
    | "module-export"   // full module config snapshot
    | "module-recipe"   // additive partial slice
    | string;           // module-specific kinds welcome

  /** Modly module this recipe targets. Matches the dashboard module key. */
  module?: string;

  /**
   * Merge mode at install time. Default: "merge" for partials, "replace"
   * for full. Override per recipe to lock down.
   */
  mode?: "merge" | "replace";

  /**
   * Module-specific payload. Schema depends on `module`. The dashboard
   * validates this against the live module schema (GET /modules/:key/schema).
   */
  config: Record<string, unknown>;

  /**
   * Free-form authoring notes. Not consumed by the installer; surfaced
   * in the dashboard catalog as "How this works".
   */
  i18nNotes?: string;
  notes?: string;

  /** Tags for search. */
  tags?: string[];

  /** Recipe authors (display only). */
  authors?: string[];
}
```

> **Why `module` and `kind` are both optional but recommended:** the installer can infer both from the recipe's path (`<module>/full/...` → `module-export`, `<module>/partial/...` → `module-recipe`). New recipes should still set both explicitly so the dashboard can label them without resorting to filename heuristics.

## Merge semantics — `mode: "merge" | "replace"`

### `mode: "replace"` (default for `<module>/full/`)

Whole-config swap. Existing config for the module is overwritten. Use sparingly — typically only for a brand-new server starting from a profile.

### `mode: "merge"` (default for `<module>/partial/`)

Deep merge. Rules:

- **Objects**: deep-merged key by key.
- **Arrays of primitives**: replaced wholesale.
- **Arrays of keyed objects** (e.g. `rules`, `commands`, `forms`): merged by `id` or `name`. New entries appended; matching entries deep-merged.
- **`null`**: explicitly clears a key.

To override merge for a specific subtree, recipe authors can include a `_merge` directive:

```json
{
  "config": {
    "rules": [...],
    "_merge": { "rules": "replace" }
  }
}
```

## Placeholders

Recipes never bake server-specific Discord IDs. Three placeholder syntaxes:

### 1. Bracket form (preferred)

```json
{ "channelId": "{channel:logs}", "roleId": "{role:mods}" }
```

| Form | Resolves to |
|---|---|
| `{role:NAME}` | First role with case-insensitive name `NAME`. |
| `{role:#id}` | Literal role ID (escape hatch). |
| `{channel:NAME}` | First channel with name `NAME`. Leading `#` ignored. |
| `{channel:#id}` | Literal channel ID. |
| `{emoji:🎉}` | Pass-through unicode emoji. |
| `{emoji:custom_name}` | Resolves to a server custom emoji by name. |
| `{guild:id}` | Replaced with the install target's guild snowflake. |
| `{guild:name}` | Replaced with the guild's display name. |

If a placeholder can't be resolved, the installer surfaces it in the dashboard's "review before install" step so the user can map it explicitly.

### 2. Uppercase literal form

Some recipes use `MOD_LOG_CHANNEL_ID`, `MEMBER_ROLE_ID`, etc. The installer treats any value matching `/^[A-Z][A-Z0-9_]+_(?:CHANNEL_ID|ROLE_ID|EMOJI|GUILD_ID)$/` as a placeholder and prompts the user to map it. Both syntaxes are supported indefinitely; bracket form is preferred for new recipes.

### 3. i18n keys

Recipes can reference locale strings instead of literal text:

```json
{ "promptKey": "i18n:onboarding.quiz.q1_prompt" }
```

The dashboard pulls the resolved string from the bot's locale catalog. Servers shipping their own locale override layer can localize without editing the recipe.

## Override at install time

Both the dashboard and the [`install_recipe`](https://github.com/modly-public/modly-mcp/blob/main/docs/tools.md#install_recipe) MCP tool accept an `overrides` map:

```json
{
  "slug": "automod/full/community-safe",
  "overrides": {
    "{channel:logs}": "1234567890",
    "{role:mods}": "9876543210"
  }
}
```

Overrides take precedence over name-based resolution.

## Worked examples

**Partial (merge):**

```json
{
  "name": "Boost celebration",
  "kind": "module-partial",
  "module": "welcome",
  "mode": "merge",
  "description": "Drop-in boost message + celebration embed without disturbing existing welcome / leave config.",
  "config": {
    "boost": {
      "enabled": true,
      "channelId": "{channel:announcements}",
      "embedKey": "i18n:welcome.boost_embed"
    }
  }
}
```

**Full (replace):**

```json
{
  "name": "Welcome — community profile",
  "kind": "module-export",
  "module": "welcome",
  "mode": "replace",
  "description": "Mid-size community welcome profile: warm tone, role picker, 24h DM nudge, boost celebration.",
  "config": {
    "join": { ... },
    "leave": { ... },
    "boost": { ... },
    "messagePools": { ... }
  }
}
```

---

Last updated: 2026-04-30
