# partial

Recipes in **automod/partial**. See the [parent folder](../README.md) for context on this category.

## Recipes

| File | Name | Description |
|---|---|---|
| [`aggressive-raid-filter.json`](./aggressive-raid-filter.json) | Aggressive raid filter | Hair-trigger pack for servers under active raid pressure. Designed to be enabled during a raid window (paired with the raid module's auto-enable hook), not as an everyday baseline. Expect some false positives. |
| [`anti-cap-pack.json`](./anti-cap-pack.json) | Anti-caps pack | Removes messages that are mostly uppercase past a length threshold. |
| [`anti-emoji-spam.json`](./anti-emoji-spam.json) | Anti-emoji-spam pack | Trims emoji-only / emoji-flood messages. |
| [`anti-invite-pack.json`](./anti-invite-pack.json) | Anti-invite pack | Blocks Discord invite URLs in any channel. |
| [`anti-link-pack.json`](./anti-link-pack.json) | Anti-link pack | Blocks all external links except a small allowlist (YouTube, Twitch, Twitter, GitHub). |
| [`anti-mention-pack.json`](./anti-mention-pack.json) | Anti-mention pack | Stops mention storms — bans members who mention 4+ unique users at once. |
| [`antinuke-locked-down.json`](./antinuke-locked-down.json) | Antinuke locked-down preset | Maximum-paranoia preset for high-value or high-risk servers (large communities, brand servers, partnered servers). Pair with the antinuke module's full lockdown profile — this covers the message-side rules. Every customizable string is exposed as a placeholder. |
| [`appeal-portal-3-strike.json`](./appeal-portal-3-strike.json) | Appeal portal with 3-strike escalation | Three-strike escalation rules wired to the standard moderation point system. Each strike level escalates: 5pts = warn, 15pts = 6h timeout, 30pts = ban with appeal link. Pair with a forms-based appeal portal (see forms/appeal-portal.json). |
| [`leetspeak-slur-pack.json`](./leetspeak-slur-pack.json) | Leetspeak slur pack | Wildcard slur detection that survives common leetspeak substitutions. Operator must fill in the blacklist. |
| [`raid-shield.json`](./raid-shield.json) | Raid shield | Heavy anti-spam pack designed for servers facing active raids. Pair with the Modly raid module for join-burst protection — this covers the message-side. |
| [`repeat-spam-pack.json`](./repeat-spam-pack.json) | Repeat-spam pack | Catches users sending the same message in a tight window. |
| [`scam-link-pack.json`](./scam-link-pack.json) | Scam-link pack | Auto-bans on detected scam URLs (Discord/Steam/Crypto phishing patterns). |
| [`slow-build-trust-verification.json`](./slow-build-trust-verification.json) | Slow-build trust verification | Three-tier trust ramp: brand-new accounts get heavy filters, established members (24h+) get baseline, trusted role gets a relaxed pack. Each rule is scoped by role so you can layer them. Apply the role gates in your role-picker / verification flow. |
| [`slur-leetspeak-baseline.json`](./slur-leetspeak-baseline.json) | Slur + slur-leetspeak automod baseline | Drop-in slur baseline that combines the third-tier WORD_BLACKLIST wildcard layer with a regex pattern catching common leetspeak / look-alike obfuscations. Add your own server-specific terms in the placeholders before importing — the defaults are intentionally tame, generic stand-ins. |

---

Last updated: 2026-05-07
