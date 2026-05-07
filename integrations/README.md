# integrations

Recipes for the **integrations** category. Drop any of these into your Modly server via dashboard import, the [`install_recipe`](https://github.com/modly-public/modly-mcp/blob/main/docs/tools.md#install_recipe) MCP tool, or curl.

## Recipes

| File | Name | Description |
|---|---|---|
| [`discord-slack-incident-relay.json`](./discord-slack-incident-relay.json) | Discord ↔ Slack incident relay | Bidirectional bridge between #incidents on Discord and #incidents on Slack. Threads on either side stay synced; @here / @channel mentions are translated. Designed for shared on-call between an open community (Discord) and a paid Slack workspace. |
| [`form-to-notion-webhook.json`](./form-to-notion-webhook.json) | Form ↔ Notion via webhook | Pipes new form submissions (any Modly form) into a Notion database via outbound webhook. Maps each question to a Notion property and includes the submitter's Discord ID and a deep link back into the dashboard. |
| [`github-pr-digest.json`](./github-pr-digest.json) | GitHub PR digest in #engineering | Webhook receiver that batches GitHub PR events (opened, ready-for-review, merged, closed) into a single digest message updated in place every 5 minutes. Cuts out the per-event spam from the official GitHub bot. |
| [`rss-monday-digest.json`](./rss-monday-digest.json) | RSS digest every Monday | Polls a list of RSS/Atom feeds throughout the week and posts a single combined digest every Monday morning. Items are deduplicated by canonical URL. |
| [`twitch-live-alert.json`](./twitch-live-alert.json) | Twitch live alert with pinger role | Subscribes to one or more Twitch channels via EventSub. When a stream goes live, posts an embed in #stream-alerts and pings the StreamPings role. Auto-edits the message to past-tense once the stream ends, so the alert doesn't stay 'live' all night. |

## Install

Three install paths — see [`docs/install.md`](../docs/install.md) for details.

---

Last updated: 2026-05-07
