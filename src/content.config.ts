import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(),
    location: z.string(),
    registrationUrl: z.string().url().optional(),
    status: z.enum(["upcoming", "past"]),
    description: z.string(),
  }),
});

const mediaHighlights = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/media-highlights" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    relatedEvent: z.string().optional(),
    mediaType: z.enum(["photo", "video"]),
    embedUrl: z.string().url().optional(),
    assetPath: z.string().optional(),
    summary: z.string(),
  }),
});

export const collections = { events, "media-highlights": mediaHighlights };
