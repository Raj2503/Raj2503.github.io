# Expressive Systems Canvas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recompose the homepage and engineering-work presentation into an expressive systems portfolio with an accessible living-topology motion language and a visible initial halo state.

**Architecture:** Keep the static HTML/CSS/ES-module stack. Static markup owns the content and semantic fallback; shared CSS classes and `data-topology` variants own the visual system; `site.js` activates optional motion only for eligible desktop visitors. The existing `IntersectionObserver` remains the reveal seam, while the pointer halo starts from a centred visible position instead of an off-canvas position.

**Tech Stack:** Static HTML, CSS, SVG, browser Web APIs, Node.js built-in test runner.

---

## File structure

- `index.html` — expressive homepage hero, four system-story covers, and Labs presentation.
- `work/index.html` — engineering-work page hero canvas and topic-specific cover framing.
- `site.css` — design tokens, visual cover variants, responsive layout, staged motion, topology packet movement, and static fallbacks.
- `site.js` — motion capability checks, visible initial halo state, pointer updates, and existing reveal orchestration.
- `tests/site.test.mjs` — source-level regression coverage for the new structure and motion contract.

### Task 1: Establish the expressive hero and topology semantics

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `index.html`
- Modify: `site.css`

- [ ] **Step 1: Add the failing homepage composition test**

  Add this test after the existing pointer-halo test:

  ```js
  test('presents Raj through an expressive but accessible systems hero', () => {
    const home = readFileSync('index.html', 'utf8');
    const styles = readFileSync('site.css', 'utf8');

    assert.match(home, /class="hero-copy"/);
    assert.match(home, /class="hero-portrait"/);
    assert.match(home, /class="system-art topology-canvas"/);
    assert.match(home, /class="topology-packet"/);
    assert.match(home, /aria-label="Abstract request flow across a resilient distributed system"/);
    assert.match(styles, /\.hero-copy \{[\s\S]*position: relative;/);
    assert.match(styles, /\.hero-portrait \{[\s\S]*overflow: hidden;/);
    assert.match(styles, /\.topology-packet \{[\s\S]*animation:/);
  });
  ```

- [ ] **Step 2: Run the focused test and confirm the current homepage fails**

  Run:

  ```bash
  node --test --test-name-pattern="presents Raj through an expressive" tests/site.test.mjs
  ```

  Expected: one failing subtest because the current hero has no portrait layer or topology packet class.

- [ ] **Step 3: Replace the homepage hero composition**

  Keep the current semantic `<section class="hero void on-dark">`, heading, copy, actions, availability statement, and SVG accessible name. Change the two grid children to a `.hero-copy` group and a `.hero-visual` group. Add the portrait as a real image with the existing asset and explicit alt text:

  ```html
  <div class="hero-copy">
    <p class="eyebrow">Raj Aryan · Backend &amp; distributed systems</p>
    <h1>Systems that keep their shape under real-world traffic.</h1>
    <p class="lede">I design and operate high-throughput backend systems where milliseconds, failure modes and infrastructure cost directly affect product outcomes.</p>
    <!-- keep existing button row and availability statement -->
  </div>
  <div class="hero-visual">
    <figure class="hero-portrait"><img src="/assets/raj-aryan.jpg" width="1400" height="1400" fetchpriority="high" alt="Raj Aryan in a yellow kurta"></figure>
    <div class="system-art topology-canvas" aria-label="Abstract request flow across a resilient distributed system" role="img">
      <!-- keep the existing SVG paths, nodes, labels, and add packet circles -->
    </div>
  </div>
  ```

  Add three decorative packet circles inside the existing SVG after the trace path:

  ```html
  <circle class="topology-packet packet-one" cx="66" cy="80" r="4" aria-hidden="true"/>
  <circle class="topology-packet packet-two" cx="230" cy="210" r="4" aria-hidden="true"/>
  <circle class="topology-packet packet-three" cx="356" cy="287" r="4" aria-hidden="true"/>
  ```

- [ ] **Step 4: Add the hero visual rules and responsive fallback**

  In `site.css`, add a `.hero-visual` stacking context, a shaped `.hero-portrait` image treatment, and a `.topology-canvas` overlay. Use the existing `--blue`, `--tile`, and dark-theme values. Add `.topology-packet` with a low-opacity pulse and staggered delay, and add a `@media (max-width: 900px)` rule that returns the portrait and diagram to normal document flow. Do not use absolute positioning for the mobile layout.

- [ ] **Step 5: Run the focused test and the full suite**

  Run:

  ```bash
  node --test --test-name-pattern="presents Raj through an expressive" tests/site.test.mjs
  npm test
  ```

  Expected: the focused test passes and the full suite reports 14 passing tests.

- [ ] **Step 6: Commit the hero work**

  Run:

  ```bash
  git add index.html site.css tests/site.test.mjs
  git commit -m "Create expressive systems hero"
  ```

### Task 2: Turn work and public projects into system stories and Labs

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `index.html`
- Modify: `work/index.html`
- Modify: `site.css`

