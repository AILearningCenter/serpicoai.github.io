# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- A "Frequently Asked Questions" section on `/training` with the 6 real
  questions from the source site's accordion and their real answers
  (re-scraped live, since the original crawl only captured the
  client-hydrated question text, not the answers) — covers coding
  prerequisites, session count, tooling, follow-up support, the $175/hour
  rate, and the step-by-step process to get started.
- Restructured the header lockup from an icon-beside-text row into a
  vertical stack (icon above wordmark above tagline), with a larger icon
  and more header padding, closing the height gap to the source site's
  header from 96px to about 21-25px at a 1280px viewport — the earlier
  row layout read as noticeably more compact than the source site's.
- Design system pass to match the source site's actual look and feel
  (previously a generic centered-blue template): navy/orange brand
  colors, Poppins headings + Inter body text (Google Fonts), a
  left-aligned two-column hero (text + image, matching the source site
  instead of the previous centered single column), bordered card
  layouts for "Who We Serve" and all 12 team members (photo left, bio
  right, replacing the stacked photo-above-text layout), alternating
  light-gray section bands for visual rhythm, and a small dependency-free
  scroll-reveal animation (`IntersectionObserver`, progressive
  enhancement — content is never hidden for no-JS visitors or before the
  script runs) matching the real scroll animations found on the source
  site.
- Initial Astro-based static site foundation: shared layout, all page
  routes, SEO basics (sitemap, robots.txt, canonical/OG tags), and a
  minimal local preview server.
- Git repository initialized with `main`/`dev` branches.
- Repo hygiene: `README.md`, `SECURITY.md`, `.editorconfig`.
- Real site logo (header mark + hero graphic), favicon, and footer social
  links (LinkedIn, YouTube, Meetup, Facebook) migrated from the source Wix
  site into `public/assets/` and wired into `Header.astro`, `BaseLayout.astro`,
  `Hero.astro`, and `Footer.astro`.
- Wired 23 more of the migrated assets into real page content now that
  it exists: all 12 team headshots on `/team` (matched by name), 5
  service-delivery images on `/services`, the "Corporate Solutions" image
  on `/corporate`, 3 images on `/about` (Origin Story, CEI partnership,
  Founder), and a partner-logo image on both `/contact` and `/`. Added
  optional `image`/`imageAlt` support to `Section.astro` to support this.
  30 of the 45 migrated assets are now wired in; 15 remain deferred
  (no events content model yet, no product page, a few uncaptioned/
  duplicate images) — see `var/asset-migration-manifest.md`.
- Rewrote all page copy from "Serpico AI Learning Center" to a "Serpico AI"
  consulting-firm positioning (Home, About, Services, Corporate, Training,
  Team, Contact) — Services/Corporate content organized around 5 consulting
  pillars, all 12 team bios reframed around each person's specialty, every
  fact (names, credentials, contact info, testimonials) kept accurate to
  the source site.
- GitHub Pages deployment workflow (`.github/workflows/deploy-pages.yml`),
  triggered on push to `main`, publishing `dist/` via GitHub's OIDC-based
  Pages deployment (no secrets required).
- `public/CNAME` pinning the custom domain `serpico.ai` for GitHub Pages.
- README section documenting how to deploy and roll back.
- `events` and `media-highlights` content collections (`src/content.config.ts`)
  — adding a markdown file is enough to publish a new event or media
  highlight, no code changes required. `/events` now renders a real
  "Upcoming Events" list (2 genuine events found live on the org's Meetup
  group) and a "Recent Media & Highlights" section.
- `scripts/refresh-feeds.mjs` (`npm run refresh-feeds`): polls the org's
  real external feeds (documented in `FEEDS.md`) and writes draft content
  stubs to `var/feed-drafts/` for review — never auto-publishes. Meetup's
  feed works today; YouTube's channel handle is currently broken (404) and
  LinkedIn/Facebook have no public feed to poll, both flagged rather than
  silently skipped.
- `src/content/README.md`: maintenance doc for adding events/media
  highlights and running the feed-refresh script.

### Changed

