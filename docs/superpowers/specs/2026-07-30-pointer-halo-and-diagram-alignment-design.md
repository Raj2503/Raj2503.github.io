# Pointer halo and diagram alignment

**Status:** approved for planning

## Goal

Correct the misaligned labels in the homepage request-flow diagram and introduce a whole-page, soft pointer halo that makes the portfolio feel more responsive without compromising its infrastructure-focused, editorial visual identity.

## Scope

The homepage request-flow SVG (`REQUEST`, `EVENT`, `QUERY`, `API`, `CACHE`, `INDEX`, `STORE`, and `STREAM`) will use a shared label class, middle text anchoring, a middle dominant baseline, and the exact centre coordinate of the node it describes. No explanatory text or diagram topology changes.

The site will have one decorative, `aria-hidden` pointer halo. It is enabled only when all of the following are true:

- the device has a fine pointer and supports hover;
- `prefers-reduced-motion` is not enabled; and
- JavaScript is available.

The halo will be a low-opacity radial light that follows the pointer across the viewport. It will be non-interactive, will not affect document layout, will render below sticky navigation and interactive controls, and will preserve readable foreground text on light and dark sections. Existing card hover states remain the primary local interaction feedback.

## Architecture

`index.html` receives only the corrected SVG label attributes and coordinates.

`site.js` gains a small, self-contained pointer-halo initializer. It creates the decorative element at runtime, returns immediately for unsuitable capabilities or motion settings, listens to pointer movement only while active, and batches visual updates through one `requestAnimationFrame` callback. It has no dependency on navigation, analytics, form handling, or content data.

`site.css` owns the visual styling: halo size, colour, opacity, fixed positioning, non-interactive pointer behaviour, and the capability/reduced-motion safeguards. Movement is performed with `transform` rather than layout-affecting properties. The existing request traces and node pulses remain restrained and continue to be disabled by the global reduced-motion rule.

## Accessibility and failure behaviour

The halo is presentational only (`aria-hidden`, `pointer-events: none`) and cannot receive focus or intercept links, forms, text selection, or navigation. On touch-first, keyboard-only, JavaScript-disabled, unsupported, or reduced-motion contexts, it does not exist; the site remains complete and visually coherent. The SVG retains its existing accessible image label while its individual text labels are made geometrically correct.

## Validation

Add regression tests that assert centred SVG label treatment, guarded fine-pointer setup, animation-frame batching, and reduced-motion coverage. Run the repository formatter, linter, syntax/type check, test suite, production build, and link check. Manually inspect the homepage at desktop and mobile widths, with and without reduced motion, and confirm that the halo cannot block header, card, link, or form interactions.

## Explicit exclusions

- No animation library or new runtime dependency.
- No cursor replacement, custom pointer, cursor-following text, or click effect.
- No interaction on touch devices.
- No cross-document route transitions, scroll-driven line drawing, analytics changes, or content changes.

## Spec self-review

No placeholders, ambiguous capability rules, or unbounded visual effects remain. The feature is constrained to the existing HTML, CSS, JavaScript, and tests; it does not require a separate subsystem or change the portfolio's information architecture.
