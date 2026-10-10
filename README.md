# Game Guide Engine

Config-driven static engine for building **multiple independent English mobile
game guide sites** from one codebase. MVP ships **Kingshot** under the temporary
**GameAtlas** brand.

- **Stack:** Astro 5 · TypeScript · native CSS (CSS variables) · Markdown
- **Output:** fully static HTML, mobile-first, almost no client JS
- **Hosting:** GitHub + Cloudflare Pages (free tier)
- **Decoupling:** Core never references a game; games/sites are config + content

## Layers

| Layer | Location | Owns |
| --- | --- | --- |
| Core | `src/engine/` | components, layouts, SEO, routing, content query, registry — game-agnostic |
| Game | `src/games/<slug>/` | config + content (Markdown) + assets |
| Site | `src/sites/<id>/` | brand, domain, games list, ads, analytics |
| Content config | `src/content.config.ts` | registers each game's Markdown collection |

Pages are generated only for sections whose **feature flag** is on. Navigation,
homepage sections, SEO, ads and analytics are all config-driven.

## Commands

```bash
npm install
npm run dev          # local dev server
npm run build        # astro check (types) + production build
npm run build:fast   # build only
npm run preview      # preview the build
```

## Add a new game (no Core changes)

1. Create `src/games/<slug>/` with `config.ts` and `content/**/*.md` + assets.
2. Register it in `src/games/index.ts` and add a collection in
   `src/content.config.ts`.
3. Add the slug to a site's `games` list (`src/sites/<id>/site.config.ts`).
4. Build. Components, article page, SEO and ads are reused unchanged.

## Standalone / independent domain

Copy a site config, set `mode: 'standalone'`, `primaryGame: '<slug>'`, set the
`domain`, and optionally `urlStructure: 'root'` (game pages at `/guides`,
`/codes`... instead of `/games/<slug>/...`). Build with `SITE=<id>`.

## Deploy to Cloudflare Pages

1. Push the repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Framework preset: **Astro**. Build command: `npm run build:fast`.
   Output directory: `dist`.
4. (Optional) Add env var `SITE=gameatlas`; bind a custom domain in
   **Custom domains**.

For a future standalone game site, use its site id in `SITE` and its domain.

## Content integrity

Articles carry `verified` plus `sources`. Anything unconfirmed renders a
**“Pending verification”** badge; codes/tier strength/rewards are never invented.

## Status

MVP: 21 static pages (home, games directory, Kingshot hub + 5 sections + 7
articles, search, About/Contact/Privacy/Terms/Cookie Policy), robots.txt,
sitemap, JSON-LD. Ads/analytics components are wired but disabled (no ids).
