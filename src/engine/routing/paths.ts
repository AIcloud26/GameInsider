import type { SiteConfig } from '@/engine/config/types';
import type { GameConfig } from '@/engine/config/types';

/**
 * Deployment sub-path. Astro exposes the configured `base` at build time as
 * `import.meta.env.BASE_URL` (always ends with "/", "/" when served from root).
 * Used so every internal href works both at "/" and under "/GameInsider/".
 */
export const BASE: string = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix a root-absolute path ("/about/") with the deployment base. */
export function withBase(path: string): string {
  if (!path.startsWith('/')) return `${BASE}/${path}`.replace(/\/+/g, '/');
  return `${BASE}${path === '/' ? '' : path}` || '/';
}

/** Base path of a game according to the site's URL structure. Includes base. */
export function gameBase(site: SiteConfig, game: GameConfig): string {
  const sub =
    site.urlStructure === 'root' && site.primaryGame === game.slug
      ? ''
      : `/games/${game.slug}`;
  return `${BASE}${sub}`;
}

/** Path to a game section, e.g. sectionPath(site, game, "codes"). */
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

/** Build an absolute URL from a site-relative path, including the base. */
export function absoluteUrl(site: SiteConfig, path: string): string {
  const origin = `https://${site.domain}`;
  const withSub = path.startsWith('http')
    ? path
    : withBase(path === '/' ? '/' : path);
  return `${origin}${withSub === '/' ? '' : withSub}`;
}
