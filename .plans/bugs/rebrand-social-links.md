# Plan: Update social media links off "Learning Center" branding

- **Value:** low
- **Priority:** P3
- **Slug:** rebrand-social-links
- **Preferred models:** mid
- **Assignee:** ai
- **Depends on:** update-social-media-handles

## Progress
- [ ] Step 1: Update the LinkedIn and YouTube href values in nav.config.ts (and the matching link in contact.astro) using the new URLs recorded by update-social-media-handles
- [ ] Step 2: Rebuild and click-check both social links resolve to the intended destination
- [ ] Done when holds

## Goal
The site's LinkedIn and YouTube links no longer point at "Learning Center"-branded
URLs, reflecting the site's rebrand to Serpico AI — without silently breaking a
link that still points at the only real account that exists.

## Context read
- `src/nav.config.ts:44-45` — footer social links:
  `{ label: "LinkedIn", href: "https://www.linkedin.com/company/serpico-ai-learning-center", ... }`,
  `{ label: "YouTube", href: "https://www.youtube.com/@SerpicoAILearningCenter", ... }`.
- `src/pages/contact.astro:20` — a second LinkedIn link using the same
  `serpico-ai-learning-center` company-page URL.
- `.plans/completed/brand-rewrite-serpico-ai.local.md` and
  `canonical-domain-serpico-ai.local.md` — the site's page copy and domain
  were already rebranded from "Serpico AI Learning Center" to "Serpico AI";
  these two social hrefs are the last visible "Learning Center" branding
  outside the two intentionally-kept verbatim testimonial quotes (see
  `.plans/completed/remove-cei-mentions.local.md`).
- Not touched by this plan: `mailto:info@ailearningcenter.ai` (the contact
  email domain) — that's a different, higher-stakes rebrand (an actual inbox
  migration), out of scope for "social media links."

## Dependencies (how to fill)
Checked all `.plans/` lanes. **Depends on:** `update-social-media-handles`
(`.plans/drafts/update-social-media-handles.local.md`) — a human-owned plan
to actually rename the real LinkedIn company page and YouTube channel off
"Learning Center" branding, and record the new URLs/handles. This plan
cannot execute until that one's Done when holds; executors must not start
this plan while it's still open.

## Constraints
- **Do not guess a replacement URL.** `serpico-ai-learning-center` /
  `@SerpicoAILearningCenter` are real, external LinkedIn/YouTube account
  identifiers, not text this repo controls. Use only the real new URLs/
  handles recorded in `update-social-media-handles`'s Progress notes once
  that plan is done — never invent one from the pattern of other pages.
- If `update-social-media-handles` records "will not rename" (its own
  Escalation trigger), close this plan as will-not-do rather than editing
  anything.

## Conventions
Astro; shared nav/social data lives in `src/nav.config.ts`
(`footerNav.connect.links` / `socialLinks` — confirm exact export names at
execution time).

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Update the LinkedIn/YouTube `href` values in `nav.config.ts`, and the matching LinkedIn `href` in `contact.astro`, to the real new URLs recorded in `update-social-media-handles` | `src/nav.config.ts`, `src/pages/contact.astro` | rebuild; grep for `learning-center`/`LearningCenter` in `src/` → zero hits outside the two kept testimonial quotes | mid |
| 2 | Click (or curl) both updated links to confirm they resolve to the intended live account, not a 404 or someone else's page | none (verification only) | manual check noted in this plan's Progress | mid |

## Risks
- Executing before `update-social-media-handles` is done would mean guessing
  at URLs — mitigated by the formal `Depends on` gate; executors should
  refuse to start otherwise.

## Escalation triggers
- If `update-social-media-handles` records "will not rename" — close this
  plan as will-not-do rather than partially executing it.
