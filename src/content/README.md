# Events & media-highlights content

This directory holds two Astro content collections (schemas in
`src/content.config.ts`). Add a file, run `npm run build`, done — no code
changes needed for routine content updates.

## Adding one event

Create `src/content/events/<short-slug>.md`:

```markdown
---
title: "Networking Night: AI for Small Business"
date: 2026-11-12
time: "6:00 PM"
location: "Center for Entrepreneurial Innovation (CEI), Phoenix, AZ"
registrationUrl: "https://www.meetup.com/ai-for-entrepreneurs-and-business-leaders/events/<real-id>/"
status: upcoming
description: >
  A one-paragraph description of the event, in your own words or trimmed
  from the real source (Meetup listing, press release, etc.) — never
  invented.
---
```

- `date` controls whether the event shows on `/events`'s "Upcoming Events"
  list — anything with `date` in the past is automatically excluded, so you
  don't need to remember to delete old entries or keep `status` perfectly in
  sync by hand (though set it anyway; it's part of the schema).
- `time`, `registrationUrl` are optional; `title`, `date`, `location`,
  `status`, `description` are required. An invalid or missing required field
  fails the build with a clear error naming the file and field.

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

## Keeping this current: `scripts/refresh-feeds.mjs`

Run it periodically (there's no scheduled job — an agent or human runs it
on request, e.g. "check for new events"):

```sh
npm run refresh-feeds
```

It polls the org's real external feeds (documented in full, including what
does and doesn't work right now, in `FEEDS.md` at the repo root) and writes
**draft** files to `var/feed-drafts/*.md` for anything genuinely new — it
never writes into `src/content/` directly. Review each draft, trim/clean it
up if needed (the source data is real but may be verbose or need light
editing), then move it into `src/content/events/` or
`src/content/media-highlights/` (renaming as you like) to publish it. Running
the script again after publishing won't re-draft the same item.

As of this writing, only **Meetup** has a working automated feed — YouTube's
channel handle currently 404s (flagged, not silently skipped) and LinkedIn/
Facebook have no public feed to poll at all, so those three need a manual
check now and then (visit the pages directly) rather than `refresh-feeds`.
