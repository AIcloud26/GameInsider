import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/sites/index.ts';

// The configured domain drives canonical/sitemap. Per-site builds are chosen
// with SITE=<id>; deploy targets can override via PUBLIC_SITE_URL if needed.
export default defineConfig({
  site: `https://${site.domain}`,
  integrations: [sitemap()],
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
