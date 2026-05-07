# partial

Recipes in **ai/partial**. See the [parent folder](../README.md) for context on this category.

## Recipes

| File | Name | Description |
|---|---|---|
| [`ai-translate-non-english-support.json`](./ai-translate-non-english-support.json) | AI translate non-English to English in support | Detects the language of every message in #support; if it isn't English, posts a threaded English translation as a bot reply so volunteer responders can help. Translation is cached per (hash, lang) for 24h to keep AI cost down. |
| [`auto-clean-spam-links-ai-flag.json`](./auto-clean-spam-links-ai-flag.json) | Auto-clean spam links via AI flag | Pre-classifies any link-bearing message with the AI module's safety classifier; on a high-confidence spam/scam verdict, deletes the message and DMs the user the reason. Mirrors what SCAM_LINK does for the known-scam list, but extends it to never-seen URLs. |
| [`auto-pin-mod-marked-answers.json`](./auto-pin-mod-marked-answers.json) | Auto-pin mod-marked answers | When a moderator reacts to any message with a configured emoji (default 📌✅), the bot pins it AND uses the AI module to summarize the parent thread/question into a one-line tag added to the pin. |
| [`creative-persona.json`](./creative-persona.json) | AI-creative system prompt | Switches the bot to a brainstorm/creative tone. |
| [`daily-ai-mod-report-card.json`](./daily-ai-mod-report-card.json) | Daily AI mod report card | Once a day, asks the AI module to grade the previous 24h of moderator activity (response times, action distribution, appeal outcomes, escalations) and posts a private report card per moderator with constructive feedback. |
| [`daily-mod-digest-ai.json`](./daily-mod-digest-ai.json) | Daily mod digest with AI summary | Posts a once-a-day staff-only digest summarizing yesterday's moderation activity (warns, mutes, bans, top offenders, automod hits) with an AI-written executive summary at the top. |
| [`image-gen-on.json`](./image-gen-on.json) | Image-gen on | Allow /imagine command (premium only by default). |
| [`lower-rate-limit.json`](./lower-rate-limit.json) | Lower rate-limit | Tighter per-user calls/hour. |
| [`moderator-persona.json`](./moderator-persona.json) | AI-mod system prompt | Adds an AI-moderator system prompt focused on consistency + warmth. |
| [`personalized-welcome-ai-persona.json`](./personalized-welcome-ai-persona.json) | Personalized welcome via AI persona | On join, the AI persona crafts a 1–2 sentence personalized welcome based on the new member's public profile (Discord About Me, mutual servers count, account age) and the server's loaded persona. Falls back to the standard welcome pool on AI error. |
| [`summary-only.json`](./summary-only.json) | Summary-only mode | Disables /chat — only thread/channel summaries allowed. |
| [`support-persona.json`](./support-persona.json) | AI-support system prompt | Adds an AI-support system prompt for help channels. |

---

Last updated: 2026-05-07
