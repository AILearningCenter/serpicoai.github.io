# Events and Recent Media, now live

The `/events` page is no longer a placeholder. It now lists real, upcoming events pulled from Serpico AI's Meetup group, alongside a Recent Media section for photos and video highlights — and both are built so an agent (or a human) can keep them current by dropping in a markdown file, no code changes required.

## What's new

Two upcoming "AI: Ask Us Anything" sessions are live on the site now, both at Venture Café Phoenix:

- September 17, 2026
- October 15, 2026

They're sourced from real data — not placeholders — pulled from the Meetup group's own event listings.

## How it stays current

Adding a new event or media highlight is a single markdown file with frontmatter, dropped into `src/content/events/` or `src/content/media-highlights/`. The site picks it up automatically on the next build; past-dated events are excluded from the "Upcoming Events" list without any manual cleanup.

To help find what to add, `npm run refresh-feeds` polls the org's real external feeds — Meetup, YouTube, and a documented fallback for LinkedIn/Facebook (see `FEEDS.md`) — and writes draft stubs for anything new to `var/feed-drafts/`. It never publishes automatically; a person or agent still turns each draft into a real, reviewed content entry. Re-running it with nothing new to report writes nothing.

## Docs

`src/content/README.md` has the exact frontmatter shape for both content types and how to run the refresh script.
