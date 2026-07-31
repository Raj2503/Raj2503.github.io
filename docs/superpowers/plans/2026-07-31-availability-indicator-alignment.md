# Availability Indicator Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the availability dot and ripple share a fixed visual centre at desktop and mobile widths.

**Architecture:** Replace the parent paragraph's pseudo-elements with one decorative child span. The span is a fixed-width grid anchor whose overlapping pseudo-elements draw the dot and ripple, preventing flex shrink and decoupling their geometry from wrapped text.

**Tech Stack:** Static HTML, CSS, Node.js built-in test runner.

---

### Task 1: Lock in the indicator contract

**Files:**
- Modify: `tests/site.test.mjs`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Add a focused failing static contract test after the home-structure test**

```js
test('anchors the availability dot and ripple to one non-shrinking indicator', () => {
  const home = readFileSync('index.html', 'utf8');
  const styles = readFileSync('site.css', 'utf8');

  assert.match(home, /<p class="availability"><span class="availability-indicator" aria-hidden="true"><\/span>Open to senior backend/);
  assert.match(styles, /\.availability-indicator \{[^}]*flex: 0 0 8px;[^}]*height: 1\.5em;/);
  assert.match(styles, /\.availability-indicator::before \{[^}]*width: 8px;[^}]*height: 8px;/);
  assert.match(styles, /\.availability-indicator::after \{[^}]*box-sizing: border-box;[^}]*width: 18px;[^}]*height: 18px;[^}]*availability-ripple/);
  assert.doesNotMatch(styles, /\.availability::before/);
  assert.doesNotMatch(styles, /\.availability::after/);
});
```

- [ ] **Step 2: Run the focused test and confirm it fails because the indicator child and its rules do not exist**

Run: `node --test --test-name-pattern="anchors the availability" tests/site.test.mjs`

Expected: one failing test reporting that the expected indicator markup or CSS is absent.

### Task 2: Implement the fixed visual anchor

**Files:**
- Modify: `index.html:52`
- Modify: `site.css:89-93`
- Test: `tests/site.test.mjs`

- [ ] **Step 1: Move the visual indicator into an inaccessible-to-screen-readers child span**

```html
<p class="availability"><span class="availability-indicator" aria-hidden="true"></span>Open to senior backend, platform and selected architecture-consulting conversations.</p>
```

- [ ] **Step 2: Replace the parent pseudo-element rules with one fixed grid anchor and overlapping child pseudo-elements**

```css
.availability { display: inline-flex; gap: 9px; align-items: flex-start; margin-top: 38px; color: #b7f7c8; font-size: 14px; }
.availability-indicator { display: grid; flex: 0 0 8px; place-items: center; width: 8px; height: 1.5em; }
.availability-indicator::before { grid-area: 1 / 1; width: 8px; height: 8px; content: ""; background: #35d064; border-radius: 50%; box-shadow: 0 0 0 4px rgba(53, 208, 100, 0.14); }
.availability-indicator::after { grid-area: 1 / 1; box-sizing: border-box; width: 18px; height: 18px; content: ""; border: 1px solid rgba(53, 208, 100, 0.8); border-radius: 50%; animation: availability-ripple 2.4s ease-out infinite; }
```

- [ ] **Step 3: Retarget the existing reduced-motion override**

```css
.availability-indicator::after, .work-canvas-trace { animation: none; }
```

- [ ] **Step 4: Run the focused test and the full suite**

Run: `node --test --test-name-pattern="anchors the availability" tests/site.test.mjs && npm test`

Expected: focused test passes and all tests pass.

- [ ] **Step 5: Commit the implementation**

```bash
git add index.html site.css tests/site.test.mjs
git commit -m "fix: align availability status indicator"
```

### Task 3: Verify rendered geometry and production output

**Files:**
- Modify: none

- [ ] **Step 1: Start a local static server and inspect the home page at 1440px and 390px**

Run: `python3 -m http.server 4183 --bind 127.0.0.1`

Expected: the dot remains 8px wide; the ripple shares its centre; text can wrap without moving the ripple above the dot.

- [ ] **Step 2: Run the repository validation commands**

Run: `npm run format`, `npm run lint`, `npm run typecheck`, `npm run check:links`, and `npm run build`

Expected: every command exits with status 0.
