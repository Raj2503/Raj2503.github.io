# Hero Network Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage hero portrait with a fast, reduced-motion-safe Pexels network-flow video while retaining the lower About portrait.

**Architecture:** Store an optimised local MP4 and poster under `assets/`. Render a decorative video inside a dedicated hero frame, with a visible source credit link. Update the hero layout, motion target selector and static validation tests so the visual stays contained at every breakpoint.

**Tech Stack:** Semantic HTML, native `<video>`, CSS media queries, JavaScript `IntersectionObserver`, Node static tests, FFmpeg.

---

## File structure

- `index.html` — homepage hero markup and video source credit.
- `site.css` — hero-video frame, overlay, responsive sizing and reduced-motion fallback.
- `site.js` — motion observer target selector for the new frame.
- `assets/hero-network-flow.mp4` — local, muted Pexels-derived H.264 hero video.
- `assets/hero-network-flow-poster.jpg` — local poster frame for first paint and reduced motion.
- `tests/site.test.mjs` — static regression coverage for video markup, assets and fallbacks.
- `REDESIGN_REPORT.md` — final implementation and validation record.

### Task 1: Add failing hero-video contract tests

**Files:**
- Modify: `tests/site.test.mjs`

- [ ] **Step 1: Add the failing test after the current hero-layout tests**

```js
test('uses a local reduced-motion-safe network video instead of a hero portrait', () => {
  const home = readFileSync('index.html', 'utf8');
  const styles = readFileSync('site.css', 'utf8');
  const script = readFileSync('site.js', 'utf8');

  assert.doesNotMatch(home.match(/<main[\\s\\S]*?<\\/main>/)?.[0] ?? '', /class="hero-portrait"/);
  assert.match(home, /<video class="hero-network-video"[^>]*muted[^>]*loop[^>]*playsinline[^>]*aria-hidden="true"/);
  assert.match(home, /src="\/assets\/hero-network-flow\.mp4" type="video\/mp4"/);
  assert.match(home, /poster="\/assets\/hero-network-flow-poster\.jpg"/);
  assert.match(home, /href="https:\/\/www\.pexels\.com\/video\/dynamic-3d-data-visualization-of-network-flow-34336609\//);
  assert.match(styles, /\.hero-network-frame \{[^}]*aspect-ratio: 4 \/ 5;/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\\s\\S]*\.hero-network-video \{ display: none;/);
  assert.match(script, /\.hero-network-frame/);
  assert.ok(existsSync('assets/hero-network-flow.mp4'));
  assert.ok(existsSync('assets/hero-network-flow-poster.jpg'));
});
```

- [ ] **Step 2: Run the focused test to verify it fails because the video is absent**

Run: `node --test --test-name-pattern='uses a local reduced-motion-safe network video' tests/site.test.mjs`

Expected: FAIL because `index.html` still contains `.hero-portrait` and no network-video assets.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/site.test.mjs
git commit -m "test: define hero network video contract"
```

### Task 2: Produce the local web video and poster

**Files:**
- Create: `assets/hero-network-flow.mp4`
- Create: `assets/hero-network-flow-poster.jpg`

- [ ] **Step 1: Download the selected source video to a temporary file**

```bash
curl -L --fail --silent --show-error \
  'https://videos.pexels.com/video-files/34336609/14545990_1080_1920_30fps.mp4' \
  -o /tmp/pexels-network-flow.mp4
```

- [ ] **Step 2: Encode a small web delivery asset and generate its poster**

```bash
ffmpeg -y -i /tmp/pexels-network-flow.mp4 -an \
  -vf 'scale=540:960:force_original_aspect_ratio=decrease,pad=540:960:(ow-iw)/2:(oh-ih)/2:black' \
  -r 20 -c:v libx264 -preset slow -crf 30 -movflags +faststart \
  assets/hero-network-flow.mp4
ffmpeg -y -ss 00:00:02 -i assets/hero-network-flow.mp4 -frames:v 1 -q:v 3 \
  assets/hero-network-flow-poster.jpg
