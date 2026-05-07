# partial

Recipes in **github-activity/partial**. See the [parent folder](../README.md) for context on this category.

## Recipes

| File | Name | Description |
|---|---|---|
| [`github-pr-digest.json`](./github-pr-digest.json) | GitHub PR digest in #engineering | Webhook receiver that batches GitHub PR events (opened, ready-for-review, merged, closed) into a single digest message updated in place every 5 minutes. Cuts out the per-event spam from the official GitHub bot. |
| [`pr-firehose.json`](./pr-firehose.json) | PR firehose | All PR events including comments + review. |
| [`release-only.json`](./release-only.json) | Releases only | Quiet mode — only release events. |

---

Last updated: 2026-05-07
