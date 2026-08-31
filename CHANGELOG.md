# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial Astro-based static site foundation: shared layout, all page
  routes, SEO basics (sitemap, robots.txt, canonical/OG tags), and a
  minimal local preview server.
- Git repository initialized with `main`/`dev` branches.
- Repo hygiene: `README.md`, `SECURITY.md`, `.editorconfig`.
- Real site logo (header mark + hero graphic), favicon, and footer social
  links (LinkedIn, YouTube, Meetup, Facebook) migrated from the source Wix
  site into `public/assets/` and wired into `Header.astro`, `BaseLayout.astro`,
  `Hero.astro`, and `Footer.astro`.
- `public/assets/` now also holds 38 additional approved-but-not-yet-wired
  images (team headshots, services photography, partner logos, about-page
  photos) awaiting real page copy before they can be placed.
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

### Fixed

- Reconciled the 1:1 AI Training rate to `$175/hour` consistently across
  the homepage, training page, and services page — the services page had
  carried a stale `$150/hour` figure inherited from an older version of
  the source site.
