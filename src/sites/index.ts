import type { SiteConfig } from '@/engine/config/types';
import { gameatlas } from './gameatlas/site.config';

/** Site registry. The active site is chosen at build time via SITE=<id>. */
const sites: Record<string, SiteConfig> = {
  GameInsider: gameatlas,
  // Backwards-compatible alias for older build scripts/docs.
  gameatlas,
};

const activeId = (import.meta.env.SITE as string | undefined) ?? 'GameInsider';

export const site: SiteConfig = sites[activeId] ?? gameatlas;
