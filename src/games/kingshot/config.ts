import type { GameConfig } from '@/engine/config/types';

/**
 * Kingshot game package. Self-contained: the Core never references Kingshot
 * outside of this folder.
 *
 * Fact note: Kingshot is developed and published by Century Games (the studio
 * behind Whiteout Survival). It is a medieval 4X / tower-defence / idle
 * strategy game. Mobile release: 22 February 2025 (Android & iOS).
 */
export const kingshot: GameConfig = {
  slug: 'kingshot',
  name: 'Kingshot',
  shortName: 'Kingshot',
  tagline: 'Rebuild the kingdom, recruit heroes, survive the chaos',
  description:
    'Kingshot guides, redeem codes, heroes, tier lists and strategies for the medieval 4X strategy game by Century Games.',
  publisher: 'Century Games PTE. LTD.',
  developer: 'Century Games',
  releaseDate: '2025-02-22',
  platforms: ['Android', 'iOS'],
  genres: ['4X Strategy', 'Tower Defence', 'Idle Survival'],
  logo: '/games/kingshot/assets/images/logo.svg',
  icon: '/games/kingshot/assets/images/icon.svg',
  heroImage: '/games/kingshot/assets/images/hero.svg',
  theme: {
    mode: 'dark',
    colors: {
      primary: '#f59e0b',
      secondary: '#b45309',
      accent: '#38bdf8',
    },
    radius: 'medium',
    density: 'comfortable',
    headerStyle: 'gaming',
  },
  features: {
    codes: true,
    tierList: true,
    heroes: true,
    events: true,
    maps: false,
    builds: true,
    database: false,
    news: true,
  },
  navigation: [
    { to: '', label: 'Home' },
    { to: 'guides', label: 'Guides' },
    { to: 'codes', label: 'Codes', feature: 'codes' },
    { to: 'heroes', label: 'Heroes', feature: 'heroes' },
    { to: 'tier-list', label: 'Tier List', feature: 'tierList' },
    { to: 'events', label: 'Events', feature: 'events' },
  ],
  categories: [
    {
      slug: 'guides',
      label: 'Guides',
      feature: 'builds',
      description: 'Beginner walkthroughs, formations, progression and strategy.',
    },
    {
      slug: 'codes',
      label: 'Codes',
      feature: 'codes',
      description: 'Active gift codes and how to redeem them in game.',
    },
    {
      slug: 'heroes',
      label: 'Heroes',
      feature: 'heroes',
      description: 'Hero roster, classes, roles and investment priority.',
    },
    {
      slug: 'tier-list',
      label: 'Tier List',
      feature: 'tierList',
      description: 'Heroes ranked for the current meta across game modes.',
    },
    {
      slug: 'events',
      label: 'Events',
      feature: 'events',
      description: 'Limited-time events and what to prioritise.',
    },
  ],
  homepage: [
    'hero',
    'featured-guides',
    'popular-guides',
    'latest-guides',
    'categories',
    'games',
  ],
  seo: {
    titleTemplate: '{title} | GamesHub',
    descriptionTemplate: '{description}',
  },
  social: {
    reddit: 'https://www.reddit.com/r/Kingshot/',
  },
};
