import type { SiteConfig } from '@/engine/config/types';
import type { GameConfig } from '@/engine/config/types';

/** Base path of a game according to the site's URL structure. */
export function gameBase(site: SiteConfig, game: GameConfig): string {
  if (site.urlStructure === 'root' && site.primaryGame === game.slug) return '';
  return `/games/${game.slug}`;
}

/** Path to a game section, e.g. sectionPath(site, game, "codes"). */
export function sectionPath(
  site: SiteConfig,
  game: GameConfig,
  section = '',
): string {
  const base = gameBase(site, game);
  return section ? `${base}/${section}` : base || '/';
}

/** Full path to a single article. */
export function articlePath(
  site: SiteConfig,
  game: GameConfig,
  category: string,
  slug: string,
): string {
  return `${sectionPath(site, game, category)}/${slug}`;
}

/** Build an absolute URL from a path using the configured site domain. */
export function absoluteUrl(site: SiteConfig, path: string): string {
  const origin = `https://${site.domain}`;
  if (!path.startsWith('/')) return `${origin}/${path}`;
  return `${origin}${path === '/' ? '' : path}`;
}
