#!/usr/bin/env node
// Checks the org's real external feeds (see FEEDS.md) relevant to
// src/content/media-highlights. Meetup event-polling was removed when the
// /events page was removed (remove-events-page-keep-media) — there's no
// events collection left to draft into. What remains here are read-only
// reachability checks for the platforms that could eventually feed media
// highlights (YouTube video recaps); LinkedIn/Facebook have no public feed
// to poll at all.
//
// Usage: node scripts/refresh-feeds.mjs

const YOUTUBE_HANDLE_URL = "https://www.youtube.com/@SerpicoAILearningCenter";

async function main() {
  // --- YouTube ---
  try {
    const res = await fetch(YOUTUBE_HANDLE_URL, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) {
      console.warn(`YouTube: channel handle unreachable (HTTP ${res.status}) — see FEEDS.md. Not attempting the video feed until the org confirms the real channel URL.`);
    } else {
      console.warn("YouTube: handle is reachable now (previously broken) — FEEDS.md needs updating and this script needs a real channel-ID Atom-feed implementation.");
    }
  } catch (err) {
    console.warn(`YouTube: fetch error — ${err.message}`);
  }

  // --- LinkedIn / Facebook ---
  console.log("LinkedIn / Facebook: no public feed exists (see FEEDS.md) — check manually.");
}

main();
