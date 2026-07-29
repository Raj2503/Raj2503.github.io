# Pointer Halo and Diagram Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centre every homepage request-flow label and add a reduced-motion-safe, whole-page soft halo for fine-pointer visitors.

**Architecture:** Correct the static SVG geometry in `index.html`, keeping the existing accessible diagram wrapper intact. Add one runtime-created, presentational halo whose pointer coordinates are committed in a single animation frame, and style it entirely in `site.css`; capability checks ensure no touch or reduced-motion visitor receives the enhancement.

**Tech Stack:** Static HTML, CSS, ES modules, Node.js built-in test runner.

---

## File structure

- `index.html` — homepage system-art SVG; owns node markup and the eight labels.
- `site.css` — owns halo presentation, SVG label typography, and capability/reduced-motion guards.
- `site.js` — owns the optional fine-pointer halo lifecycle; it must remain independent of navigation, tracking, and form code.
- `tests/site.test.mjs` — source-level regression tests for label geometry and the optional halo contract.

### Task 1: Lock down centred request-flow labels

**Files:**
- Modify: `tests/site.test.mjs:80-90`
- Modify: `index.html:54-62`
- Modify: `site.css:77-85`

- [ ] **Step 1: Write the failing geometry regression test**

  Add this test immediately after `ships progressive, reduced-motion-safe infrastructure motion` in `tests/site.test.mjs`:

  ```js
  test('centres every homepage request-flow label in its node', () => {
    const home = readFileSync('index.html', 'utf8');
    const styles = readFileSync('site.css', 'utf8');

    for (const [label, x, y] of [
      ['REQUEST', 66, 80], ['EVENT', 66, 210], ['QUERY', 66, 340],
      ['API', 230, 80], ['CACHE', 230, 210], ['INDEX', 230, 340],
      ['STORE', 385, 152], ['STREAM', 363, 287],
    ]) {
      assert.match(home, new RegExp(`<text class="node-label" x="${x}" y="${y}">${label}</text>`));
    }

    assert.match(styles, /\.system-art \.node-label \{[\s\S]*text-anchor: middle;[\s\S]*dominant-baseline: middle;/);
  });
  ```

- [ ] **Step 2: Run the focused test to prove the regression exists**

  Run:

  ```bash
  node --test --test-name-pattern="centres every homepage request-flow label" tests/site.test.mjs
  ```

  Expected: one failing subtest because the labels still use hand-tuned start positions and no `.node-label` CSS rule exists.

- [ ] **Step 3: Correct label markup and typography**

  Replace the single-line label sequence in `index.html` with these exact labels:

  ```html
  <text class="node-label" x="66" y="80">REQUEST</text><text class="node-label" x="66" y="210">EVENT</text><text class="node-label" x="66" y="340">QUERY</text><text class="node-label" x="230" y="80">API</text><text class="node-label" x="230" y="210">CACHE</text><text class="node-label" x="230" y="340">INDEX</text><text class="node-label" x="385" y="152">STORE</text><text class="node-label" x="363" y="287">STREAM</text>
  ```

  Replace the existing `.system-art text` selector in `site.css` with:

  ```css
  .system-art .node-label { fill: #a1a1a6; font: 12px var(--sans); letter-spacing: 0.04em; text-anchor: middle; dominant-baseline: middle; }
  ```

- [ ] **Step 4: Run the focused test to verify the correction**

  Run:

  ```bash
  node --test --test-name-pattern="centres every homepage request-flow label" tests/site.test.mjs
  ```

  Expected: PASS for the new label test; other tests are skipped by the name pattern.

- [ ] **Step 5: Commit the isolated geometry change**

  Run:

  ```bash
  git add index.html site.css tests/site.test.mjs
  git commit -m "Fix system diagram label alignment"
  ```

### Task 2: Add an optional, whole-page pointer halo

**Files:**
- Modify: `tests/site.test.mjs:80-110`
- Modify: `site.js:1-22`
- Modify: `site.css:14-17, 243-247`

- [ ] **Step 1: Write the failing halo contract test**

  Add this test after the geometry test in `tests/site.test.mjs`:

  ```js
  test('adds the pointer halo only for fine-pointer, motion-enabled visitors', () => {
    const styles = readFileSync('site.css', 'utf8');
    const script = readFileSync('site.js', 'utf8');

    assert.match(script, /\(hover: hover\) and \(pointer: fine\)/);
    assert.match(script, /function startPointerHalo\(\)/);
    assert.match(script, /motionPreference\?\.matches \|\| !pointerHaloQuery\?\.matches/);
    assert.match(script, /halo\.setAttribute\('aria-hidden', 'true'\)/);
    assert.match(script, /document\.addEventListener\('pointermove', handlePointerMove, \{ passive: true \}\)/);
    assert.match(script, /window\.requestAnimationFrame\(renderPointerHalo\)/);
    assert.match(styles, /\.pointer-halo \{[\s\S]*pointer-events: none;[\s\S]*position: fixed;[\s\S]*will-change: transform;/);
    assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.pointer-halo \{ display: none; \}/);
  });
  ```

