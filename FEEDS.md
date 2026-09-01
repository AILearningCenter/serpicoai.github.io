# External feed inventory

Live-checked on 2026-08-31 (`curl`/raw fetch, not a summarizing tool). One row
per platform the org has a real, existing presence on (per
`public-asset-migration-review`'s crawl + `nav.config.ts`'s `socialLinks`).

| Platform | Public feed mechanism | Status | Notes |
|---|---|---|---|
| **Meetup** (`ai-for-entrepreneurs-and-business-leaders`) | No dedicated ICS/RSS URL is exposed anymore (`/events/ical/`, `/events.ics`, `/calendar.ics` all 404). The group page itself is server-rendered (Next.js) with a `<script id="__NEXT_DATA__" type="application/json">` block containing a real Apollo GraphQL cache — `Group:<id>.events({"filter":{"status":["ACTIVE"]},...})` lists upcoming events by ref, each `Event:<id>` object has `title`, `dateTime`, `endTime`, `venue` (ref to a `Venue:<id>` object with name/address/city/state), `description`, `eventUrl`. | **Working** — verified live: 2 real upcoming "AI Ask Us Anything" events found (2026-09-17, 2026-10-15, both at Venture Café Phoenix, 850 N 5th St). | This is the primary usable feed. Not an official API — the shape is Meetup's own internal Apollo cache and could change without notice; `refresh-feeds.mjs` fails loudly (not silently) if the expected keys disappear rather than silently returning nothing. |
| **YouTube** (`@SerpicoAILearningCenter`) | Public channel/playlist Atom feed (`youtube.com/feeds/videos.xml?channel_id=...`) needs a resolved channel ID, normally found on the channel's own page. | **Broken** — the handle itself 404s live (`curl -I https://www.youtube.com/@SerpicoAILearningCenter` → `404`, confirmed both with and without a browser User-Agent, and via `-L` follow-redirects). Same finding `public-asset-migration-review` already disclosed for this exact URL. | No channel ID is discoverable while the handle 404s. Flagged here rather than guessing a different handle — the org needs to confirm/fix the real channel URL before this feed can work at all. `refresh-feeds.mjs` reports this as "unreachable" rather than crashing. |
| **LinkedIn** (`company/serpico-ai-learning-center`) | None discoverable. LinkedIn does not expose a public RSS/Atom feed for company pages; scraping the page (200 OK, but a JS-rendered app shell with no embedded structured post data) would mean either an authenticated API or HTML scraping this plan's Constraints rule out. | **No usable public feed.** | Manual-check only — see `src/content/README.md`'s maintenance doc. |
| **Facebook** (page behind `share/1GXb9KgtDN/`) | None discoverable without the Graph API (requires an app + access token this project doesn't have). | **No usable public feed.** | Manual-check only — same as LinkedIn. |

## Summary for `refresh-feeds.mjs`

- **Meetup**: real, working, automated — the script fetches the group page and diffs its ACTIVE events against `src/content/events/`.
- **YouTube**: attempted, reported as unreachable (handle 404) rather than silently skipped, so the org sees the breakage every run until it's fixed.
- **LinkedIn / Facebook**: not attempted by the script — no public feed exists to poll. Listed here so a human/agent doing the periodic "check for cross-promotion opportunities" pass knows to check these two manually.
