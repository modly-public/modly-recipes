# Modly Recipes

Drop-in configuration packs for [Modly](https://modly.net) — automod rules, embed templates, custom commands, forms, giveaways, and welcome messages. Some dashboard pages support true **Import** + **Export** round-tripping; the rest are ready-to-paste templates you can adapt in the editor.

```
automod-packs/      → /dashboard/server/<id>/automod          → presets / bulk rules
embeds/             → /dashboard/server/<id>/embeds           → embed templates
forms/              → /dashboard/server/<id>/forms            → import/export pack
giveaways/          → /dashboard/server/<id>/giveaways        → import/export pack
welcome-messages/   → /dashboard/server/<id>/welcome          → message pools
custom-commands/    → /dashboard/server/<id>/custom-commands  → import/export pack
```

## Submitting a recipe

PRs welcome. Each recipe should:

1. Land in the right top-level folder by kind.
2. Include a short `# header` comment (or top-level `description` field) explaining what it's for and the type of server it suits.
3. Be lint-clean (e.g. JSON files must parse, automod patterns must compile).
4. Use generic placeholders, not server-specific IDs (e.g. `{role:mods}` not `<@&123>`).

## Browsing

- [`automod-packs/`](./automod-packs) — opinionated rule bundles (gaming, study, NSFW-allowed, family-safe, etc.)
- [`embeds/`](./embeds) — reusable embed templates (announcements, rules, welcome, server tour)
- [`forms/`](./forms) — application / support intake packs
- [`giveaways/`](./giveaways) — giveaway starter packs
- [`custom-commands/`](./custom-commands) — slash-command snippets and importable command packs
- [`welcome-messages/`](./welcome-messages) — message pools you can paste into the welcome module

## License

CC0 — public domain. Copy, fork, remix without attribution.
