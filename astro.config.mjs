import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/sites/index.ts';

// The configured domain drives canonical/sitemap. The deploy target sets:
//   PUBLIC_DOMAIN  -> host (e.g. aicloud26.github.io)
//   PUBLIC_BASE    -> project sub-path (e.g. /GameInsider), "/" for a root domain
// Per-site content builds are still selected with SITE=<id>.
const BASE = (process.env.PUBLIC_BASE || '/').replace(/\/+$/, '');

/**
 * Remark plugin: prefix root-absolute internal links inside Markdown
 * (e.g. [guide](/games/...)) with the deployment base so they resolve under
 * a GitHub Pages project sub-path. External and anchor links are untouched.
 */
function remarkBaseLinks() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'link' && typeof node.url === 'string') {
        const u = node.url;
        if (u.startsWith('/') && !u.startsWith('//')) {
          const [path, hash = ''] = u.split('#');
          const prefixed = `${BASE}${path === '/' ? '' : path}` || '/';
          node.url = hash ? `${prefixed}#${hash}` : prefixed;
        }
      }
      if (Array.isArray(node.children)) node.children.forEach(walk);
    };
    walk(tree);
  };
}

export default defineConfig({
  site: `https://${site.domain}`,
  base: process.env.PUBLIC_BASE || '/',
  integrations: [sitemap()],
  markdown: { remarkPlugins: [remarkBaseLinks] },
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
