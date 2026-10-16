import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { pathToFileURL } from 'node:url';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['guides', 'codes', 'heroes', 'tier-lists', 'events']),
  game: z.string(),
  excerpt: z.string().optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  author: z.string().default('GameInsider Editorial'),
  readingTime: z.number().optional(),
  featured: z.boolean().default(false),
  popular: z.boolean().default(false),
  verified: z.boolean().default(false),
  sources: z.array(z.string()).default([]),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  related: z.array(z.string()).default([]),
  seo: z
    .object({ title: z.string().optional(), description: z.string().optional() })
    .optional(),
});

// Astro's glob loader resolves a string base against config.root, so pass a
// file:// URL to point at a game package that lives outside src/content.
function gameCollection(game: string) {
  const dir = pathToFileURL(
    `${process.cwd()}/src/games/${game}/content/`,
  );
  return defineCollection({
    loader: glob({ base: dir, pattern: '**/*.md' }),
    schema: articleSchema,
  });
}

export const collections = {
  kingshot: gameCollection('kingshot'),
};
