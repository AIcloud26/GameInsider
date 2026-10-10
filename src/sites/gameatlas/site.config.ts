import type { SiteConfig } from '@/engine/config/types';

/**
 * GameAtlas (MVP hub site). Temporary umbrella brand; Kingshot is the primary
 * game. Domains/ads/analytics are config-only and contain no fabricated ids.
 */
export const gameatlas: SiteConfig = {
  id: 'gameatlas',
  siteName: 'GameAtlas',
  domain: 'gameatlas.pages.dev',
  mode: 'hub',
  primaryGame: 'kingshot',
  games: ['kingshot'],
  layout: 'editorial',
  urlStructure: 'subpath',
  showGamesDirectory: true,
  showMultiGameNavigation: true,
  seo: {
    defaultTitle:
      'GameAtlas — Mobile Game Guides, Codes, Tier Lists & Strategies',
    defaultDescription:
      'Trusted English guides, redeem codes, hero tier lists and strategies for popular mobile games. Mobile-first and kept up to date.',
    titleTemplate: '%s | GameAtlas',
  },
  ads: {
    enabled: false,
    positions: { header: false, inContent: false, sidebar: false, footer: false },
  },
  analytics: {},
};
