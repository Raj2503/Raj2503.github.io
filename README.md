# Raj Aryan — Portfolio

A dependency-light, static portfolio for a backend and distributed-systems engineer. It is designed to publish directly on GitHub Pages with no client-side framework or third-party UI/runtime dependency.

## Local development

Requires Node.js 20+ and Python 3.

```bash
npm install
npm run format
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

Open `http://localhost:4173`. The site uses clean directory URLs such as `/work/` and `/writing/`.

## Project layout

- `index.html`, `work/`, `services/`, `writing/`, `about/`, `contact/` — indexable static routes.
- `site.css` — design tokens, layout, responsive states and accessibility styles.
- `site.js` — lightweight navigation, privacy-conscious interaction hooks and mailto contact hand-off.
- `content/site-data.js` — central public profile data and metrics.
- `content/articles/` — markdown metadata and editorial source notes for writing.
- `assets/` — local images, résumé and social/favicons.
- `scripts/` and `tests/` — dependency-free validation.

## Publishing to GitHub Pages

1. In the repository’s GitHub Pages settings, choose the default branch and `/ (root)` as the publishing source.
2. Ensure the custom domain is configured in GitHub Pages before changing URLs.
3. If the domain changes, update `content/site-data.js`, every canonical/OG URL, `robots.txt`, `sitemap.xml` and `rss.xml` together.
4. Run the full validation sequence before pushing.

`_headers` and `_redirects` are included for hosts such as Cloudflare Pages or Netlify. GitHub Pages ignores them safely. `index.htm` is a compatibility redirect for the retired legacy entry route.

## Analytics

No analytics vendor is included. `site.js` exposes an optional `window.portfolioAnalytics.track(event, payload)` hook for meaningful interactions only: CTA clicks, résumé downloads and contact-form hand-off. Configure a privacy-conscious adapter outside this repository if needed.

See [CONTENT_EDITING.md](CONTENT_EDITING.md) for copy, article and asset changes.
