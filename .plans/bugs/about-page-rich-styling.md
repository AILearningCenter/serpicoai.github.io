# Plan: Bring About page styling closer to the source site's richer design

- **Value:** medium
- **Priority:** P2
- **Slug:** about-page-rich-styling
- **Preferred models:** mid, coding-agent
- **Assignee:** ai
- **Depends on:** none

## Progress
- [ ] Step 1: Resolve one open scope question with a human before touching markup (testimonial-section treatment, given the CEI partnership framing it originally came with was deliberately removed)
- [ ] Step 2: Two-column "Origin Story" layout (photo right, styled quote card) + emphasized key sentence
- [ ] Step 3: Icon-badge treatment for "Our Mission"'s 3 items (matching Corporate's `.icon-badge` pattern), alt-banded
- [ ] Step 4: Restyle "What People Are Saying" per Step 1's answer
- [ ] Step 5: Two-column "Founder" layout (photo left, text right, "FOUNDER" eyebrow label, LinkedIn button)
- [ ] Step 6: Alt-banded "Ready to Get Started?" CTA
- [ ] Step 7: Rebuild and verify against the source site side-by-side, desktop + mobile
- [ ] Done when holds

## Goal
`/about` visually matches the source site's richer styling — a two-column
"Origin Story" with a styled quote card, icon-badge "Our Mission" items, a
restyled testimonial section, a two-column "Founder" bio with photo, and an
alt-banded closing CTA — using only this site's existing design tokens and
content (no new copy, no fabricated captions or claims), and **without
reintroducing any CEI partnership content, logo, or "About CEI" block that
`remove-cei-mentions` deliberately removed** (see Constraints — this is the
single hardest boundary on this plan).

## Context read
- Live-fetched `https://www.ailearningcenter.ai/about` (Playwright,
  1280x900, this session) — full-page screenshot and text extracted.
  Compared against current `src/pages/about.astro`. Differences:
  1. **"Origin Story"**: source is two-column (paragraphs left, a real
     photo of Vincent teaching a workshop right, rounded corners + soft
     shadow), with the closing line ("That's the gap I built ... to
     close.") rendered in accent-orange emphasis, and the founder quote
     below the photo in its own bordered card (name + title styled
     distinctly). Current site: single column, one small `.inline-photo`,
     plain unstyled `<blockquote>` mixed into the paragraph flow, no
     emphasis treatment.
  2. **"Our Mission"**: source is centered, alt-banded, 3 items in a row
     each with a circular icon badge (⚡ Create the Tools You Need, 🛠️
     Practitioner-Led, 🎯 Hands-On Focus) above a heading and description
     — same icon-badge pattern already built for Corporate's "What We
     Offer" this session (`.icon-badge`, plain Unicode emoji, no new
     assets). Current site: left-aligned plain `<ul>` with bold lead-in
     labels, no icons, no banding.
  3. **Testimonial section**: on the source site this is a full dark-navy
     banner titled "Partnership with CEI" — Jeff Saville's quote in an
     accent-bordered card on the left, the CEI logo + "About CEI" blurb +
     a "Learn about CEI" button on the right. **This exact section is
     what `remove-cei-mentions` (completed) deliberately dismantled** —
     the partnership ended, so the framing, logo, and "About CEI" content
     are gone for good, leaving just the bare quote under "What People Are
     Saying." There is no old-site equivalent of a CEI-free testimonial
     section to copy — see Step 1.
  4. **"Founder"**: source is two-column — a real photo of Vincent
     speaking (left, captioned "Vincent delivering keynote at Practical
     Founders Summit"), bio text right with a "FOUNDER" eyebrow label in
     accent color and a LinkedIn button with an icon. Current site: no
     photo displayed in a real layout (the `image=` prop puts it as a
     small thumbnail above the title via `Section`'s default handling,
     not a two-column layout), plain text "Connect on LinkedIn" link, no
     eyebrow label.
  5. **"Ready to Get Started?"**: source uses a light cream/tan alt-band
     background (distinct from Corporate's dark-navy CTA banner — the two
     pages use different treatments on the source site, not the same
     component reused everywhere). Current site: plain white section, no
     banding.
- **`var/asset-migration-manifest.md`** — checked the Founder photo's
  actual provenance before assuming the source site's caption applies:
  `vincent-serpico-alt.png` is documented as "headshot (Vincent Serpico,
  dup) ... AI-Experts-grid duplicate," **not** the keynote-speaking photo
  the source site's caption ("Vincent delivering keynote at Practical
  Founders Summit") describes. Adding that caption to this site's actual
  (different) photo would be a fabricated claim about what the image
  depicts — see Constraints. No new photo exists to source a real caption
  from.
- `.plans/completed/remove-cei-mentions.local.md` — read in full. Its own
  Constraints: don't reword the Jeff Saville quote, don't fabricate a
  replacement for removed CEI content, and its Escalation trigger explicitly
  fired once already on "keep one thing but not another" partial-removal
  scenarios. This plan must not casually reopen that decision by copying
  the old CEI banner's visual treatment back in, even styling-only, without
  the same deliberateness that plan required.
- `.plans/completed/corporate-page-rich-styling.local.md` — the direct
  precedent for this plan's approach and its established conventions:
  `.icon-badge` (circular, emoji, `--color-surface` bg), `.card` for
  bordered/shadowed content, `Section.astro`'s passthrough `class` prop,
  and the operator's confirmed preference for plain Unicode emoji over any
  icon library. Reused here rather than re-asking.