- [ ] **Step 1: Add failing system-story and Labs coverage**

  Add this test after the expressive-hero test:

  ```js
  test('frames production work and public projects as distinct system stories', () => {
    const home = readFileSync('index.html', 'utf8');
    const work = readFileSync('work/index.html', 'utf8');
    const styles = readFileSync('site.css', 'utf8');

    assert.match(home, /class="work-card"[^>]*data-topology="decisioning"/);
    assert.match(home, /data-topology="search"/);
    assert.match(home, /data-topology="reliability"/);
    assert.match(home, /data-topology="performance"/);
    assert.match(home, /Labs, earlier builds &amp; open source/);
    assert.match(home, /class="lab-card lab-pacman"/);
    assert.match(work, /class="work-canvas"/);
    assert.match(styles, /\.work-card\[data-topology="decisioning"\]/);
    assert.match(styles, /\.lab-card \{[\s\S]*min-height:/);
  });
  ```

- [ ] **Step 2: Run the focused test and confirm it fails**

  Run:

  ```bash
  node --test --test-name-pattern="frames production work" tests/site.test.mjs
  ```

  Expected: one failing subtest because the existing cards have no topology variant or Labs treatment.

- [ ] **Step 3: Add system-cover markup to the four homepage work cards**

  Change each work-card opening tag to include its topology identifier and insert a decorative visual before the number:

  ```html
  <a class="work-card" data-topology="decisioning" href="/work/#promotion-personalisation">
    <span class="work-card-visual" aria-hidden="true"><span class="cover-node"></span><span class="cover-link"></span><span class="cover-packet"></span></span>
    <span class="number">01 / REAL-TIME DECISIONING</span>
    <!-- retain the existing title, description, tags, and arrow -->
  </a>
  ```

  Use `search`, `reliability`, and `performance` for the remaining cards. The visible engineering copy, links, tags, and outcomes remain unchanged.

- [ ] **Step 4: Reframe open-source projects as Labs**

  Change the section eyebrow and title to:

  ```html
  <p class="eyebrow">Labs, earlier builds &amp; open source</p>
  <h2 id="open-source-title">Small experiments with a life beyond the day job.</h2>
  ```

  Change the three article containers to `class="lab-card lab-career"`, `class="lab-card lab-pacman"`, and `class="lab-card lab-language"`. Retain the existing public repository links, star/fork snapshots, and source note exactly.

- [ ] **Step 5: Add a restrained work route canvas**

  In `work/index.html`, add this immediately after the work page hero copy and before the case-study grid:

  ```html
  <div class="work-canvas" role="img" aria-label="Abstract topology connecting decisions, events, search and storage">
    <svg viewBox="0 0 760 180" aria-hidden="true">
      <path class="work-canvas-link" d="M60 90H250L380 45L510 110H700"/>
      <path class="work-canvas-trace" d="M60 90H250L380 45L510 110H700"/>
      <circle class="work-canvas-node" cx="60" cy="90" r="18"/><circle class="work-canvas-node" cx="250" cy="90" r="18"/><circle class="work-canvas-node" cx="380" cy="45" r="18"/><circle class="work-canvas-node" cx="510" cy="110" r="18"/><circle class="work-canvas-node" cx="700" cy="110" r="18"/>
    </svg>
  </div>
  ```

- [ ] **Step 6: Style system covers and Labs without obscuring content**

  Add `.work-card-visual` as a non-interactive, absolutely positioned visual layer. Give each `[data-topology]` a different CSS-only arrangement through custom properties or selector-specific node/link positioning. Keep `.number`, headings, copy, tags, and arrow above it with `position: relative; z-index: 1`. Add `.lab-card` as the new three-column card base and distinct, low-contrast treatments for Pacman, Career Copilot, and Hindi text-to-speech. Add a mobile rule that preserves contrast and limits visual layers to the top third of the card.

- [ ] **Step 7: Run focused and full tests**

  Run:

  ```bash
  node --test --test-name-pattern="frames production work" tests/site.test.mjs
  npm test
  ```

  Expected: focused test passes and the full suite reports 15 passing tests.

- [ ] **Step 8: Commit the story presentation**

  Run:

  ```bash
  git add index.html work/index.html site.css tests/site.test.mjs
  git commit -m "Frame work as system stories and labs"
  ```

### Task 3: Make the motion language visible, bounded, and preference-safe

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `site.js`
- Modify: `site.css`

- [ ] **Step 1: Add failing motion-contract coverage**

  Add this test after the system-story test:

  ```js
  test('starts the desktop halo visibly and keeps living topology optional', () => {
    const styles = readFileSync('site.css', 'utf8');
    const script = readFileSync('site.js', 'utf8');

    assert.match(script, /let pointerX = window\.innerWidth \/ 2;/);
    assert.match(script, /let pointerY = window\.innerHeight \* 0\.48;/);
    assert.match(script, /renderPointerHalo\(\);/);
    assert.match(styles, /\.pointer-halo\[data-ready="true"\] \{ opacity:/);
    assert.match(styles, /\.work-card\.motion-reveal \{[\s\S]*scale:/);
    assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.topology-packet \{ animation: none;/);
  });
  ```

