# Plan: Document the Anchor draft/work/review/deploy workflow in README.md

- **Value:** low
- **Priority:** P3
- **Slug:** readme-anchor-workflow-docs
- **Preferred models:** small, mid
- **Assignee:** ai
- **Depends on:** none

## Progress
- [ ] Step 1: Confirm the actual current promotion/deploy path with a human (dev→main via /review, GitHub Actions auto-deploy on push to main) before documenting it as fact
- [ ] Step 2: Write a concise "How to update this site" section into README.md
- [ ] Step 3: Verify every command/skill named in the new section is real and spelled correctly
- [ ] Done when holds

## Goal
Someone who wants to change this site — with no prior context on this repo's
Anchor-based workflow — can read README.md and know, in a few minutes, the
actual sequence of commands to go from "I want to change X" to "it's live on
serpico.ai": `/draft` → `/work` → `/review` → (promote to `main`) → GitHub
Pages auto-deploy — without needing to first find and read
`.plans/README.md`'s much longer, agent-facing process document.

## Context read
- `README.md` (current) — has one line pointing at `.plans/README.md` for
  "the `/draft` → `/work` → `/review` workflow," plus a separate
  "Deployment" section describing the GitHub Actions auto-deploy-on-push-to-
  `main` mechanism. The two are never connected into one walkthrough — a
  reader has to already know that `/review`'s promotion step is what gets a
  change from `dev` onto `main`, which is what triggers the deploy workflow.
- `.plans/README.md` — the full, detailed, agent-facing process doc (lane
  table, agent move rules, headless `work_once.py` usage, etc.). This plan
  is **not** about duplicating that file into README.md; it's about a much
  shorter, human-facing "here's the sequence" pointer that links to it for
  detail.
- `CLAUDE.md` (this repo's Anchor config) — documents `/draft`, `/work`,
  `/review`, `/commit-prep`, `/release`, `/deploy`, `/tag`, `/push` at the
  orchestrator level. `/deploy`'s own description: "Detect first; never
  scaffold over existing tooling" — for this repo, that means it should
  recognize the existing GitHub Actions push-to-`main` deploy and not try
  to set up anything new. Worth confirming this actually holds (Step 1)
  before writing that mechanism into README.md as settled fact, rather than
  assuming from the command's general description.
- `.github/workflows/deploy-pages.yml` — the actual CI that deploys on push
  to `main` / manual `workflow_dispatch`. This is the real mechanism; the
  new README section should describe *this*, not invent a different one.

## Dependencies (how to fill)
Checked all `.plans/` lanes. **Depends on:** none — pure documentation, no
shared code or scaffold to wait on.

## Constraints
- **Docs describe current shipped state, not aspirational process.** Per
  this project's own standing rule (`CLAUDE.md`, `.plans/README.md`'s own
  "Documentation vs plans" section): the new README section must describe
  the workflow as it *actually* operates in this repo today (verified
  against `.github/workflows/deploy-pages.yml` and this session's actual
  `/review` promotion mechanics), not a generic description of what Anchor
  skills *could* do in any project.
- Keep it short. README.md is a human on-ramp, not the process manual —
  link to `.plans/README.md` for the full lane/agent-rules detail rather
  than duplicating it. A few paragraphs plus a command list, not a rewrite
  of the existing "Deployment" section's technical accuracy.
- Don't invent or promise a `/deploy` behavior not confirmed in Step 1 —
  if this repo's deploy is purely "push to `main` → GitHub Actions," say
  that plainly; only mention `/deploy` as a command if it's confirmed to
  do something real and distinct here (e.g. status checks, dry-run).

## Conventions
Plain Markdown, matching README.md's existing heading style and tone
(concise, command-block-heavy, no marketing language).

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Ask a human to confirm: is dev→main promotion (via `/review`'s empty-queue Promote survey) actually this repo's intended path to a live deploy, and does `/deploy` do anything beyond detecting the existing GitHub Actions workflow — or should the new README section skip mentioning `/deploy` entirely and just describe `/review --promote` → auto-deploy? | none until answered | explicit answer recorded in this plan | human |
| 2 | Add a "How to update this site" section to `README.md` between the existing intro and "Development" sections: a short numbered walkthrough (`/draft` a change → `/work` implements it → `/review` merges feature→`dev` → `/review --promote` (or the empty-queue prompt) merges `dev`→`main` → GitHub Actions deploys automatically) with a one-line pointer to `.plans/README.md` for full detail | `README.md` | proofread; every command name matches what `CLAUDE.md`/`.plans/README.md` actually document | small |
| 3 | Cross-check every skill/command named in the new section against `CLAUDE.md`'s own command list and this repo's actual `.claude/commands/` — no invented flags or steps | `README.md` (verification only) | grep each named command against `CLAUDE.md` | small |

## Risks
- Documenting a workflow detail that turns out to be wrong (e.g. assuming
  `/deploy` does something it doesn't in this repo) would actively mislead
  a future reader — mitigated by making Step 1 mandatory before writing
  anything speculative into README.md.

## Escalation triggers
- If Step 1's answer reveals the actual deploy path is more complex than
  "promote to main → GitHub Actions" (e.g. a manual approval step, a
  different branch strategy) — stop and re-scope the README section to
  match reality rather than the simple version assumed here.
