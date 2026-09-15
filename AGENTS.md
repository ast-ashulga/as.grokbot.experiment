# Agent Instructions — Tech Demos Monorepo

This is a **sticky Bun monorepo** of many small, single-user demo apps for Grok Bot "Tech Demos". Each demo lives in its own folder under `apps/<slug>/`. This repo is permanent: demos accumulate here over time.

## Ground rules

- **Work only in your app folder.** Only add or update files under `apps/<kebab-slug>/` for your assigned demo. You may *read* root docs, `skills/`, and `tracking/`, but do not modify files outside your app folder unless explicitly asked.
- **Never create a new GitHub repo per demo.** All demos live in this monorepo.
- **Each app is self-contained.** From the app directory, `bun install && bun run dev` must work. Do not rely on a root workspace, root `package.json`, or shared dependencies.
- **Prefer Bun** as runtime and package manager. Keep demos small, MVP scope — one clear idea, working end to end, nothing more.
- **Plan before you code.** Read `skills/project-planning/SKILL.md` and write `apps/<slug>/PLAN.md` before implementing.

## PR requirements (not optional)

Every PR that adds or changes a demo **must attach both**:

1. **At least one screenshot** of the running app, and
2. **At least one video** (screen recording) of the running app.

These are validation artifacts proving the demo works. A PR without both will not be accepted.

## Tracking

`tracking/seen-bookmarks.json` is maintained by the scout bot that proposes demo ideas. It has `proposed`, `built`, and `skipped` lists. Do not casually rewrite or remove entries owned by other agents; only update the entry for your own demo (e.g. moving it from `proposed` to `built` when your PR merges, if instructed).

## Layout

```
AGENTS.md                     ← you are here
README.md                     ← owner-facing overview
skills/project-planning/      ← planning skill (read before implementing)
tracking/seen-bookmarks.json  ← scout bot state
apps/<slug>/                  ← one self-contained demo per slug
```
