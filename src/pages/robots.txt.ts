import type { APIRoute } from 'astro';
import { site } from '@/sites';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: https://${site.domain}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
