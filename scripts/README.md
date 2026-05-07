# `scripts/`

Maintenance scripts for the recipes catalog. None of these run as part of the published artifact — they're authoring helpers.

| Script | Purpose |
|---|---|
| [`generate-folder-readmes.ts`](./generate-folder-readmes.ts) | Walk the recipes tree and (re)generate per-folder `README.md` files. Idempotent — re-run after adding/renaming a recipe. |

## Run

```bash
npx tsx scripts/generate-folder-readmes.ts
```

Or install `tsx` once globally and call it directly:

```bash
npm i -g tsx
tsx scripts/generate-folder-readmes.ts
```

## CI hook (suggested)

A pre-commit hook or CI check that runs `generate-folder-readmes.ts` and fails if the working tree changes catches stale READMEs early:

```bash
npx tsx scripts/generate-folder-readmes.ts
git diff --exit-code
```

---

Last updated: 2026-04-30
