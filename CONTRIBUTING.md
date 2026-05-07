See [`docs/contributing.md`](./docs/contributing.md) for the full guide.

Quick version:

1. Drop a JSON file under `<module>/full/<archetype>.json` or `<module>/partial/<slug>.json`.
2. Use placeholders (`{role:mods}`, `{channel:logs}`) instead of literal IDs.
3. `npx tsx scripts/generate-folder-readmes.ts` to regenerate folder READMEs and `index.json`.
4. Commit and open a PR.

By contributing, you agree your recipe is released under [CC0](./LICENSE).
