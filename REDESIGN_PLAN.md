# Portfolio Redesign Plan

## Existing-state findings

- The repository is a dependency-light static site: `index.htm`, legacy CSS and JavaScript, image/font assets, and no package manifest, framework, build command, tests, linting, deployment configuration or analytics integration.
- The current page depends on Bootstrap, jQuery and Font Awesome CDNs, uses a typing effect and generic portfolio content, and has no sitemap, robots file, canonical URL, social metadata, structured data or meaningful page-specific metadata.
- The existing static-hosting model is useful and will be retained. The old interface, scripts, styles and unused assets will be removed.
- Public-profile research was used only to corroborate supplied claims. Company-internal names, schemas and implementation details will not be included.

## Proposed information architecture

- `/` — positioning, evidence-backed metrics, selected work, expertise, services, writing preview, about and conversion points.
- `/work/` — four sanitised engineering case studies.
- `/services/` — fixed-scope architecture, reliability and performance reviews.
- `/writing/` — article index and category discovery.
- `/writing/retry-amplification/` and `/writing/cache-boundaries/` — clearly marked educational drafts with a reusable article template.
- `/about/` and `/contact/` — focused narrative and a low-friction contact path.
- `/404.html` — useful recovery route.

## Visual direction

An Apple-informed editorial system: a black utility navigation bar, confident system typography, purposeful action blue, generous whitespace and full-bleed alternating parchment and near-black sections. The visual subject is an original inline SVG request-flow motif rather than photography or stock art. It will use thin architectural lines, queue markers and health signals—subtle enough to support the work, never resemble a dashboard.

## Component architecture

- A shared stylesheet with layout, typography, responsive and accessibility tokens.
- A shared `site.js` module for the accessible mobile navigation, contact-form hand-off and privacy-conscious interaction hooks.
- A central `content/site-data.js` file for public links, personal data, metrics, service definitions and case-study summaries.
- Reusable static page shells, case-study and article patterns; all pages use semantic landmarks and shared navigation/footer markup.
- A small Node validation suite checks routes, metadata, robots/sitemap/RSS coverage and internal links without adding dependencies.

## Content strategy

The copy will lead with operational scale, trade-offs and business outcomes. Case studies will use generalised system descriptions and explicitly label withheld implementation details. Writing seeds will be educational drafts, not presented as factual incident reports. The only public links included are the supplied LinkedIn and GitHub profiles; a resume link will be included after the supplied PDF is copied as a public static asset.

## SEO strategy

- Unique page titles, descriptions, canonical URLs, Open Graph and X metadata.
- Semantic heading hierarchy, descriptive URLs, in-page/route-level internal links and a 404 page.
- JSON-LD for `Person`, `WebSite`, `ProfilePage`, `ProfessionalService`, `BreadcrumbList` and `BlogPosting` where applicable.
- `robots.txt`, XML sitemap, RSS, manifest, favicon and a lightweight SVG social image.
- A placeholder canonical domain is centralised in `content/site-data.js` and documented for replacement before publishing.

## Implementation stages

1. Add a failing structural validation test and record the legacy baseline.
2. Remove the legacy site content and create the reusable static design system and source data.
3. Build the homepage, work, services, writing, about, contact and article routes with original inline diagrams.
4. Add SEO, structured data, feed, sitemap, robots, redirects, manifest, resume asset and privacy-conscious analytics hook.
5. Add content-editing/deployment documentation and a final redesign report.
6. Run formatting, structural tests, link checks, production static-server checks and mobile/desktop visual inspection; record the results.

## Validation checklist

- [x] All legacy CDN dependencies and unused code removed.
- [x] Responsive layout rules cover wide, tablet and narrow viewports.
- [x] Keyboard navigation, skip link, focus states, form labels and reduced-motion support verified in source and automated checks.
- [x] Canonical URLs, metadata, JSON-LD, sitemap, robots, RSS and manifest verified.
- [x] No confidential service names, private code, secrets or unverified claims introduced.
- [x] Static validation tests and link checks pass.
- [x] A local production-style server returned HTTP 200 for every published route.
