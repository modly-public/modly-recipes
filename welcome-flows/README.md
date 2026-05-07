# welcome-flows

Recipes for the **welcome-flows** category. Drop any of these into your Modly server via dashboard import, the [`install_recipe`](https://github.com/modly-public/modly-mcp/blob/main/docs/tools.md#install_recipe) MCP tool, or curl.

## Recipes

| File | Name | Description |
|---|---|---|
| [`anti-bot-age-gate.json`](./anti-bot-age-gate.json) | Anti-bot age-gate before access | Holds new joins in an unverified state until their account is at least N days old AND they pass a one-click human check. Blocks classic drive-by bot raids without forcing real users through CAPTCHA. |
| [`multi-language-welcome-split.json`](./multi-language-welcome-split.json) | Multi-language welcome split | Routes the welcome message to a per-language channel based on the user's Discord locale. Falls back to a shared channel if locale is unsupported. Each language pulls from its own locale-keyed pool. |
| [`onboarding-with-quiz.json`](./onboarding-with-quiz.json) | Onboarding recipe with quiz | Three-question onboarding quiz that gates access on correct answers about server rules. Wrong answers loop the question with a hint; final pass grants the MEMBER role and posts a celebration in #general. |
| [`tiered-welcome-role-picker.json`](./tiered-welcome-role-picker.json) | Tiered welcome with role picker | Two-step welcome: greet on join in #welcome with a button that posts a role-picker in a private thread. Once the user picks a role, they're moved to the MEMBER tier and the picker thread auto-archives. |
| [`welcome-with-24h-dm-nudge.json`](./welcome-with-24h-dm-nudge.json) | Welcome with 24h DM nudge if inactive | Standard public welcome plus a 24-hour follow-up DM if the new member hasn't posted in any channel by then. Big lift on activation rate without being naggy. |

## Install

Three install paths — see [`docs/install.md`](../docs/install.md) for details.

---

Last updated: 2026-05-07
