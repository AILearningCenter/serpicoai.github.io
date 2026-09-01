#!/usr/bin/env node
// Polls the org's real external feeds (see FEEDS.md) and writes DRAFT
// markdown stubs for genuinely new items into var/feed-drafts/ for a human
// or agent to review and turn into real src/content/events|media-highlights
// entries. Never writes directly into src/content/ — see this plan's
// Constraints ("never auto-publish scraped feed content verbatim").
//
// Usage: node scripts/refresh-feeds.mjs

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EVENTS_DIR = path.join(ROOT, "src/content/events");
const DRAFTS_DIR = path.join(ROOT, "var/feed-drafts");
const MEETUP_GROUP_URL = "https://www.meetup.com/ai-for-entrepreneurs-and-business-leaders/";
const YOUTUBE_HANDLE_URL = "https://www.youtube.com/@SerpicoAILearningCenter";

function readExistingUrls(dir) {
  const urls = new Set();
  if (!existsSync(dir)) return urls;
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".md")) continue;
    const text = readFileSync(path.join(dir, file), "utf8");
    const m = text.match(/registrationUrl:\s*"?([^"\n]+)"?/);
    if (m) urls.add(m[1].trim());
  }
  return urls;
}

function extractNextData(html) {
  const m = html.match(
    /<script id="__NEXT_DATA__" type="application\/json"[^>]*>([\s\S]*?)<\/script>/
  );
  if (!m) throw new Error("Meetup page: could not find __NEXT_DATA__ script tag — page structure may have changed");
  return JSON.parse(m[1]);
}

async function fetchMeetupActiveEvents() {
  const res = await fetch(MEETUP_GROUP_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (refresh-feeds.mjs; see FEEDS.md)" },
  });
  if (!res.ok) throw new Error(`Meetup group page fetch failed: HTTP ${res.status}`);
  const html = await res.text();
  const data = extractNextData(html);
  const apollo = data?.props?.pageProps?.__APOLLO_STATE__;
  if (!apollo) throw new Error("Meetup page: __NEXT_DATA__ has no __APOLLO_STATE__ — page structure may have changed");

  const groupKey = Object.keys(apollo).find((k) => k.startsWith("Group:"));
  if (!groupKey) throw new Error("Meetup page: no Group:<id> entry in Apollo state");
  const activeKey = Object.keys(apollo[groupKey]).find(
    (k) => k.startsWith("events(") && k.includes('"ACTIVE"')
  );
  if (!activeKey) throw new Error("Meetup page: no ACTIVE-events query key on the group — page structure may have changed");

  const edges = apollo[groupKey][activeKey]?.edges ?? [];
  return edges.map((edge) => {
    const ev = apollo[edge.node.__ref];
    const venue = ev.venue?.__ref ? apollo[ev.venue.__ref] : null;
    return {
      id: ev.id,
      title: ev.title,
      dateTime: ev.dateTime,
      eventUrl: ev.eventUrl,
      description: ev.description,
      location: venue ? `${venue.name}, ${venue.address}, ${venue.city}, ${venue.state}` : "TBD",
    };
  });
}

function toEventDraftMarkdown(ev) {
  const date = new Date(ev.dateTime);
  const isoDate = date.toISOString().slice(0, 10);
  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Phoenix" }) + " MST";
  const shortDescription = (ev.description || "").split("\n").filter(Boolean)[0] ?? "";
  return `---
# DRAFT from scripts/refresh-feeds.mjs (Meetup) — review before moving into
# src/content/events/. Trim the description, keep facts as found, do not
# invent details this feed didn't provide.
title: "${ev.title.replace(/"/g, '\\"')}"
date: ${isoDate}
time: "${time}"
location: "${ev.location.replace(/"/g, '\\"')}"
registrationUrl: "${ev.eventUrl}"
status: upcoming
description: >
  ${shortDescription.replace(/"/g, '\\"')}
---
`;
}

async function main() {
  mkdirSync(DRAFTS_DIR, { recursive: true });
  const known = new Set([...readExistingUrls(EVENTS_DIR), ...readExistingUrls(DRAFTS_DIR)]);

  let wrote = 0;

  // --- Meetup ---
  try {
    const events = await fetchMeetupActiveEvents();
    console.log(`Meetup: found ${events.length} active (upcoming) event(s).`);
    for (const ev of events) {
      if (known.has(ev.eventUrl)) {
        console.log(`  already known, skipping: ${ev.title} (${ev.eventUrl})`);
        continue;
      }
      const slug = `meetup-${ev.id}.md`;
      const outPath = path.join(DRAFTS_DIR, slug);
      writeFileSync(outPath, toEventDraftMarkdown(ev));
      console.log(`  NEW draft written: var/feed-drafts/${slug} — ${ev.title}`);
      wrote += 1;
    }
  } catch (err) {
    console.error(`Meetup: FAILED — ${err.message}`);
  }

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

  console.log(`\nDone. ${wrote} new draft(s) written to var/feed-drafts/.`);
}

main();
