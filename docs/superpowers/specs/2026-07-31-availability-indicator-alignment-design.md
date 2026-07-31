# Availability Indicator Alignment Design

## Goal

Keep the green availability dot and its animated ripple visually centred with one another at every responsive width, including when the availability statement wraps.

## Problem

The existing dot is a flex pseudo-element centred within the availability text block, while the ripple is absolutely positioned from the parent block's top-left corner. At a one-line desktop width, the ripple centre is 5.5 px above the dot. At 390 px, the statement wraps to two lines, the dot flex-shrinks to about 5.1 px wide, and the ripple centre is about 16 px above and 2.4 px right of the dot.

## Approved approach

Add an `aria-hidden` indicator element before the availability text. It owns both visual layers:

- The element has a fixed 18 px square and cannot shrink.
- Its `::before` pseudo-element draws the 8 px green dot in the square centre.
- Its `::after` pseudo-element draws the 16 px bordered ripple in the same square centre and retains the existing `availability-ripple` animation.
- The parent availability row aligns the fixed indicator to the first line of the message, so wrapping text cannot pull the indicator towards the middle of the entire block.

## Accessibility and motion

The indicator is decorative and marked `aria-hidden="true"`. The existing availability text remains unchanged. The current reduced-motion rule continues to disable the ripple animation.

## Scope

Only the home-page availability markup, its styling, and focused static regression tests change. No text, colours, animation timing, routes, or other site components change.
