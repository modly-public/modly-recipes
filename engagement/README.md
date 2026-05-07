# engagement

Recipes for the **engagement** category. Drop any of these into your Modly server via dashboard import, the [`install_recipe`](https://github.com/modly-public/modly-mcp/blob/main/docs/tools.md#install_recipe) MCP tool, or curl.

## Recipes

| File | Name | Description |
|---|---|---|
| [`birthday-shoutout.json`](./birthday-shoutout.json) | Birthday auto-shoutout | Daily check (09:00 server time) for any opted-in members whose birthday matches today; posts a shoutout in #general and assigns a 24h Birthday role with a custom color. |
| [`daily-mod-digest-ai.json`](./daily-mod-digest-ai.json) | Daily mod digest with AI summary | Posts a once-a-day staff-only digest summarizing yesterday's moderation activity (warns, mutes, bans, top offenders, automod hits) with an AI-written executive summary at the top. |
| [`starboard-reaction-ramp.json`](./starboard-reaction-ramp.json) | Starboard with reaction-threshold ramp | Starboard with a self-tuning threshold: starts at 5 stars to be featured, raises by 1 each time the server crosses 1000 active members. Prevents the same handful of regulars from dominating once the community grows. |
| [`suggestion-to-thread.json`](./suggestion-to-thread.json) | Suggestion-to-thread pipeline | Turns every message in #suggestions into a discussion thread with up/down vote buttons, and re-posts top-voted suggestions of the week into a staff review channel. |
| [`weekly-leveling-spotlight.json`](./weekly-leveling-spotlight.json) | Weekly leveling spotlight | Every Monday, posts a recap of the top 5 climbers on the XP leaderboard from the past 7 days. Awards a temporary VIP role to #1 for a week and an emoji to top 3. |

## Install

Three install paths — see [`docs/install.md`](../docs/install.md) for details.

---

Last updated: 2026-05-07
