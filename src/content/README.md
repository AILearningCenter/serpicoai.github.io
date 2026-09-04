# Media-highlights content

This directory holds one Astro content collection (schema in
`src/content.config.ts`). Add a file, run `npm run build`, done — no code
changes needed for routine content updates.

(There was previously also an `events` collection powering an `/events`
page; it was removed — see CHANGELOG — in favor of linking visitors
directly to the org's real Meetup group. Media highlights are unaffected
and now live on `/media`.)

## Adding one media highlight

Create `src/content/media-highlights/<short-slug>.md`:

```markdown
---
title: "Recap: AI Ask Us Anything, August 2026"
date: 2026-08-20
mediaType: video
embedUrl: "https://www.youtube.com/watch?v=<real-video-id>"
summary: >
  One or two sentences on what this video/photo set shows.
---
```

`mediaType` is `video` or `photo`. Use `embedUrl` for a link to the real
video/post, or `assetPath` (e.g. `/assets/unassigned/event-1.jpg`) for a
locally-hosted photo already migrated by `public-asset-migration-review`
(see `var/asset-migration-manifest.md` for what's available there).

## Checking for new media: `scripts/refresh-feeds.mjs`

```sh
npm run refresh-feeds
```

Now just a read-only reachability check (documented in full in `FEEDS.md`
at the repo root) — it no longer writes draft files anywhere. YouTube's
channel handle currently 404s (flagged, not silently skipped); LinkedIn and
Facebook have no public feed to poll at all. All three need a manual check
now and then (visit the pages directly) to find new media to add by hand,
per "Adding one media highlight" above.
