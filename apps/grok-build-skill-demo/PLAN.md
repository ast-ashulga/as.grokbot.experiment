# PLAN — grok-build-skill-demo

Inspired by [Grok Build v1.0.32 skills/plugins](https://x.com/blankspeaker/status/2099657258959593482), where skill and plugin listings reflect live config.

## Goal

Show a minimal "Build Skill" playground: a custom skill defined purely by an on-disk config (`skill.json` + one action module) shows up in a local UI's skill listing and can be invoked end-to-end, with the listing read from live config on every request (edit the config, refresh, see the change).

## Non-goals

- No Grok/xAI API calls, no LLM — the skill action is plain local code.
- No multi-user support, auth, persistence, or deploy config.
- No skill marketplace, install flow, or more than one bundled skill.
- No hot-reload push; "live config" means re-read from disk per request.

## Stack

- **Bun** — runtime, package manager, and HTTP server (`Bun.serve`). No other dependencies: the demo is about skill config + dispatch, not a framework.
- **Vanilla HTML/CSS/JS** single page served from `public/` — smallest possible UI for list → run → output.

## Layout

```
skills/word-stats/skill.json   ← skill config (id, name, description, entry, input spec)
skills/word-stats/action.ts    ← the one concrete action (text statistics)
server.ts                      ← Bun server: GET /api/skills, POST /api/skills/:id/run
public/index.html              ← UI: skill list, input box, run button, output
```

## Run commands

From `apps/grok-build-skill-demo/`:

```
bun install && bun run dev
```

Then open http://localhost:3456. No env vars, no secrets.

## Acceptance criteria

- `GET /api/skills` returns the `word-stats` skill read live from `skills/*/skill.json`.
- The UI lists the skill and, on Run, POSTs input text and renders the action's stats output.
- Editing `skill.json` (e.g. the description) and refreshing the page shows the change without restarting the server.
- PR includes at least one **screenshot** and at least one **video** of the running app.
