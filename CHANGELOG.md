# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

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

### Fixed

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
