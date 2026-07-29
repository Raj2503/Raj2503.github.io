# Senior QA Report — 29 July 2026

## Scope

Local Chrome QA covered every published route:

- `/`, `/work/`, `/services/`, `/writing/`, `/writing/retry-amplification/`, `/writing/cache-boundaries/`, `/about/`, `/contact/` and `/404.html`.
- Viewport widths: 1440 px, 768 px, 390 px and 320 px.
- Navigation, skip links, metadata, responsive overflow, portrait aspect ratio, code-block access and contact-form scenarios.

## Local results

- All 36 route/viewport combinations had one H1, a skip link, the expected navigation state and no page-level horizontal overflow.
- The portrait retained a 1:1 rendered aspect ratio at every checked width.
- Mobile menus opened and closed on every route with matching `aria-expanded`, control labels and six navigation links.
- The contact form blocks incomplete required submissions. A valid submission issued the expected prefilled `mailto:` URL for `raj250301@gmail.com`; no third-party form request is used. The visitor must still have a configured mail client to send the email.
- Scrollable article code blocks stay within the page, are labelled and now receive keyboard focus (`tabindex="0"`).
- Local build checks passed: formatter, lint, type check, 10 automated tests, internal-link validation and production build.

## Findings and resolution

| Severity | Finding | Status |
| --- | --- | --- |
| P2 | Article code examples forced horizontal page overflow below tablet widths. | Fixed with a shrinkable grid track and `min-width: 0`; rechecked at 768 px, 390 px and 320 px. |
| P2 | Horizontally scrollable code blocks could not receive keyboard focus. | Fixed by adding `tabindex="0"` to both labelled code blocks; browser focus recheck passed. |
| P0 | The public GitHub Pages URL serves the former portfolio; new routes return 404. | Open: publish this rebuild before sending the public URL to anyone. |

## Public deployment status

Web inspection found the current public homepage still uses the old “Hey There! / I am Raj :)” content. This is a deployment state, not a local build defect. No deployment or push was performed during QA.