- [ ] **Step 2: Run the focused test to prove the feature is absent**

  Run:

  ```bash
  node --test --test-name-pattern="adds the pointer halo" tests/site.test.mjs
  ```

  Expected: one failing subtest because no halo selector or initializer exists.

- [ ] **Step 3: Implement the guarded halo initializer**

  Insert this block after the existing `motionTargets` declaration and before the `IntersectionObserver` block in `site.js`:

  ```js
  const pointerHaloQuery = window.matchMedia?.('(hover: hover) and (pointer: fine)');

  function startPointerHalo() {
    if (motionPreference?.matches || !pointerHaloQuery?.matches) return;

    const halo = document.createElement('div');
    halo.className = 'pointer-halo';
    halo.setAttribute('aria-hidden', 'true');
    document.body.append(halo);

    let animationFrame = 0;
    let pointerX = -400;
    let pointerY = -400;

    const renderPointerHalo = () => {
      animationFrame = 0;
      halo.style.transform = `translate3d(${pointerX - 180}px, ${pointerY - 180}px, 0)`;
    };

    const handlePointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderPointerHalo);
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
  }

  startPointerHalo();
  ```

- [ ] **Step 4: Add the presentational CSS and explicit fallbacks**

  Insert the following rule directly after the global `button` rule in `site.css`:

  ```css
  .pointer-halo { position: fixed; z-index: 1; top: 0; left: 0; width: 360px; aspect-ratio: 1; pointer-events: none; border-radius: 50%; opacity: 0.78; background: radial-gradient(circle, rgba(115, 183, 255, 0.13) 0, rgba(115, 183, 255, 0.07) 34%, rgba(115, 183, 255, 0) 72%); transform: translate3d(-580px, -580px, 0); will-change: transform; }
  ```

  Add these rules inside the existing reduced-motion block at the end of `site.css`, after the `.js-motion .motion-reveal` declaration:

  ```css
  .pointer-halo { display: none; }
  ```

  Then add a separate capability fallback immediately before that reduced-motion block:

  ```css
  @media (hover: none), (pointer: coarse) {
    .pointer-halo { display: none; }
  }
  ```

- [ ] **Step 5: Run the focused test to verify the halo contract**

  Run:

  ```bash
  node --test --test-name-pattern="adds the pointer halo" tests/site.test.mjs
  ```

  Expected: PASS for the halo test; other tests are skipped by the name pattern.

- [ ] **Step 6: Commit the isolated interaction change**

  Run:

  ```bash
  git add site.css site.js tests/site.test.mjs
  git commit -m "Add subtle pointer halo interaction"
  ```

### Task 3: Validate the integrated site

**Files:**
- No source changes expected.

- [ ] **Step 1: Format and run repository checks**

  Run:

  ```bash
  npm run format
  npm run lint
  npm run typecheck
  npm test
  npm run build
  npm run check:links
  ```

  Expected: every command exits with status `0`. If formatting modifies source files, inspect the diff, rerun the checks it affects, and commit only the formatting changes with `git commit -am "Format pointer halo changes"`.

- [ ] **Step 2: Perform manual desktop and mobile smoke checks**

  Run the local server with the repository's normal preview command or static-server workflow, then verify:

  ```text
  Desktop: labels are centred within all eight shapes; halo follows a mouse pointer; header, links, cards, and contact form remain clickable.
  Mobile/touch emulation: no halo appears; the hero diagram remains legible and fits its container.
  Reduced motion: no halo, trace movement, pulse, availability ripple, or reveal animation is perceptible; all content is visible.
  ```

- [ ] **Step 3: Confirm only intended production files changed**

  Run:

  ```bash
  git status --short
  git log --oneline -3
  ```

  Expected: the two feature commits are present. Do not stage `.superpowers/` or any `autoresearch/` directory unless explicitly requested.

## Plan self-review

- **Spec coverage:** Task 1 implements exact SVG centring; Task 2 implements the fine-pointer, whole-page, non-interactive, animation-frame-batched halo and both reduced-motion and touch fallbacks; Task 3 validates build, links, responsive presentation, and interaction safety.
- **Placeholder scan:** no incomplete steps, unnamed tests, or unspecified commands remain.
- **Consistency:** `startPointerHalo`, `pointerHaloQuery`, `.pointer-halo`, and `renderPointerHalo` are defined consistently in test and implementation steps.