```

- [ ] **Step 3: Verify asset dimensions and payloads**

Run: `ffprobe -v error -show_entries stream=width,height,duration -of default=noprint_wrappers=1 assets/hero-network-flow.mp4 && ls -lh assets/hero-network-flow.mp4 assets/hero-network-flow-poster.jpg`

Expected: `540x960`, no audio stream and a materially smaller payload than the 17 MB source.

### Task 3: Render and style the video frame

**Files:**
- Modify: `index.html:54-69`
- Modify: `site.css:62-101,252-297,322-327`
- Modify: `site.js:4-5`

- [ ] **Step 1: Replace the hero visual markup**

```html
<div class="hero-visual">
  <figure class="hero-network-frame motion-reveal">
    <video class="hero-network-video" autoplay loop muted playsinline aria-hidden="true" poster="/assets/hero-network-flow-poster.jpg">
      <source src="/assets/hero-network-flow.mp4" type="video/mp4">
    </video>
    <figcaption><a href="https://www.pexels.com/video/dynamic-3d-data-visualization-of-network-flow-34336609/" target="_blank" rel="noreferrer">Motion visual by Nicola Narracci / Pexels</a></figcaption>
  </figure>
</div>
```

- [ ] **Step 2: Replace portrait/topology-specific rules with the contained video frame**

```css
.hero-visual { position: relative; display: grid; justify-items: end; min-height: 460px; }
.hero-network-frame { position: relative; width: min(100%, 360px); aspect-ratio: 4 / 5; margin: 0; overflow: hidden; background: #080a10 url('/assets/hero-network-flow-poster.jpg') center / cover no-repeat; border: 1px solid rgba(115, 183, 255, 0.34); border-radius: 18px; box-shadow: 0 28px 82px rgba(0, 0, 0, 0.46); }
.hero-network-frame::after { position: absolute; inset: 0; content: ""; background: linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.48)); pointer-events: none; }
.hero-network-video { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.hero-network-frame figcaption { position: absolute; z-index: 1; right: 14px; bottom: 12px; left: 14px; }
.hero-network-frame figcaption a { color: #dceeff; font-size: 11px; text-decoration: none; }

@media (max-width: 1200px) {
  .hero-visual { justify-items: end; min-height: 450px; }
  .hero-network-frame { width: min(100%, 430px); }
}
@media (max-width: 900px) {
  .hero-visual { justify-items: stretch; min-height: 0; }
  .hero-network-frame { width: min(100%, 430px); justify-self: end; }
}
@media (max-width: 650px) {
  .hero-network-frame { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-network-video { display: none; }
}
```

- [ ] **Step 3: Update the reveal observer selector**

```js
const motionTargets = document.querySelectorAll('.hero .eyebrow, .hero h1, .hero .lede, .hero .button-row, .hero .availability, .hero-network-frame, .section-head, .metric, .work-card, .expertise-card, .service, .article-card, .lab-card, .service-detail, .case-study section, .contact-links, .contact-form, .portrait, .quote, .work-canvas');
```

- [ ] **Step 4: Run focused and full tests to verify the implementation passes**

Run: `node --test --test-name-pattern='uses a local reduced-motion-safe network video' tests/site.test.mjs && npm test`

Expected: focused test passes and the complete suite has zero failures.

- [ ] **Step 5: Commit the implementation**

```bash
git add index.html site.css site.js assets/hero-network-flow.mp4 assets/hero-network-flow-poster.jpg tests/site.test.mjs
git commit -m "Replace hero portrait with network video"
```

### Task 4: Validate and document the released experience

**Files:**
- Modify: `REDESIGN_REPORT.md`

- [ ] **Step 1: Record the video source, reduced-motion fallback and verification result**

Add the following bullet under “What changed” in `REDESIGN_REPORT.md`:

```md
- Replaced the homepage hero portrait with an optimised, locally served Pexels network-flow video. The visible source credit points to Nicola Narracci’s original work; reduced-motion visitors receive a static poster frame instead.
```

Replace the browser-audit result row with a statement that includes the four inspected widths, hero video containment, visible source credit and reduced-motion poster fallback.

- [ ] **Step 2: Run the complete validation suite**

Run: `npm run format && npm run lint && npm run typecheck && npm test && npm run check:links && npm run build && git diff --check`

Expected: all commands exit with status 0.

- [ ] **Step 3: Run browser validation at the public breakpoints**

Run a local production server, then inspect `/` at 1440, 1024, 768 and 390 CSS px. Confirm no horizontal overflow, no clipped CTA or video credit, no hero overlap, poster fallback under reduced motion and working mobile navigation.

- [ ] **Step 4: Commit documentation**

```bash
git add REDESIGN_REPORT.md docs/superpowers/plans/2026-07-30-hero-network-video.md
git commit -m "Document hero network video validation"
```
