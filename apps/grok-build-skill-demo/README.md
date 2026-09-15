# grok-build-skill-demo

A tiny local playground demonstrating the Grok Build "skills reflect live config" idea: a custom skill is defined by an on-disk `skill.json` config plus one action module, shows up in the UI's skill listing (re-read from disk on every request), and runs end-to-end.

## Run

```
bun install && bun run dev
```

Open http://localhost:3456.

## What to try

1. The **Word Stats** skill is listed in the left panel, loaded live from `skills/word-stats/skill.json`.
2. Paste some text and hit **Run skill** — the server dispatches to `skills/word-stats/action.ts` and the UI renders the stats.
3. Edit the `description` in `skills/word-stats/skill.json` and refresh the page — the listing updates without restarting the server.

See `PLAN.md` for goals, non-goals, and acceptance criteria.
