# Tech Demos Monorepo

Sticky Bun monorepo for Grok Bot "Tech Demos": a growing collection of small, single-user demo apps, each built by a cloud agent from an approved idea (originally seeded by experiments with [Grok Build Skills](https://x.ai/skills) and plugins).

This repository is permanent — demos accumulate here over time. **No new repos are created per demo.**

## Layout

```
AGENTS.md                     # Instructions for cloud agents working here
README.md                     # This file
.gitignore                    # Bun/Node ignores
apps/                         # One self-contained demo per kebab-case slug
  <slug>/                     #   e.g. apps/grok-build-skill-demo/
    PLAN.md                   #   Written before implementation (see skill)
    package.json              #   Each app installs and runs independently
skills/
  project-planning/SKILL.md   # Planning skill agents follow before coding
tracking/
  seen-bookmarks.json         # Scout bot state: proposed / built / skipped ideas
```

## How it works

1. A scout bot proposes demo ideas and records them in `tracking/seen-bookmarks.json`.
2. An agent picks up an approved idea, plans it per `skills/project-planning/`, and implements it under `apps/<slug>/`.
3. The agent opens a PR touching only its app folder, attaching at least one screenshot **and** one video of the running app.

## Running a demo

Each app is fully independent — there is no root workspace or root `package.json`:

```bash
cd apps/<slug>
bun install
bun run dev
```

See `AGENTS.md` for the full rules agents must follow.
