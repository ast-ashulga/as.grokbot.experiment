---
name: project-planning
description: Plan a small demo app before writing any code. Use before implementing a new apps/<slug>/ demo in this monorepo.
---

# Project Planning

## When to use

Before implementing any new demo under `apps/<slug>/`. Do not start coding until the plan exists.

## Steps

1. **Clarify the MVP angle.** State in one or two sentences what the demo shows and who it's for (a single user trying it locally). Cut anything that isn't needed to make that point: no auth, no persistence, no deploy config unless the demo *is* about those things.

2. **Write `apps/<slug>/PLAN.md`** with these sections:
   - **Goal** — the one thing the demo proves, in a sentence.
   - **Non-goals** — what you are deliberately not building.
   - **Stack** — runtime (prefer Bun), framework/libs, and why each is needed.
   - **Run commands** — must be exactly `bun install && bun run dev` from the app directory, plus anything else (e.g. env vars, but no secrets committed).
   - **Acceptance criteria** — concrete checks that the demo works, and always including: at least one **screenshot** and at least one **video** of the running app attached to the PR.

3. **Implement only that folder.** All code, config, and assets go under `apps/<slug>/`. The app must be self-contained — its own `package.json`, no dependence on a root workspace.

## Tips

- Keep `PLAN.md` under a page. If the plan is long, the scope is too big.
- If the demo idea is ambiguous, pick the smallest interpretation that is still interesting to show, and note the alternatives under non-goals.
- Verify `bun install && bun run dev` works from a clean checkout of just your folder before opening the PR.
