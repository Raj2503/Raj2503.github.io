# Expressive systems canvas redesign

**Status:** approved for planning

## Goal

Recompose Raj Aryan’s portfolio into a more authored, memorable experience inspired by the storytelling cadence and layered motion of the selected reference portfolio, while keeping the site immediately credible for senior backend, platform, and distributed-systems audiences.

The redesign must foreground production-system depth, evidence, and clear technical writing. It must not copy the reference’s visual assets, wording, colour language, testimonials, or product-designer positioning.

## Information architecture

The homepage remains the primary entry point, but receives a more distinct narrative rhythm:

1. **Identity and systems hero** — Raj’s portrait, concise positioning, primary actions, and an animated topology field establish an individual point of view.
2. **Operating proof** — selected scale and outcome metrics remain concise, directly below the hero.
3. **System stories** — the four engineering themes become editorial covers with an abstract, topic-specific system diagram rather than uniform cards.
4. **Engineering focus and services** — retain problem-led clarity, with calmer layouts that support scanning.
5. **Writing** — retain technical depth and direct access to the existing articles.
6. **Labs** — evolve the public-project area into a distinct home for Pacman, Career Copilot, Hindi text-to-speech, and future experiments. It explicitly separates public exploration from anonymised production work.
7. **About and contact** — retain their present clear, low-friction conversion purpose.

The work route receives matching editorial case-study covers. Writing, service, contact, and 404 pages remain more restrained, using only small entrance transitions so long-form reading and forms remain calm.

## Visual language

The visual identity is **expressive systems**: dark infrastructure surfaces, electric-blue signals, strong editorial typography, Raj’s existing portrait, and original SVG node-and-edge motifs. The hero is larger and more personal than the current layout, but never becomes a generic monitoring dashboard.

Each system story gets a visual cover assembled from reusable topology primitives:

- service boundary nodes;
- request and event paths;
- cache, index, and datastore shapes;
- sparse signal packets;
- metric or constraint labels.

Shared classes, design tokens, and accessible SVG descriptions keep the visual grammar consistent without introducing an animation framework or duplicated copy.

## Motion choreography

Motion is a composed sequence, not a collection of decorative effects.

- **Hero arrival:** identity marker, headline, supporting copy, CTAs, portrait, and topology enter in a short staggered sequence. Each layer uses transform and opacity and completes promptly.
- **Living topology:** desktop fine-pointer visitors see a sparse set of packets moving along selected SVG paths and a small node response. It is most present in the homepage hero and Labs, not every content block.
- **System-story reveal:** work covers lift and scale lightly as they enter the viewport; their diagrams resolve after the surrounding copy is visible.
- **Pointer halo repair:** the halo begins from a visible, centred low-opacity state, then follows the first eligible pointer movement. It no longer starts permanently off-canvas.

The motion pattern is informed by browser inspection of the reference’s staged approximately 800ms Framer entrances and scale-led work reveal. The implementation must use the portfolio’s own motion system and original assets.

## Accessibility, performance, and failure behaviour

All motion is progressive enhancement.

- When `prefers-reduced-motion` is enabled, there is no staged entrance, packet movement, pointer halo, or continuous signal animation; the final visual state remains visible and complete.
- Coarse/touch pointers receive static diagrams and no halo.
- SVGs have accessible names or descriptions; decorative packets are hidden from assistive technology.
- Pointer updates are animation-frame batched and transform-driven; no scroll event handler is introduced.
- Motion never blocks navigation, text selection, contact form interaction, or keyboard focus states.
- If JavaScript is unavailable, every visual has a legible static fallback.

## Implementation boundaries

The existing dependency-light static stack remains unchanged.

- `index.html`, `work/index.html`, and `site.css` contain the redesigned composition and original SVG topology variants.
- `site.js` remains the single motion controller for capability checks, pointer halo state, IntersectionObserver reveal states, and animation activation.
- `content/site-data.js` becomes the source for any new Labs and work-cover metadata that would otherwise be duplicated.
- `tests/site.test.mjs` gains source-level regression checks for topology semantics, visual labels, halo initial state, capability guards, and CTA layout rules.

No Framer migration, animation dependency, new analytics vendor, copied media asset, fake testimonial, or confidential production detail is permitted.

## Validation

Before release, run formatting, linting, syntax/type checks, tests, production build, and internal-link validation. Use a real browser to inspect every route at desktop and mobile widths, with desktop/mouse, touch/coarse pointer, and reduced-motion emulation.

The browser audit must verify:

- all CTA labels are horizontally and vertically centred;
- no page-level horizontal overflow exists;
- mobile navigation opens and closes correctly;
- the pointer halo has a visible initial desktop state, follows a pointer after movement, and cannot intercept interaction;
- all animated topology content remains understandable while static;
- the contact-form and résumé flows remain functional.

## Explicit exclusions

- No continuous animation on every route.
- No animated typing, code rain, fake console, floating technology logos, or cursor replacement.
- No copied reference layout, text, illustration, testimonials, social proof, or motion assets.
- No mobile halo or motion that makes a touch interface harder to use.

## Spec self-review

The scope is one cohesive portfolio presentation upgrade: richer homepage and work storytelling plus a shared, bounded motion language. It explicitly preserves current technical content, static fallbacks, accessibility, and the site’s lightweight implementation model. There are no placeholders, conflicting device rules, or unbounded animation requirements.