- Reverted the header lockup back to an icon-beside-wordmark row (it was
  briefly a vertical icon/wordmark stack): the logo is now sized to fill
  most of the header bar's height, with the "Serpico AI" wordmark at a
  slightly smaller size flowing to its right.
- Extended the site's existing card-grid and alternating-section-band design
  system (already used on the homepage and Team) to Services, Corporate, and
  Training: Services' six offerings now render as photo+text cards; Corporate's
  bullet-list sections ("Why Organizations Choose Us", "What We Offer",
  "Who We Work With") are now card grids with alternating section bands;
  Training's "How It Works" step list gets a banded section for visual rhythm.

### Removed

- The contact page's inline "Send Us a Message" form (a `mailto:` `method="post"`
  fallback, since the site has no backend to receive a real POST) — the
  "Get in Touch" section's listed email address is now the sole contact path.
- CEI (Center for Entrepreneurial Innovation) partnership content site-wide,
  reflecting that the partnership has ended: the footer's "CEI Partner" and
  "Location" links, the homepage's CEI partner-logo section, About's
  "Partnership with CEI" and "About CEI" sections, About's meta description
  and Origin Story CEI references, Contact's CEI address line and "Our
  Partner" section, and the header's "CEI Partner" tagline. The two
  attributed Jeff Saville testimonial quotes (homepage, About) are kept
  verbatim as historical praise rather than deleted or reworded — a real
  person's quoted words aren't edited to scrub a detail they actually said.
  The three CEI-branded image assets remain in `public/assets/partners/`
  unreferenced rather than deleted.
- `/events` and its content collection (2 real upcoming Meetup events),
  the "Events" nav item, and the Meetup-polling half of
  `scripts/refresh-feeds.mjs` (the collection it fed no longer exists).
  The Services page's two CTA buttons that pointed at `/events` were
  repointed instead of deleted: "Upcoming Events" now links directly to
  the org's real Meetup group (external), and "Sessions Schedule" (renamed
  "Book a Session") now points at `/contact`. The "Recent Media &
  Highlights" section that also lived on `/events` was preserved on its
  own new `/media` page rather than removed at the time — since fully
  removed too, see below.
- `/media` and everything that only existed to support it: the
  `media-highlights` content collection and `src/content.config.ts`
  (deleted outright — with `/media` gone, zero collections remain, so an
  empty stub config would be pure dead weight), `src/content/README.md`,
  the now-fully-unused `scripts/refresh-feeds.mjs` (its only remaining
  logic, after the Meetup/events half was already removed, was checking
  feeds for media content that no longer has anywhere to go) and its
  `npm run refresh-feeds` script entry, and `FEEDS.md` (existed solely to
  document what that script polled). The "Media" nav item is removed with
  no replacement.

### Fixed

- Fixed a visible white seam on the homepage between the hero band and the
  "Who We Serve" section immediately below it — both use the same
  `--color-surface` background, but `.section`'s `margin-block` (the
  general inter-section spacing mechanism) doesn't paint a background, so
  a gap opened between two same-colored bands that were meant to read as
  one continuous band. Zeroed just that boundary's top margin
  (`.hero + .section--alt`) rather than changing the general spacing rule.
- Reconciled the 1:1 AI Training rate to `$175/hour` consistently across
  the homepage, training page, and services page — the services page had
  carried a stale `$150/hour` figure inherited from an older version of
  the source site.
- Fixed double-escaped ampersands rendering as literal `&amp;` text on 4
  section headings ("AI Consulting & Strategy", "Marketing & Growth" on
  both `/services` and `/team`) — the `Section` component's `title` prop
  had been hand-written with an HTML entity, which Astro then re-escaped
  when rendering it as text.
- Fixed excessive, inconsistent vertical whitespace between page sections
  — `.section` used `padding-block`, which doesn't collapse between
  adjacent siblings (so two stacked 4rem paddings summed to an 8rem gap);
  switched to `margin-block`, which collapses correctly to a single 4rem
  gap.
- Filled in the footer's "CEI Partner", "Location", "Email", and "Phone"
  links, which had been left as `#` placeholders — the real values
  (`ceigateway.com`, `mailto:info@ailearningcenter.ai`, phone) already
  existed elsewhere on the site (Contact/About pages) and just hadn't
  been back-filled into the footer.
