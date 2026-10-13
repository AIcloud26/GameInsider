import { BASE } from './paths';

/**
 * Prefix a `public/` asset path ("/favicon.svg", "/games/.../hero.svg") with
 * the deployment base. Use for every <img src>/<link href> to static assets.
 */
export function asset(path: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith('data:')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}`.replace(/\/+/g, '/') || '/';
}
