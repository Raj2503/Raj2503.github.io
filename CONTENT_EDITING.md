# Content Editing Guide

## Profile details and metrics

Update `content/site-data.js` first. Mirror any public-facing metric changes only after the underlying claim is verified. Do not add employer-internal service names, source code, customer data or unapproved claims.

The homepage uses concise summaries; detailed technical reasoning belongs in `/work/` or a published article so the same achievement is not repeated everywhere.

## Open-source projects

Update the `openSource` entries in `content/site-data.js` after checking the public repositories. The site intentionally labels star and fork counts as a dated snapshot: counts change, so refresh both the numbers and the snapshot date together. Keep public experiments and community projects separate from production case studies.

## Adding a site article

1. Add a markdown source file under `content/articles/` with title, description, category, published date, updated date, reading time, status and slug.
2. Create a matching `writing/<slug>/index.html` from an existing article route.
3. Update the Writing index, related-article navigation, `sitemap.xml` and `rss.xml`.
4. Give the article a unique title, meta description, canonical URL, Open Graph metadata, `BlogPosting` JSON-LD and a `BreadcrumbList`.
5. Use descriptive H2 IDs and heading-anchor links. Include diagrams or code only when they clarify the engineering idea.
6. Run `npm run build`.

## Linking an external article

For a Medium or other canonical external article, add an entry to `content/articles/` with `canonicalExternalUrl`. Link to the original instead of duplicating the full article. Set `target="_blank"` and `rel="noreferrer"` on the portfolio card.

## Contact and résumé

- The contact page uses the intentionally public `raj250301@gmail.com` address from the prior site and opens a pre-filled email draft. Do not change it without confirming that it should remain public.
- Replace `assets/raj-aryan-resume.pdf` with the current public résumé, keeping the same path to avoid broken links.
- Keep portrait images optimised, descriptively named and paired with meaningful alternative text.

## Domain migration checklist

Replace `https://raj2503.github.io` across static HTML, `content/site-data.js`, `robots.txt`, `sitemap.xml`, `rss.xml` and structured data. Then run `npm run lint`, `npm run check:links` and `npm run build`.
