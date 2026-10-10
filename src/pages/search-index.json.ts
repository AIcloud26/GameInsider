import type { APIRoute } from 'astro';
import { site } from '@/sites';
import { games } from '@/games';
import { loadArticles, categoryToSection } from '@/engine/content/query';
import { articlePath } from '@/engine/routing/paths';

export const GET: APIRoute = async () => {
  const index: {
    title: string;
    description: string;
    game: string;
    section: string;
    path: string;
    updatedAt: string;
  }[] = [];

  for (const game of games) {
    if (!site.games.includes(game.slug)) continue;
    const articles = await loadArticles(game);
    for (const a of articles) {
      const section = categoryToSection(a.data.category);
      index.push({
        title: a.data.title,
        description: a.data.description,
        game: game.name,
        section,
        path: articlePath(site, game, section, a.id),
        updatedAt: a.data.updatedAt.toISOString().slice(0, 10),
      });
    }
  }

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