## Dependencies (how to fill)
Checked all `.plans/` lanes. **Depends on:** `remove-cei-mentions`
(`.plans/completed/`) — already satisfied; listed because this plan's
Constraints directly build on that one's decisions and must not undo them.

## Constraints
- **Never reintroduce CEI partnership framing, the CEI logo, an "About
  CEI" block, or a "Learn about CEI" link/button.** That content was
  deliberately and explicitly removed by a completed plan after direct
  human confirmation that the partnership had ended. This plan may restyle
  the *presentation* of the remaining bare testimonial (card styling,
  accent border, name/title treatment) but must not restore any of the
  removed CEI-specific content, imagery, or framing sentences, regardless
  of how visually appealing the source site's version looks.
- **No fabricated photo captions.** The source site's Founder-section
  caption ("Vincent delivering keynote at Practical Founders Summit")
  describes a photo this site does not have — `vincent-serpico-alt.png` is
  a plain headshot per the asset migration manifest, not a keynote photo.
  Do not caption it as depicting an event it doesn't show. If a caption is
  wanted, it must describe the actual photo or be omitted entirely.
- **No new copy or reworded content** — same verbatim-content discipline
  established (and enforced via `/review`) on `page-styling-refresh` and
  `corporate-page-rich-styling`: restructure presentation, don't invent or
  reword sentences, bullet text, or the Vincent Serpico / Jeff Saville
  quotes.
- Reuse existing design tokens and the patterns already established this
  session for Corporate (`.icon-badge`, `.card`, `Section`'s `class`
  prop) rather than inventing parallel one-off treatments.
- The "Ready to Get Started?" CTA should get the **light** alt-band
  treatment the source site actually uses on `/about` (not a copy of
  Corporate's dark banner) — the two pages use different CTA styles on
  the source site itself; match each page to its own source treatment
  rather than forcing uniformity that doesn't exist in the original.

## Conventions
Astro + plain CSS custom properties (`src/styles/global.css`), no
framework/icon library — same as `corporate-page-rich-styling`. Prefer
extending/reusing that plan's new classes (`.icon-badge`, `.corporate-hero`
if its shape fits, `Section`'s `class` prop) over inventing near-duplicate
new ones; add page-specific classes only where the layout genuinely
differs (e.g. a `.founder` two-column block distinct from `.corporate-hero`
if the content shape doesn't match).

## Steps
| # | Task | Touches | Verify by | Route to |
|---|------|---------|-----------|----------|
| 1 | Ask a human: now that the CEI partnership framing/logo/"About CEI" block are permanently gone, should "What People Are Saying" get its own lighter card/quote styling (accent-bordered blockquote, styled name/title — no dark banner, since there's no CEI content left to justify one), or something else? | none until answered | explicit answer recorded in this plan | human |
| 2 | Restructure "Origin Story" into a two-column layout (paragraphs left, existing `origin-story-vincent.jpg` right, larger/styled than the current small inline photo), move the Vincent Serpico quote into its own bordered `.card`, and apply accent-color emphasis to the closing "That's the gap..." sentence | `src/pages/about.astro`, `src/styles/global.css` | rebuild + Playwright screenshot desktop | mid |
| 3 | Convert "Our Mission"'s 3 bullet items into an alt-banded, centered `.icon-badge` row (⚡🛠️🎯), reusing Corporate's icon-badge CSS | `src/pages/about.astro` | rebuild + screenshot | mid |
| 4 | Restyle "What People Are Saying" per Step 1's answer | `src/pages/about.astro`, `src/styles/global.css` | rebuild + screenshot; confirm zero CEI-related content present | mid |
| 5 | Restructure "Founder" into a two-column layout (existing `vincent-serpico-alt.png` left, bio text right), add a "FOUNDER" eyebrow label above the name in accent styling, restyle the LinkedIn link as a small button/icon treatment | `src/pages/about.astro`, `src/styles/global.css` | rebuild + screenshot; confirm no fabricated caption was added | mid |
| 6 | Apply the light alt-band treatment to "Ready to Get Started?" | `src/pages/about.astro` | rebuild + screenshot | mid |
| 7 | Full rebuild + visual pass at desktop (1280px) and mobile (390px), scrolled through to trigger `data-reveal`; grep confirms zero CEI-related strings/assets reintroduced | whole page | `npm run build` zero errors; `grep -rniI "CEI\|ceigateway" src/pages/about.astro` → zero hits outside the one already-kept quote block | mid |

## Risks
- The testimonial section is the one place this plan could accidentally
  regress a prior, deliberate content decision — mitigated by making
  Step 1 mandatory and Step 7's grep check explicit rather than just
  visual.
- Two-column layouts for "Origin Story" and "Founder" both reuse a photo
  + text shape similar to Corporate's `.corporate-hero` — worth checking
  during implementation whether that class can be reused directly or
  needs a small variant, rather than a decision made in the abstract here.

## Escalation triggers
- If Step 1's answer trends toward "make it look more like the old
  partnership banner" in any way that reintroduces CEI branding — stop and
  treat that as reopening `remove-cei-mentions`'s decision, which needs
  the same explicit, deliberate confirmation that plan required, not a
  styling-plan sign-off.
