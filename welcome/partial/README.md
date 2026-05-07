# partial

Recipes in **welcome/partial**. See the [parent folder](../README.md) for context on this category.

## Recipes

| File | Name | Description |
|---|---|---|
| [`anime-pool.json`](./anime-pool.json) | Welcome pool — anime | Anime/weeb welcome lines (i18n keys). |
| [`anti-bot-age-gate.json`](./anti-bot-age-gate.json) | Anti-bot age-gate before access | Holds new joins in an unverified state until their account is at least N days old AND they pass a one-click human check. Blocks classic drive-by bot raids without forcing real users through CAPTCHA. |
| [`art-pool.json`](./art-pool.json) | Welcome pool — art | Art-server welcome lines (i18n keys). |
| [`boost-celebration.json`](./boost-celebration.json) | Boost celebration message | Posts a special embed in #announcements when someone boosts. |
| [`cozy-pool.json`](./cozy-pool.json) | Welcome pool — cozy | Cozy-vibes welcome lines. |
| [`dev-pool.json`](./dev-pool.json) | Welcome pool — dev | Developer-team-style welcome lines (i18n keys). |
| [`gaming-pool.json`](./gaming-pool.json) | Welcome pool — gaming | Gaming-flavoured welcome lines (i18n keys). |
| [`image-card-on.json`](./image-card-on.json) | Welcome image card | Switch from plain embed to a generated welcome image card. |
| [`leave-on.json`](./leave-on.json) | Leave message | Posts a brief leave embed when a member leaves. |
| [`multi-language-welcome-split.json`](./multi-language-welcome-split.json) | Multi-language welcome split | Routes the welcome message to a per-language channel based on the user's Discord locale. Falls back to a shared channel if locale is unsupported. Each language pulls from its own locale-keyed pool. |
| [`onboarding-with-quiz.json`](./onboarding-with-quiz.json) | Onboarding recipe with quiz | Three-question onboarding quiz that gates access on correct answers about server rules. Wrong answers loop the question with a hint; final pass grants the MEMBER role and posts a celebration in #general. |
| [`reminder-24h.json`](./reminder-24h.json) | 24-hour onboarding reminder | DM members 24h after join if they haven't sent a message yet. |
| [`study-pool.json`](./study-pool.json) | Welcome pool — study | Study-server welcome lines (i18n keys). |
| [`tech-pool.json`](./tech-pool.json) | Welcome pool — tech | Tech-server welcome lines (i18n keys). |
| [`thread-on-join.json`](./thread-on-join.json) | Welcome thread per join | Open a private welcome thread for each new member. |
| [`tiered-welcome-role-picker.json`](./tiered-welcome-role-picker.json) | Tiered welcome with role picker | Two-step welcome: greet on join in #welcome with a button that posts a role-picker in a private thread. Once the user picks a role, they're moved to the MEMBER tier and the picker thread auto-archives. |
| [`welcome-with-24h-dm-nudge.json`](./welcome-with-24h-dm-nudge.json) | Welcome with 24h DM nudge if inactive | Standard public welcome plus a 24-hour follow-up DM if the new member hasn't posted in any channel by then. Big lift on activation rate without being naggy. |

---

Last updated: 2026-05-07
