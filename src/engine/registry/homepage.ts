/**
 * Homepage section registry. Sections render in the order declared by
 * `game.homepage`. Unknown ids and sections whose feature is off are skipped.
 */
export interface HomepageSectionDef {
  id: string;
  feature?: import('@/engine/config/types').FeatureKey;
}

export const homepageRegistry: Record<string, HomepageSectionDef> = {
  hero: { id: 'hero' },
  'featured-guides': { id: 'featured-guides' },
  'popular-guides': { id: 'popular-guides' },
  'latest-guides': { id: 'latest-guides' },
  categories: { id: 'categories' },
  events: { id: 'events', feature: 'events' },
  games: { id: 'games' },
};

export function resolveHomepage(
  ids: string[],
  features: Record<string, boolean>,
): string[] {
  const out: string[] = [];
  for (const id of ids) {
    const def = homepageRegistry[id];
    if (!def) continue;
    if (def.feature && !features[def.feature]) continue;
    out.push(id);
  }
  return out;
}
