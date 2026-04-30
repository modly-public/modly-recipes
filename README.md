# Modly Recipes

Drop-in configuration packs for [Modly](https://modly.net) — automod rules, embed templates, custom commands, and welcome messages. Import any file via the dashboard's "Import" button on the relevant page.

```
automod-packs/      → import on /dashboard/server/<id>/automod
embeds/             → import on /dashboard/server/<id>/embeds
custom-commands/    → import on /dashboard/server/<id>/commands
welcome-messages/   → paste into /dashboard/server/<id>/welcome
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
- [`custom-commands/`](./custom-commands) — slash-command snippets (FAQ replies, role pickers, utility)
- [`welcome-messages/`](./welcome-messages) — message pools you can paste into the welcome module

## License

CC0 — public domain. Copy, fork, remix without attribution.
