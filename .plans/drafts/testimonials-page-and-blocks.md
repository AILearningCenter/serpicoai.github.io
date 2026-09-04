# Plan: Real client testimonials — dedicated page and/or reusable blocks

- **Value:** medium
- **Priority:** P3
- **Slug:** testimonials-page-and-blocks
- **Preferred models:** none — human-led (see Constraints)
- **Assignee:** human
- **Depends on:** none

## Progress
- [ ] Step 1: Decide scope — dedicated `/testimonials` page, reusable blocks reused across existing pages, or both
- [ ] Step 2: Identify and contact real past/current clients willing to give a testimonial
- [ ] Step 3: Collect real quotes + attribution + permission to publish (and optional headshot) from each willing client
- [ ] Step 4: Hand collected content to an agent to build a reusable testimonial-block component and/or dedicated page
- [ ] Step 5: Wire the new component into existing pages, consolidating the current duplicate/ad hoc blockquote usage
- [ ] Step 6: Rebuild and verify
- [ ] Done when holds

## Goal
The site has a real, expandable base of client testimonials — beyond the
two existing quotes currently duplicated/ad hoc across the homepage and
About page — presented either as a dedicated `/testimonials` page, a
reusable testimonial-block component reused across existing pages
(homepage, About, Corporate), or both, with every quote, name, and
attribution being **real** and **explicitly permitted for publication** by
the person quoted. No fabricated or paraphrased-beyond-recognition quotes,
ever.

## Context read
- Full-repo search for testimonial content: exactly two real quotes exist
  site-wide, both from the same person (Jeff Saville, Executive Director,
  CEI) — one on `src/pages/index.astro` (homepage "What People Are
  Saying"), a near-duplicate on `src/pages/about.astro` (retitled "What
  People Are Saying" after `remove-cei-mentions` stripped the surrounding
  partnership framing) — plus one self-quote from Vincent Serpico
  (founder) on both pages, which isn't a third-party client testimonial.
  No dedicated testimonials page or reusable block component exists
  anywhere in the codebase.
- `.plans/completed/remove-cei-mentions.local.md` — this project's own
  hard-won precedent on testimonial handling: quotes attributed to a real,
  named person must be kept **verbatim** or removed entirely — never
  edited to scrub or soften a detail they actually said, since that would
  be fabrication. This plan inherits that same rule for any new quotes
  collected.
- `.plans/completed/brand-rewrite-serpico-ai.local.md` — established this
  project's broader anti-fabrication discipline (facts, credentials,
  contact info "kept accurate to the source site," nothing invented).

## Dependencies (how to fill)
Checked all `.plans/` lanes. **Depends on:** none.

## Constraints
- **This plan cannot be executed by an AI agent alone.** Steps 1-3
  (deciding scope, identifying real clients, actually contacting them and
  collecting quotes + publication permission) require human judgment,
  real-world relationships, and consent that an agent cannot obtain or
  fabricate. `Assignee: human` reflects that Steps 1-3 are not
  agent-claimable; **Steps 4-6 become agent-eligible once real content
  exists** — the human should hand off with a follow-up `/draft` note or
  by updating this plan's Progress once Step 3 is done, at which point an
  agent can pick up the build work.
- **No fabricated or invented quotes, names, titles, or companies** —
  ever, under any circumstance, including as placeholder/demo content.
  If real testimonials aren't available yet for a given release, ship
  with fewer testimonials (or none) rather than inventing any — matching
  this project's established practice elsewhere (e.g. `remove-cei-mentions`
  choosing to drop content rather than fabricate a replacement address).
- **Explicit publication permission required per person**, not just
  "they said something nice once." A quote said in passing conversation is
  not the same as consent to publish their name/title/photo on a public
  website — Step 3 must confirm this explicitly, in writing, per person.
- Headshots are optional, not required — a testimonial with just name +
  title/company is fine; don't block on photography if it's not readily
  available.
- Reuse this site's existing design tokens/patterns for any new component
  (`--space-*`, `--radius-*`, `--shadow-card`; the existing `blockquote`
  styling already used on About/homepage is a reasonable starting point).

## Conventions
Astro + plain CSS custom properties, no framework — matches the rest of
the site. A new `TestimonialBlock.astro` (or similar) component under
`src/components/` would follow the pattern of `CtaButton.astro`,
`Section.astro`.

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Decide: dedicated `/testimonials` page, reusable blocks reused on existing pages (home/About/Corporate), or both — record the decision here | this plan | explicit answer recorded in Progress | human |
| 2 | Identify real past/current clients (individual 1:1 training clients, corporate engagement contacts) willing to give a testimonial; make initial contact | none (external) | list of contacted people recorded (names may be redacted in the committed plan if this stays `.local.md`) | human |
| 3 | Collect from each willing person: the real quote (their own words, not written for them), their name, title/company (if applicable), explicit written permission to publish on the site, and an optional headshot | none (external) | each collected item has quote + attribution + explicit permission on file before Step 4 starts | human |
| 4 | Once real content exists: build a reusable testimonial-block component (and/or dedicated `/testimonials` page, per Step 1's decision) | `src/components/`, possibly `src/pages/testimonials.astro` | rebuild; visual review against existing site design language | mid |
| 5 | Wire the new component into whichever existing pages Step 1 decided on, consolidating the current duplicate Jeff Saville quote handling on home/About into shared markup where it makes sense (without altering either quote's text) | `src/pages/index.astro`, `src/pages/about.astro`, possibly `src/pages/corporate.astro` | rebuild; grep confirms no quote text changed, only presentation | mid |
| 6 | Full rebuild + visual pass, desktop and mobile | whole site | `npm run build` zero errors; Playwright screenshot review | mid |

## Risks
- Real clients may decline, go quiet, or take a long time to respond —
  this plan should sit patiently in a human-owned lane rather than get
  rushed or backfilled with anything invented to "finish" it faster.
- Consolidating the existing duplicate homepage/About quote markup (Step 5)
  touches already-shipped, previously-reviewed content — must not
  accidentally alter Jeff Saville's or Vincent Serpico's existing quote
  text while refactoring presentation.

## Escalation triggers
- If Step 3 collects zero willing participants after a reasonable outreach
  effort — that's a legitimate outcome, not a failure to force past. Close
  or indefinitely park this plan (`blocked/`, with the blocker noted)
  rather than fabricate content to fill the gap.
