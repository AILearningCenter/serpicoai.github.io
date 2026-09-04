# Plan: Rename the real LinkedIn/YouTube accounts off "Learning Center" branding

- **Priority:** P3
- **Slug:** update-social-media-handles
- **Preferred models:** none — human only
- **Assignee:** human
- **Depends on:** none

## Progress
- [ ] Step 1: Rename the LinkedIn company page off the `serpico-ai-learning-center` slug
- [ ] Step 2: Rename the YouTube channel off the `@SerpicoAILearningCenter` handle
- [ ] Step 3: Record the new URLs/handles in this plan's Progress notes
- [ ] Done when holds

## Goal
The organization's real LinkedIn company page and YouTube channel are renamed
off "Learning Center" branding to match the site's Serpico AI rebrand, and the
new URLs/handles are recorded here so `rebrand-social-links` can update the
site's hrefs without guessing at them.

## Context read
- `src/nav.config.ts:44-45` — the site currently links to
  `https://www.linkedin.com/company/serpico-ai-learning-center` and
  `https://www.youtube.com/@SerpicoAILearningCenter`.
- `.plans/drafts/rebrand-social-links.local.md` — the sibling plan that will
  update those hrefs, once real new URLs exist to point at. That plan's own
  Constraints explicitly forbid guessing a replacement URL, and its Step 1
  requires human confirmation of whether the real accounts have been renamed
  — this plan is how that confirmation becomes true.

## Dependencies (how to fill)
Checked all `.plans/` lanes. No other plan does this work. **Depends on:**
none — this is the plan other work (`rebrand-social-links`) depends on, not
the other way around.

## Constraints
- This is **account administration on external platforms** (LinkedIn Page
  admin, YouTube Studio) — not something achievable by editing this
  repository. No code changes belong on this plan.
- Do not rename anything without confirming who has admin access to these
  accounts; if the assignee doesn't have access, note that here rather than
  guessing at credentials or asking someone to share them insecurely.

## Conventions
N/A — no code touched by this plan.

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Rename the LinkedIn company page's public URL slug off `serpico-ai-learning-center` (LinkedIn Page admin → Page info → Public URL) | none (external platform) | new URL loads the correct company page | human |
| 2 | Rename the YouTube channel's handle off `@SerpicoAILearningCenter` (YouTube Studio → Customization → Basic info → Handle) | none (external platform) | new handle loads the correct channel | human |
| 3 | Record both new URLs/handles in this plan's `## Progress`, so `rebrand-social-links` has real values to use instead of guessing | this plan file only | values present below | human |

## Risks
- If the assignee lacks admin access to one or both accounts, this plan
  stalls — note the access gap here rather than leaving it silently
  unstarted, so it's visible instead of just aging in `drafts/`.

## Escalation triggers
- If the org decides NOT to rename these accounts (e.g. renaming would break
  existing external links/SEO on those platforms) — that's a real answer,
  not a blocker: record it here and let `rebrand-social-links` close as
  "will not do" rather than staying blocked indefinitely.
