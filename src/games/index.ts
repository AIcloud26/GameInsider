import type { GameConfig } from '@/engine/config/types';
import { kingshot } from './kingshot/config';

/** Registry of all installed games. Add a new game by importing it here. */
export const games: GameConfig[] = [kingshot];

export const gameBySlug = (slug: string): GameConfig | undefined =>
  games.find((g) => g.slug === slug);
