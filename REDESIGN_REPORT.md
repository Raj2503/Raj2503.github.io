# Portfolio Redesign Report

## What changed

- Replaced the legacy single-page Bootstrap/jQuery portfolio with a dependency-light static portfolio built around backend and distributed-systems credibility.
- Rewrote every public-facing section: positioning, metrics, sanitised engineering case studies, expertise, services, writing, about and contact.
- Added an original Apple-informed editorial visual system: system typography, a restrained blue action colour, high-contrast dark sections and lightweight SVG request-flow diagrams.
- Added the supplied portrait, optimised as `assets/raj-aryan.jpg`, and the supplied résumé as `assets/raj-aryan-resume.pdf`.
- Added a distinct open-source section for Career Copilot, Pacman Flutter and Hindi Text-to-Speech. Star/fork counts are explicitly labelled as a 29 July 2026 snapshot.
- Added the two supplied Medium articles as canonical external writing entries and RSS items.
- Added progressive infrastructure motion: sequenced section reveals, animated request signals, availability ripple, responsive menu staging and richer card/CTA feedback. These effects use native CSS and a small observer, with no animation dependency.
- Reframed the homepage as an expressive systems canvas: a portrait-led topology hero, four distinct system-story covers, a Labs presentation for public work and a lightweight work-route topology.
- Repaired the desktop pointer halo so it is visible on first paint and moves only for fine-pointer, motion-enabled visitors. Mobile and reduced-motion visitors receive a static, immediately readable experience.
- Corrected wrapped CTA-label alignment across the site, including “Explore services” and “Read the writing”.
- Rebuilt the hero's portrait and request-flow visual as separate responsive grid tracks, eliminating the laptop overlap. Added a 1200 px layout transition and a one-column laptop contact form so inputs and their guidance remain readable.

## Design direction

The site uses a calm, premium editorial treatment rather than a generic developer dashboard: black utility navigation, generous whitespace, compact information cards and original infrastructure motifs. The expressive systems canvas adds restrained personality through a shaped portrait, topology overlays, packet signals and topic-specific cover treatments. The visual language supports the message—systems built for traffic, failure and cost constraints—without exposing internal architecture or adding decorative animation.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Positioning, selected impact, work, expertise, services, writing, open source and conversion paths. |
| `/work/` | Four sanitised case studies: personalisation, search, retry amplification and performance/cost. |
| `/services/` | Fixed-scope architecture, reliability and performance reviews. |
| `/writing/` | Public Medium articles and maintainable site-note index. |
| `/writing/retry-amplification/` | Educational draft article. |
| `/writing/cache-boundaries/` | Educational draft article. |
| `/about/` | Engineering narrative, operating principles and résumé. |
| `/contact/` | Accessible privacy-friendly mailto contact hand-off. |
| `/404.html` | Recovery page with working mobile navigation. |

`/index.htm` remains as a compatibility redirect. See `REDIRECTS.md` for the retired-route map.

## Components and content architecture

- `site.css` contains the design tokens, responsive layouts, focus states and reduced-motion behaviour.
- `site.js` handles the accessible mobile menu, optional privacy-conscious event hook and mailto form hand-off.
- `content/site-data.js` centralises public profile links, verified metrics and dated open-source project data.
- `content/articles/` contains markdown source notes for the site articles; `CONTENT_EDITING.md` explains the publishing workflow.
- Original inline SVG diagrams represent request paths, indexing pipelines and retry multiplication without relying on proprietary assets.
- The homepage work cards use `data-topology` variants and the Labs cards use CSS-only visual treatments, keeping the different stories distinct without adding an animation library or extra image assets.

## SEO completed

- Unique titles, descriptions, canonical URLs, Open Graph and X metadata on all indexable routes.
- Semantic landmarks, logical heading hierarchy, breadcrumbs, descriptive URLs and internal links.
- JSON-LD for `Person`, `WebSite`, `ProfilePage`, `ProfessionalService`, `CollectionPage`, `BreadcrumbList`, `ContactPage` and article `BlogPosting` where appropriate.
- `robots.txt`, `sitemap.xml`, `rss.xml`, `site.webmanifest`, SVG favicon/social image and static-host redirects/headers.
- The local lint script validates required metadata and parses every JSON-LD block.

## Performance findings

- No framework runtime, UI library, web font download, image CDN, analytics vendor or third-party script is shipped.
- Critical local payloads: CSS 16 KB, JavaScript 4 KB, social SVG 4 KB and favicon SVG 4 KB. The only content image is the supplied, resized 484 KB portrait and loads below the fold.
- Layout reserves portrait dimensions, avoids large animation libraries and honours `prefers-reduced-motion`.
- Motion is progressive: content stays visible if JavaScript or `IntersectionObserver` is unavailable, mobile hero content is immediately visible, and visitors who prefer reduced motion receive no observer reveals or continuous signal effects.
- A synthetic Lighthouse run was not added because the project deliberately has no browser automation dependency. The site is structured for strong Core Web Vitals rather than claiming an unmeasured score.

## Accessibility findings

- Every route has a skip link, `main` landmark, visible keyboard focus styling and responsive navigation.
- Forms use native labels, required fields, useful placeholders and a screen-reader-safe honeypot.
- SVG diagrams use concise accessible descriptions; images use descriptive alternative text.
- The CSS supplies a reduced-motion override, a 1200 px laptop transition and mobile layouts at 900 px and 650 px. Fine-pointer halo behaviour is excluded from touch/coarse pointers.
- Automated static accessibility/discovery lint passed across all nine HTML routes. A browser-based screen-reader audit remains a recommended pre-launch check.
- The two horizontally scrollable code examples are keyboard-focusable and retain their visible focus treatment.

## Commands executed and results

| Command | Result |
| --- | --- |
| `npm install` | Passed; no vulnerabilities reported. |
| `npm run format` | Passed. |
| `npm run lint` | Passed; validates nine HTML routes and JSON-LD. |
| `npm run typecheck` | Passed. |
| `npm test` | Passed; twenty-one tests. |
| `npm run check:links` | Passed; internal links across nine HTML routes. |
| `npm run build` | Passed; runs lint, links and tests. |
| `npm run preview` + local HTTP smoke check | Every published route returned HTTP 200. |
| Chrome desktop/laptop/tablet/mobile audit | Passed: all nine routes at 1440, 1024, 768 and 390 CSS px (36 checks) had no page overflow, sibling collisions, clipped controls, off-centre buttons or hero visual intersections. Page-by-page visual checks also confirmed the work, services, writing, article, about and contact flows. |

## Remaining editable values and recommended follow-up

- **Deploy before sharing:** confirm the GitHub Pages workflow for `master` has completed before sharing the public URL.
- The canonical domain is currently `https://raj2503.github.io`. Update it consistently before using a custom domain; the exact checklist is in `README.md` and `CONTENT_EDITING.md`.
- The two site articles are intentionally labelled educational drafts. Replace or expand them with reviewed public writing when ready.
- Star/fork counts are a snapshot and should be refreshed through `content/site-data.js` when the projects change materially.
- The contact form intentionally opens an email draft; connect a secure backend form service only if server-side handling is desired.
- Run a final real-device/screen-reader pass after deployment and before a high-visibility launch.
