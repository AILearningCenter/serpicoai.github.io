# Plan: Blog / articles section

- **Value:** low
- **Priority:** P3
- **Slug:** blog-articles-section
- **Preferred models:** mid, coding-agent
- **Assignee:** ai
- **Depends on:** none

## Progress
- [ ] Step 1: Scaffold an `articles` content collection
- [ ] Step 2: Build `/blog` index + `/blog/[slug]` post pages
- [ ] Step 3: Add nav/footer entry
- [ ] Step 4: Get real article content from a human — do not fabricate posts under real bylines
- [ ] Step 5: SEO basics (per-post OG tags, sitemap coverage, optional RSS)
- [ ] Step 6: CHANGELOG entry
- [ ] Done when holds

**Note added on promotion (2026-09-04):** this plan's Context/Dependencies/
Conventions sections describe `events-media-feed-cross-promotion` as "not
merged yet" and assume its `src/content.config.ts`/`glob()` loader pattern
would exist on disk to copy from. Since this plan was drafted, that plan
merged, and its content-collections system (including `content.config.ts`)
was **fully removed** by two later plans (`remove-events-page`,
`remove-media-page` — both `completed/`) once `/events` and `/media` were
themselves removed. There is no existing `content.config.ts` to reuse on
`dev` right now — whoever executes Step 1 creates it fresh (the Content
Layer API / `glob()` loader pattern is still the right convention for this
Astro version; it just needs to be written new, not copied from a file
that no longer exists). Not re-scoping the plan itself since Step 1's
actual task ("define an articles content collection") is unaffected either
way — just flagging so Step 1 doesn't go looking for a reference file that
isn't there.

## Goal
The site has a working `/blog` section (index + individual post pages, styled
consistently with the rest of the site) that the org can add real articles to
— explicitly low priority, no deadline driving this.

## Context read
- `find src -iname "*blog*"` and `src/content.config.ts` — neither exists yet
  on this branch. No blog/articles scaffolding anywhere in the repo today.
- `.plans/review-needed/events-media-feed-cross-promotion.local.md` — **not
  merged yet**, but its Progress note documents that this Astro version
  (7.2.9) requires the modern Content Layer API (`src/content.config.ts` +
  `glob()` loaders), not the legacy `src/content/config.ts` format. If that
  plan lands first, this one should **reuse** the same content-collection
  setup pattern rather than re-deriving it from scratch — see Dependencies.
- `src/styles/global.css` — `.card-grid`/`.card` and `.section--alt`
  alternating-band patterns (established this session across Home, Team,
  Services, Corporate, About, Contact) are the right visual pattern for a
  post-index grid; no new design system needed.
- Checked all `.plans/` lanes for existing blog work: none (`grep -rli blog
  .plans/` only matches `.plans/README.md`'s own generic mention of
  `/commit-prep`'s release-notes blog convention — an unrelated concept,
  not site content).

## Dependencies (how to fill)
No plan blocks this one. **Soft sequencing note, not a hard dependency:** if
`events-media-feed-cross-promotion` merges before this plan starts, Step 1
should copy its `src/content.config.ts` / `glob()` loader pattern instead of
inventing a second, possibly-inconsistent one. **Depends on:** none.

## Constraints
- **Do not fabricate article content attributed to real team members.**
  Writing thought-leadership posts under Vincent Serpico's (or anyone else's)
  byline without them actually having written or approved that text is
  misrepresentation, not placeholder content — same rule this session
  already applied to testimonial quotes and the CEI address. Seed content
  must be either supplied by a human or clearly labeled as placeholder/example
  (see Step 4).
- Match the site's existing design system (`.card`, `.card-grid`,
  `.section--alt`, `BaseLayout`/`Header`/`Footer`) rather than introducing a
  separate visual style for just this section.

## Conventions
Astro Content Layer API (`src/content.config.ts`, `glob()` loader) — the
convention this project has already settled on per
`events-media-feed-cross-promotion`'s Progress note, even though that plan
hasn't merged yet. Pages under `src/pages/blog/`.

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Define an `articles` content collection (title, slug, publish date, summary, author, body; author as a plain string, not a claim of authorship unless a human confirms it) | `src/content.config.ts`, `src/content/articles/` | `npm run build` succeeds with zero seed entries | mid |
| 2 | Build `/blog` (index — card-grid of post summaries, newest first) and `/blog/[slug]` (individual post, `BaseLayout` + `.section` styling) | `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro` | rebuild; both routes render with 0 posts (empty state) and with 1 seed/test post | mid |
| 3 | Add a "Blog" (or "Insights" — human's call, note it in the header if renamed) entry to `primaryNav` and, if it fits the existing three-column layout, the footer's `company` or a new column | `src/nav.config.ts` | rebuild; nav/footer show the new link | mid |
| 4 | Get at least one real article (or an explicitly `DRAFT`/`PLACEHOLDER`-labeled example, same allowance `events-media-feed-cross-promotion` used for its one media-highlights placeholder) from a human before calling this plan done — do not invent posts under a real person's name to fill the section | `src/content/articles/` | at least one entry exists and is either real or clearly labeled placeholder | human (content only; page code stays agent-executable) |
| 5 | Per-post OG title/description tags (reuse `BaseLayout`'s existing pattern); confirm `/blog` and post routes appear in the sitemap `@astrojs/sitemap` already generates; RSS feed via `@astrojs/rss` is optional — only add if the human wants it | `src/pages/blog/[slug].astro`, optionally `src/pages/rss.xml.ts` | `npm run build`; check `dist/sitemap-index.xml` includes blog routes | mid |
| 6 | Add a CHANGELOG entry under `[Unreleased]` for the new Blog section | `CHANGELOG.md` | present in `[Unreleased]` | mid |

## Risks
- Low priority means this can sit for a while — if `events-media-feed-cross-promotion`
  lands in the meantime, re-check Step 1 against its actual merged
  `content.config.ts` before scaffolding, rather than assuming this plan's
  guess at the pattern still matches.
- An empty `/blog` section (no real posts) reads as unfinished/abandoned on a
  live site — consider whether to keep the nav link hidden until Step 4 has
  at least one real entry, rather than shipping a visibly empty page.

## Escalation triggers
- If no human-supplied content materializes for Step 4 within a reasonable
  time, stop after Steps 1-3 (working, empty section) rather than fabricating
  posts to look "done."
