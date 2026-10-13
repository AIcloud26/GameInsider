import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { pathToFileURL } from 'node:url';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['guides', 'codes', 'heroes', 'tier-lists', 'events']),
  game: z.string(),
  excerpt: z.string().optional(),
  cover: z.string().optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  author: z.string().default('GamesHub Editorial'),
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

// Use the file name (without extension) as the entry id. The default id is the
// path relative to base, which would duplicate the category in the URL.
const idFromFileName = ({ entry }: { entry: string }) =>
  entry.split('/').pop()!.replace(/\.(md|mdx)$/, '');

function gameCollection(game: string) {
  const base = pathToFileURL(`${process.cwd()}/src/games/${game}/content/`);
  return defineCollection({
    loader: glob({
      base,
      pattern: '**/*.md',
      generateId: idFromFileName,
    }),
    schema: articleSchema,
  });
}

export const collections = {
  kingshot: gameCollection('kingshot'),
};
