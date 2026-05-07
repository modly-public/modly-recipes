# welcome-messages

Newline-delimited message **pools** for the welcome module. Paste any pool into the welcome editor's "message variants" field and the bot will pick a random line per join. Plain text only — no embeds, no JSON envelope.

## Variables

Each line can use these placeholders, expanded per join:

| Placeholder | Resolves to |
|---|---|
| `{user}` | Mention of the joining member. |
| `{username}` | Plain username (no mention). |
| `{server}` | Server / guild name. |
| `{count}` | Member count after the join. |

## Pools

| File | Tone | Use for |
|---|---|---|
| [`casual-pool.txt`](./casual-pool.txt) | Casual | Gaming servers, hobby communities, general-purpose. |
| [`formal-pool.txt`](./formal-pool.txt) | Formal | Brand servers, professional communities, support guilds. |
| [`hype-pool.txt`](./hype-pool.txt) | Hype | Streamer servers, launch communities, Discords with high energy. |
| [`warm-pool.txt`](./warm-pool.txt) | Warm | Mid-size communities, study servers, neutral default. |

## Adding a pool

1. Create `<tone>-pool.txt`.
2. Top line is a `# ...` comment with audience + variable list.
3. One welcome variant per line. Keep them short — they're rolled each join.

---

Last updated: 2026-04-30
