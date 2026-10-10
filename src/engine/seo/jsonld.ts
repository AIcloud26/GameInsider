import type { SiteConfig } from '@/engine/config/types';
import type { GameConfig } from '@/engine/config/types';
import { absoluteUrl } from '@/engine/routing/paths';
import type { Article } from '@/engine/content/query';

export function websiteSchema(site: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.siteName,
    url: `https://${site.domain}/`,
  };
}

export function breadcrumbSchema(
  site: SiteConfig,
  trail: { label: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: absoluteUrl(site, item.path),
    })),
  };
}

export function articleSchema(
  site: SiteConfig,
  game: GameConfig,
  article: Article,
  path: string,
) {
  const d = article.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: d.title,
    description: d.description,
    datePublished: d.publishedAt.toISOString(),
    dateModified: d.updatedAt.toISOString(),
    author: { '@type': 'Organization', name: d.author },
    publisher: { '@type': 'Organization', name: site.siteName },
    mainEntityOfPage: absoluteUrl(site, path),
    about: { '@type': 'VideoGame', name: game.name },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
