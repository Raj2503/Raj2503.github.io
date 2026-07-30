# Hero Network Video Design

## Goal

Replace the homepage hero portrait with the selected Pexels network-flow video, while retaining Raj's portrait in the lower About section.

## Chosen visual

Use Pexels video 34336609, “Dynamic 3D Data Visualization of Network Flow,” by Nicola Narracci. The source is free to use on websites, does not require attribution and permits modification under the [Pexels License](https://www.pexels.com/license/). The site will nevertheless retain a small visible source credit linking to the original video page.

The locally served derivative will be an MP4 without audio, reduced to a hero-appropriate mobile-friendly size. A JPEG poster generated from the same source will provide a stable first render and the reduced-motion fallback.

## Layout

- Remove the `.hero-portrait` element from the homepage only; leave the lower-page `.portrait` component unchanged.
- Replace the two-track portrait/topology layout with a single `.hero-network-frame` in the existing hero visual column.
- At wide desktop widths, the video remains in the right hero column as a contained, rounded 4:5 visual card.
- Below 1200 px, copy stacks above the visual card. The card is capped at 430 px and aligned to the right on laptop, then fills the available narrow-screen width on mobile.
- Apply a dark overlay so the visual reads as infrastructure texture rather than a competing focal point.

## Motion and accessibility

- The video is decorative (`aria-hidden="true"`), muted, inline, looped and has no controls.
- The frame exposes a visible text credit link outside the decorative video.
- With `prefers-reduced-motion`, hide the animated video and show its poster as the frame background.
- Keep the existing hero content immediately visible at touch and reduced-motion breakpoints.

## Validation

- Add test-first checks that the hero no longer renders `.hero-portrait`, renders an accessible video frame and retains a source credit.
- Add test-first checks for local MP4/poster assets and the reduced-motion fallback.
- Run all existing static checks, production build and browser inspections at 1440, 1024, 768 and 390 CSS px.
