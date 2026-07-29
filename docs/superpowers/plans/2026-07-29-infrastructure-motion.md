# Infrastructure Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio feel more polished and responsive through lightweight infrastructure-inspired motion without compromising accessibility or page speed.

**Architecture:** Keep all animation styles in `site.css` and use `site.js` only to opt into progressive enhancement and expose elements to an `IntersectionObserver`. Content remains visible when JavaScript is unavailable. A single observer supplies stagger indexes and `is-visible` state; CSS owns all timing and reduced-motion behaviour.

**Tech Stack:** Static HTML, modern CSS animations/transitions, browser `IntersectionObserver`, Node built-in test runner.

---

### Task 1: Lock progressive-motion behaviour with tests

**Files:**
- Modify: `tests/site.test.mjs`
- Test: `tests/site.test.mjs`

- [x] **Step 1: Write the failing test**

```js
test('ships progressive, reduced-motion-safe infrastructure motion', () => {
  const styles = readFileSync('site.css', 'utf8');
  const script = readFileSync('site.js', 'utf8');
  assert.match(styles, /\.js-motion \.motion-reveal/);
  assert.match(styles, /@keyframes signal-pulse/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /motion-reveal/);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/site.test.mjs`

Expected: the new motion test fails because the hooks do not yet exist.

### Task 2: Add progressive reveal and interaction motion

**Files:**
- Modify: `site.js`
- Modify: `site.css`
- Test: `tests/site.test.mjs`

- [x] **Step 1: Add JavaScript-only reveal state**

```js
document.documentElement.classList.add('js-motion');
const motionTargets = document.querySelectorAll('.section-head, .work-card, .expertise-card, .service, .article-card, .service-detail, .metric, .case-study section, .contact-form, .contact-links, .portrait, .quote');
```

Give each target a stagger index. Observe targets with `IntersectionObserver`, adding `is-visible` once each target enters the viewport; if the API is unavailable, immediately reveal all targets.

- [x] **Step 2: Add CSS motion primitives**

```css
.js-motion .motion-reveal { opacity: 0; transform: translateY(18px); }
.js-motion .motion-reveal.is-visible { animation: reveal-up 620ms cubic-bezier(.22, 1, .36, 1) both; }
```

Add a short, bounded stagger, navigation underline feedback, card elevation/arrow movement, signal-node pulse, and availability indicator ripple. Use existing colours and no gradients or third-party library.

- [x] **Step 3: Preserve reduced-motion and accessibility**

Within the existing `prefers-reduced-motion` block, make reveal targets immediately visible and disable continuous signal effects. Keep focus styles intact and never hide content before JavaScript applies `js-motion`.

- [x] **Step 4: Run test to verify it passes**

Run: `node --test tests/site.test.mjs`

Expected: all tests pass, including the new progressive-motion test.

### Task 3: Validate layout and interaction safety

**Files:**
- Modify: `REDESIGN_REPORT.md`
- Test: `tests/site.test.mjs`

- [x] **Step 1: Run the complete validation sequence**

Run: `npm run format`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run check:links`, and `npm run build`.

Expected: every command succeeds.

- [x] **Step 2: Inspect desktop and mobile rendering**

Use local Chrome at 1440 px and 390 px to verify no page-level overflow, reveal classes become visible, motion remains subtle, and reduced-motion CSS retains visible content.

- [x] **Step 3: Record findings**

Add the animation pass and validation result to `REDESIGN_REPORT.md` without claiming synthetic performance scores.
