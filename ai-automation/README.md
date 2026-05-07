# ai-automation

Recipes for the **ai-automation** category. Drop any of these into your Modly server via dashboard import, the [`install_recipe`](https://github.com/modly-public/modly-mcp/blob/main/docs/tools.md#install_recipe) MCP tool, or curl.

## Recipes

| File | Name | Description |
|---|---|---|
| [`ai-translate-non-english-support.json`](./ai-translate-non-english-support.json) | AI translate non-English to English in support | Detects the language of every message in #support; if it isn't English, posts a threaded English translation as a bot reply so volunteer responders can help. Translation is cached per (hash, lang) for 24h to keep AI cost down. |
| [`auto-clean-spam-links-ai-flag.json`](./auto-clean-spam-links-ai-flag.json) | Auto-clean spam links via AI flag | Pre-classifies any link-bearing message with the AI module's safety classifier; on a high-confidence spam/scam verdict, deletes the message and DMs the user the reason. Mirrors what SCAM_LINK does for the known-scam list, but extends it to never-seen URLs. |
| [`auto-pin-mod-marked-answers.json`](./auto-pin-mod-marked-answers.json) | Auto-pin mod-marked answers | When a moderator reacts to any message with a configured emoji (default 📌✅), the bot pins it AND uses the AI module to summarize the parent thread/question into a one-line tag added to the pin. |
| [`daily-ai-mod-report-card.json`](./daily-ai-mod-report-card.json) | Daily AI mod report card | Once a day, asks the AI module to grade the previous 24h of moderator activity (response times, action distribution, appeal outcomes, escalations) and posts a private report card per moderator with constructive feedback. |
| [`personalized-welcome-ai-persona.json`](./personalized-welcome-ai-persona.json) | Personalized welcome via AI persona | On join, the AI persona crafts a 1–2 sentence personalized welcome based on the new member's public profile (Discord About Me, mutual servers count, account age) and the server's loaded persona. Falls back to the standard welcome pool on AI error. |

## Install

Three install paths — see [`docs/install.md`](../docs/install.md) for details.

---

Last updated: 2026-05-07
