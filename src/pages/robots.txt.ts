import type { APIRoute } from 'astro';
import { site } from '@/sites';

export const GET: APIRoute = () => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const body = `User-agent: *
Allow: /

Sitemap: https://${site.domain}${base}sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
