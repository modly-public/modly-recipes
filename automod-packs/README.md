# automod-packs

Recipes for the **automod-packs** category. Drop any of these into your Modly server via dashboard import, the [`install_recipe`](https://github.com/modly-public/modly-mcp/blob/main/docs/tools.md#install_recipe) MCP tool, or curl.

## Recipes

| File | Name | Description |
|---|---|---|
| [`aggressive-raid-filter.json`](./aggressive-raid-filter.json) | Aggressive raid filter | Hair-trigger pack for servers under active raid pressure. Designed to be enabled during a raid window (paired with the raid module's auto-enable hook), not as an everyday baseline. Expect some false positives. |
| [`antinuke-locked-down.json`](./antinuke-locked-down.json) | Antinuke locked-down preset | Maximum-paranoia preset for high-value or high-risk servers (large communities, brand servers, partnered servers). Pair with the antinuke module's full lockdown profile — this covers the message-side rules. Every customizable string is exposed as a placeholder. |
| [`appeal-portal-3-strike.json`](./appeal-portal-3-strike.json) | Appeal portal with 3-strike escalation | Three-strike escalation rules wired to the standard moderation point system. Each strike level escalates: 5pts = warn, 15pts = 6h timeout, 30pts = ban with appeal link. Pair with a forms-based appeal portal (see forms/appeal-portal.json). |
| [`community-safe.json`](./community-safe.json) | Community safe | Balanced safety pack for general-purpose communities. Keeps spam, scam links, invites, and slurs under control without over-moderating normal chat. |
| [`family-safe.json`](./family-safe.json) | Family-safe | Strictest pack: aggressive on slurs, swearing, NSFW links, invites, and external links. For all-ages communities, kids' gaming servers, school clubs. |
| [`gaming-server.json`](./gaming-server.json) | Gaming server | Balanced moderation for a 1k–50k member gaming community: tolerant of memes + caps, strict on slurs + invite spam. |
| [`raid-shield.json`](./raid-shield.json) | Raid shield | Heavy anti-spam pack designed for servers facing active raids. Pair with the Modly raid module for join-burst protection — this covers the message-side. |
| [`slow-build-trust-verification.json`](./slow-build-trust-verification.json) | Slow-build trust verification | Three-tier trust ramp: brand-new accounts get heavy filters, established members (24h+) get baseline, trusted role gets a relaxed pack. Each rule is scoped by role so you can layer them. Apply the role gates in your role-picker / verification flow. |
| [`slur-leetspeak-baseline.json`](./slur-leetspeak-baseline.json) | Slur + slur-leetspeak automod baseline | Drop-in slur baseline that combines the third-tier WORD_BLACKLIST wildcard layer with a regex pattern catching common leetspeak / look-alike obfuscations. Add your own server-specific terms in the placeholders before importing — the defaults are intentionally tame, generic stand-ins. |
| [`streamer-chat.json`](./streamer-chat.json) | Streamer chat | Lighter-touch pack for creator communities. More tolerant of hype, but still clamps down on spam, slurs, and promotion. |
| [`study-server.json`](./study-server.json) | Study / focus server | Strict pack for tutoring, homework help, or focus communities. Aggressive on off-topic + caps + mass-emoji. |

## Install

Three install paths — see [`docs/install.md`](../docs/install.md) for details.

---

Last updated: 2026-05-07
