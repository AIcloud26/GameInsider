import type { SiteConfig } from '@/engine/config/types';

/**
 * GameInsider production site. Kingshot is the launch game; the engine is kept
 * game-agnostic so more titles can be added via config + content only.
 *
 * Production deployment: custom domain on GitHub Pages (site root)
 *   https://gameinsider.space/  (PUBLIC_DOMAIN + PUBLIC_BASE set at build time)
 *
 * Domains/ads/analytics are config-only and contain no fabricated ids.
 */
export const gameatlas: SiteConfig = {
  id: 'gameinsider',
  siteName: 'GameInsider',
  domain: process.env.PUBLIC_DOMAIN ?? 'gameinsider.space',
  mode: 'hub',
  primaryGame: 'kingshot',
  games: ['kingshot'],
  layout: 'editorial',
  urlStructure: 'subpath',
  showGamesDirectory: true,
  showMultiGameNavigation: true,
  seo: {
    defaultTitle:
      'GameInsider — Kingshot Guides, Gift Codes, Tier Lists & Strategies',
    defaultDescription:
      'Trusted Kingshot guides, redeem codes, hero tier lists, formations and event strategies for mobile players. Mobile-first and kept up to date.',
    titleTemplate: '%s | GameInsider',
  },
  ads: {
    enabled: false,
    positions: { header: false, inContent: false, sidebar: false, footer: false },
  },
  analytics: {},
};