- [ ] **Step 2: Run the focused test and confirm it fails**

  Run:

  ```bash
  node --test --test-name-pattern="starts the desktop halo visibly" tests/site.test.mjs
  ```

  Expected: one failing subtest because the halo currently starts at negative coordinates and no ready state exists.

- [ ] **Step 3: Repair the initial halo state in `site.js`**

  In `startPointerHalo`, replace the initial coordinates and add an immediate render:

  ```js
  let animationFrame = 0;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight * 0.48;

  const renderPointerHalo = () => {
    animationFrame = 0;
    halo.style.transform = `translate3d(${pointerX - 180}px, ${pointerY - 180}px, 0)`;
    halo.dataset.ready = 'true';
  };

  renderPointerHalo();
  ```

  Keep the existing fine-pointer, reduced-motion, touch-pointer, passive-listener, and animation-frame guards unchanged.

- [ ] **Step 4: Add staged and topology motion CSS**

  Add a ready-state opacity transition for `.pointer-halo[data-ready="true"]`. Apply bounded staggered delays to `.hero-copy > *`, `.hero-portrait`, and `.topology-canvas` only when `.js-motion` is active. Add a small scale-and-lift transition for `.work-card.motion-reveal` and use opacity/transform-only animation for `.topology-packet`. In the existing reduced-motion media block, explicitly set:

  ```css
  .topology-packet { animation: none; }
  .pointer-halo { display: none; }
  ```

  Do not add scroll listeners, an animation dependency, a custom cursor, or continuous effects on writing, services, contact, or 404 pages.

- [ ] **Step 5: Run focused and full tests**

  Run:

  ```bash
  node --test --test-name-pattern="starts the desktop halo visibly" tests/site.test.mjs
  npm test
  ```

  Expected: focused test passes and the full suite reports 16 passing tests.

- [ ] **Step 6: Commit the motion contract**

  Run:

  ```bash
  git add site.css site.js tests/site.test.mjs
  git commit -m "Add bounded living topology motion"
  ```

### Task 4: Validate visual behaviour and publishing readiness

**Files:**
- No source changes expected.

- [ ] **Step 1: Run every automated project check**

  Run:

  ```bash
  npm run format
  npm run lint
  npm run typecheck
  npm test
  npm run build
  npm run check:links
  git diff --check
  ```

  Expected: each command exits 0. If formatting modifies files, inspect the diff and only commit changes limited to this plan’s production and test files.

- [ ] **Step 2: Use Chrome to inspect all public routes at desktop and mobile sizes**

  Serve the worktree using:

  ```bash
  python3 -m http.server 4174 --bind 127.0.0.1
  ```

  Inspect `/`, `/work/`, `/services/`, `/writing/`, `/writing/retry-amplification/`, `/writing/cache-boundaries/`, `/about/`, `/contact/`, and `/404.html` at 1440px and 390px CSS widths. Verify every visible `a.button` and `<button>` has centred content, `document.documentElement.scrollWidth === document.documentElement.clientWidth`, and mobile navigation toggles correctly.

- [ ] **Step 3: Exercise motion capability scenarios in Chrome**

  At desktop/fine-pointer settings, verify the initial `.pointer-halo` is visible near the viewport centre, moves after a mouse event, and has `pointer-events: none`. At touch/coarse settings, verify no halo is injected. At reduced-motion settings, verify no halo, packet, staged entrance, trace, node, availability, or card animation is perceptible and all content is visible.

- [ ] **Step 4: Verify the contact and source-safe behaviours**

  Verify the contact form retains labels and opens its email draft path, résumé links resolve, and all public project links remain intact. Confirm no copied reference images, reference text, testimonials, or third-party animation packages are present:

  ```bash
  rg -n "rishika|framer|testimonial|wallofportfolios" index.html work/index.html site.css site.js package.json
  ```

  Expected: no matches.

- [ ] **Step 5: Commit any validation-only formatting change, then prepare direct master integration**

  Run:

  ```bash
  git status --short
  git log --oneline --decorate -6
  ```

  Expected: feature commits are focused, the worktree is clean, and only the plan’s intended files changed. Do not stage `.superpowers/` or any `autoresearch/` directory.

## Plan self-review

- **Spec coverage:** Task 1 creates the personal expressive hero and accessible topology; Task 2 creates distinct system-story covers, Labs, and the work canvas; Task 3 implements initial visible halo and preference-safe living topology motion; Task 4 verifies every route, button, responsive layout, motion mode, contact flow, and source-safety condition.
- **Scope:** the static stack remains intact, and visual content stays in static markup rather than client-rendering portfolio copy.
- **Consistency:** `topology-canvas`, `topology-packet`, `work-canvas`, `data-topology`, and `.pointer-halo[data-ready="true"]` use the same names throughout tasks and tests.
