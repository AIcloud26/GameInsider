/**
 * Core configuration type system.
 * The Core never imports concrete games/sites; it only depends on these types.
 */

export type ThemeMode = 'dark' | 'light';
export type Radius = 'none' | 'small' | 'medium' | 'large';
export type Density = 'compact' | 'comfortable';
export type HeaderStyle = 'gaming' | 'editorial';

export interface ThemeConfig {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  radius: Radius;
  density: Density;
  headerStyle: HeaderStyle;
}

export type FeatureKey =
  | 'codes'
  | 'tierList'
  | 'heroes'
  | 'events'
  | 'maps'
  | 'builds'
  | 'database'
  | 'news';

export type FeatureFlags = Record<FeatureKey, boolean>;

export interface NavItem {
  /** Route segment under the game base path, e.g. "guides". Home uses "". */
  to: string;
  label: string;
  /** Which feature must be enabled for this item to appear. */
  feature?: FeatureKey;
}

export interface CategoryConfig {
  /** Path segment, unique per game. */
  slug: string;
  label: string;
  feature: FeatureKey;
  description: string;
}

export interface SeoGameDefaults {
  titleTemplate: string;
  descriptionTemplate: string;
}

export interface SocialLinks {
  discord?: string;
  reddit?: string;
  twitter?: string;
  youtube?: string;
}

export interface GameConfig {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  publisher: string;
  developer: string;
  releaseDate: string;
  platforms: string[];
  genres: string[];
  logo: string;
  icon: string;
  heroImage: string;
  theme: ThemeConfig;
  features: FeatureFlags;
  navigation: NavItem[];
  categories: CategoryConfig[];
  homepage: string[];
  seo: SeoGameDefaults;
  social: SocialLinks;
}

export interface AdsConfig {
  enabled: boolean;
  /** Real network / slot ids only. Empty values render nothing. */
  client?: string;
  slots?: Record<string, string>;
  positions: {
    header: boolean;
    inContent: boolean;
    sidebar: boolean;
    footer: boolean;
  };
}

export interface AnalyticsConfig {
  googleAnalyticsId?: string;
  googleSearchConsole?: string;
}

export type SiteMode = 'standalone' | 'hub';
export type UrlStructure = 'root' | 'subpath';
export type LayoutId = 'editorial' | 'wiki' | 'guide' | 'minimal';

export interface SiteConfig {
  id: string;
  siteName: string;
  domain: string;
  mode: SiteMode;
  primaryGame: string | null;
  games: string[];
  layout: LayoutId;
  urlStructure: UrlStructure;
  showGamesDirectory: boolean;
  showMultiGameNavigation: boolean;
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    titleTemplate: string;
  };
  ads: AdsConfig;
  analytics: AnalyticsConfig;
}
