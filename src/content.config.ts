import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const ctaSchema = z.object({
  text: z.string(),
  email: z.string().email(),
  subject: z.string(),
});

const hero = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/hero" }),
  schema: z.object({
    label: z.string(),
    headingLine1: z.string(),
    headingLine2: z.string(),
    headingLine3: z.string(),
    headingLine4: z.string(),
    subtitle: z.string(),
    cta: ctaSchema,
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/about" }),
  schema: z.object({
    paragraphs: z.array(
      z.object({
        variant: z.enum(["body", "emphasis", "italic"]),
        text: z.string(),
      }),
    ),
    cta: ctaSchema,
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    badge: z.string(),
    videos: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        src: z.string().optional(),
        thumbnail: z.string().optional(),
      }),
    ),
    reviews: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        review: z.string(),
        photo: z.string().optional(),
      }),
    ),
    cta: z.object({
      headline: z.string(),
      text: z.string(),
      email: z.string().email(),
      subject: z.string(),
    }),
  }),
});

export const collections = { hero, about, testimonials };
