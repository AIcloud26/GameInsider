import type { SiteConfig } from '@/engine/config/types';
import { gameatlas } from './gameatlas/site.config';

/** Site registry. The active site is chosen at build time via SITE=<id>. */
const sites: Record<string, SiteConfig> = {
  gameatlas,
};

const activeId = (import.meta.env.SITE as string | undefined) ?? 'gameatlas';

export const site: SiteConfig = sites[activeId] ?? gameatlas;
