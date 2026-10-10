import { getCollection, type CollectionEntry } from 'astro:content';
import type { GameConfig } from '@/engine/config/types';

export type Article = CollectionEntry<'kingshot'>;

interface LoadOptions {
  category?: Article['data']['category'];
  featured?: boolean;
  popular?: boolean;
}

/** Load and sort articles for one game (collection slug === game.slug). */
export async function loadArticles(
  game: GameConfig,
  opts: LoadOptions = {},
): Promise<Article[]> {
  const entries = await getCollection(game.slug as 'kingshot', (e) => {
    if (e.data.game !== game.slug) return false;
    if (opts.category && e.data.category !== opts.category) return false;
    if (opts.featured !== undefined && e.data.featured !== opts.featured)
      return false;
    if (opts.popular !== undefined && e.data.popular !== opts.popular)
      return false;
    return true;
  });
  return entries.sort(
    (a, b) => b.data.updatedAt.valueOf() - a.data.updatedAt.valueOf(),
  );
}

/** Derive the section segment a category maps to in URLs. */
export function categoryToSection(category: Article['data']['category']): string {
  if (category === 'tier-lists') return 'tier-list';
  return category;
}

/** Estimate reading time from rendered markdown length (minutes). */
export function estimateReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
