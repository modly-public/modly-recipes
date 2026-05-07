## What does this change

<!-- Recipe added/updated, module, what it does. -->

## Checklist

- [ ] Recipe parses as valid JSON
- [ ] Top-level `name` and `description` present
- [ ] `kind` and `module` set (or N/A — legacy flat folder)
- [ ] No literal Discord IDs — uses placeholders (`{role:*}`, `{channel:*}`) or legacy uppercase form (`MOD_LOG_CHANNEL_ID`)
- [ ] User-facing text uses i18n keys (`i18n:...`) where the module supports it
- [ ] Ran `npx tsx scripts/generate-folder-readmes.ts` and committed regenerated `index.json` + folder READMEs
- [ ] Tested install on a real or staging server (dashboard import or `dryRun: true`)
