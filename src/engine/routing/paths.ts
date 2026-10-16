import type { SiteConfig } from '@/engine/config/types';
import type { GameConfig } from '@/engine/config/types';

/**
 * Deployment sub-path, such as "/GameInsider".
 */
export const BASE: string = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix a root-absolute path with the deployment base. */
export function withBase(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!BASE) return normalizedPath;
  if (normalizedPath === BASE || normalizedPath.startsWith(`${BASE}/`)) {
    return normalizedPath;
  }

  return `${BASE}${normalizedPath === '/' ? '' : normalizedPath}` || '/';
}

/** Base path of a game according to the site's URL structure. Includes base. */
export function gameBase(site: SiteConfig, game: GameConfig): string {
  const sub =
    site.urlStructure === 'root' && site.primaryGame === game.slug
      ? ''
      : `/games/${game.slug}`;

  return `${BASE}${sub}`;
}

/** Path to a game section, including the deployment base. */
export function sectionPath(
  site: SiteConfig,
  game: GameConfig,
  section = '',
): string {
  const base = gameBase(site, game);

  if (section) return `${base}/${section}`;
  return base || withBase('/');
}

/** Full site-relative path to a single article. */
export function articlePath(
  site: SiteConfig,
  game: GameConfig,
  category: string,
  slug: string,
): string {
  return `${sectionPath(site, game, category)}/${slug}`;
}

/**
 * Build an absolute URL.
 * Accepts either an unprefixed path or a path that already includes BASE.
 * Absolute URLs are returned unchanged.
 */
export function absoluteUrl(site: SiteConfig, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;

  const origin = `https://${site.domain}`;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const withSub = withBase(normalizedPath);

  return `${origin}${withSub === '/' ? '' : withSub}`;
}
