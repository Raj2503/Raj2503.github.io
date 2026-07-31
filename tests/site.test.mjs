import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const requiredRoutes = [
  'index.html',
  'work/index.html',
  'services/index.html',
  'writing/index.html',
  'writing/retry-amplification/index.html',
  'writing/cache-boundaries/index.html',
  'about/index.html',
  'contact/index.html',
  '404.html',
];

test('publishes the planned portfolio routes', () => {
  for (const route of requiredRoutes) {
    assert.equal(existsSync(route), true, `Missing ${route}`);
  }
});

test('ships essential discovery files', () => {
  for (const file of ['robots.txt', 'sitemap.xml', 'rss.xml', 'site.webmanifest']) {
    assert.equal(existsSync(file), true, `Missing ${file}`);
  }
});

test('link validation recognises the published portrait asset', () => {
  const checker = readFileSync('scripts/check-links.mjs', 'utf8');
  assert.match(checker, /'\/assets\/raj-aryan\.jpg'/);
});

test('home page contains accessible page structure and explicit positioning', () => {
  const home = readFileSync('index.html', 'utf8');
  assert.match(home, /<a class="skip-link" href="#main-content">/);
  assert.match(home, /<main id="main-content">/);
  assert.match(home, /Systems that keep their shape under real-world traffic\./);
  assert.match(home, /application\/ld\+json/);
});

test('anchors the availability dot and ripple to a non-shrinking indicator', () => {
  const home = readFileSync('index.html', 'utf8');
  const styles = readFileSync('site.css', 'utf8');
  const availabilityMatch = home.match(/<p class="availability">([\s\S]*?)<\/p>/);
  const indicatorRule = styles.match(/\.availability-indicator\s*\{([^}]*)\}/);
  const indicatorDotRule = styles.match(/\.availability-indicator::before\s*\{([^}]*)\}/);
  const indicatorRippleRule = styles.match(/\.availability-indicator::after\s*\{([^}]*)\}/);

  assert.ok(availabilityMatch, 'home needs an availability paragraph');
  assert.match(availabilityMatch[1], /<span\b(?=[^>]*\bclass="[^"]*\bavailability-indicator\b[^"]*")(?=[^>]*\baria-hidden="true")[^>]*><\/span>\s*Open to senior backend/);
  assert.ok(indicatorRule, 'availability indicator needs its own rule');
  assert.match(indicatorRule[1], /(?:flex:\s*0 0(?:\s+[^;]+)?;|flex-shrink:\s*0;)/);
  assert.ok(indicatorDotRule, 'availability indicator needs a dot');
  assert.match(indicatorDotRule[1], /content:\s*"";/);
  assert.match(indicatorDotRule[1], /background(?:-color)?:\s*[^;]+;/);
  assert.ok(indicatorRippleRule, 'availability indicator needs a ripple');
  assert.match(indicatorRippleRule[1], /content:\s*"";/);
  assert.match(indicatorRippleRule[1], /border:\s*[^;]+;/);
  assert.match(indicatorRippleRule[1], /animation:\s*availability-ripple/);
  assert.doesNotMatch(styles, /\.availability::before/);
  assert.doesNotMatch(styles, /\.availability::after/);

  const usesGridCentering = /display:\s*grid;/.test(indicatorRule[1])
    && /place-items:\s*center;/.test(indicatorRule[1])
    && /grid-area:\s*1\s*\/\s*1;/.test(indicatorDotRule[1])
    && /grid-area:\s*1\s*\/\s*1;/.test(indicatorRippleRule[1]);
  const usesAbsoluteCentering = /position:\s*relative;/.test(indicatorRule[1])
    && [indicatorDotRule[1], indicatorRippleRule[1]].every((rule) => /position:\s*absolute;/.test(rule)
      && /top:\s*50%;/.test(rule)
      && /left:\s*50%;/.test(rule)
      && /transform:\s*translate\(\s*-50%\s*,\s*-50%\s*\)/.test(rule));

  assert.equal(usesGridCentering || usesAbsoluteCentering, true, 'availability indicator needs a shared centring mechanism');
});

test('home features the strongest public open-source projects with provenance', () => {
  const home = readFileSync('index.html', 'utf8');
  assert.match(home, /Labs, earlier builds &amp; open source/);
  assert.match(home, /career-copilot/);
  assert.match(home, /Pacman-Flutter/);
  assert.match(home, /Python-Text-To-Speech-Hindi/);
  assert.match(home, /Snapshot recorded 29 July 2026/);
});

test('primary navigation keeps the engineering-focus route available on every page', () => {
  for (const route of requiredRoutes) {
    const page = readFileSync(route, 'utf8');
    const expertiseLink = route === 'index.html' ? 'href="#expertise"' : 'href="/#expertise"';
    assert.match(page, new RegExp(expertiseLink), `${route} needs an Expertise navigation link`);
  }
});

test('writing feed includes both local notes and canonical public articles', () => {
  const feed = readFileSync('rss.xml', 'utf8');
  assert.match(feed, /writing\/retry-amplification/);
  assert.match(feed, /medium\.com\/@Rajjj\/retry-storm/);
  assert.match(feed, /medium\.com\/@Rajjj\/when-apache-solrs-replication-handler/);
});

test('article layouts can shrink below the width of their code examples', () => {
  const styles = readFileSync('site.css', 'utf8');
  const responsiveStyles = styles.slice(styles.indexOf('@media (max-width: 900px)'));
  assert.match(responsiveStyles, /\.article-layout \{ grid-template-columns: minmax\(0, 1fr\); \}/);
  assert.match(responsiveStyles, /\.article-content \{ min-width: 0; \}/);
});

test('scrollable article code examples are keyboard focusable', () => {
  for (const route of ['writing/retry-amplification/index.html', 'writing/cache-boundaries/index.html']) {
    const page = readFileSync(route, 'utf8');
    assert.match(page, /<pre aria-label="[^"]+" tabindex="0">/, `${route} needs a keyboard-focusable code block`);
  }
});

test('ships progressive, reduced-motion-safe infrastructure motion', () => {
  const styles = readFileSync('site.css', 'utf8');
  const script = readFileSync('site.js', 'utf8');
  assert.match(styles, /\.js-motion \.motion-reveal \{ opacity: 0;/);
  assert.match(styles, /\.js-motion \.motion-reveal\.is-visible/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.motion-reveal/);
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /motion-reveal/);
  assert.match(script, /classList\.add\('js-motion'\)/);
});

test('adds the pointer halo only for fine-pointer, motion-enabled visitors', () => {
  const styles = readFileSync('site.css', 'utf8');
  const script = readFileSync('site.js', 'utf8');

  assert.match(script, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(script, /function startPointerHalo\(\)/);
  assert.match(script, /motionPreference\?\.matches \|\| !pointerHaloQuery\?\.matches/);
  assert.match(script, /halo\.setAttribute\('aria-hidden', 'true'\)/);
  assert.match(script, /document\.addEventListener\('pointermove', handlePointerMove, \{ passive: true \}\)/);
  assert.match(script, /const handlePointerMove = \(event\) => \{\n\s*if \(event\.pointerType === 'touch'\) return;/);
  assert.match(script, /window\.requestAnimationFrame\(renderPointerHalo\)/);
  assert.match(styles, /\.pointer-halo \{[^}]*position: fixed;[^}]*pointer-events: none;[^}]*will-change: transform;/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\) \{(?:[^{}]|\{[^{}]*\})*?\.pointer-halo \{ display: none; \}/);
});

test('keeps the homepage hero copy positioned relative to its visual treatment', () => {
  const home = readFileSync('index.html', 'utf8');
  const styles = readFileSync('site.css', 'utf8');

  assert.match(home, /class="hero-copy"/);
  assert.match(home, /class="hero-visual"/);
  assert.match(styles, /\.hero-copy \{[\s\S]*position: relative;/);
});

test('uses a local reduced-motion-safe network video instead of a hero portrait', () => {
  const home = readFileSync('index.html', 'utf8');
  const styles = readFileSync('site.css', 'utf8');
  const script = readFileSync('site.js', 'utf8');
  const mainMatch = home.match(/<main\b[^>]*>[\s\S]*?<\/main>/);

  assert.ok(mainMatch, 'home needs a main element');
  const main = mainMatch[0];
  const mainClasses = [...main.matchAll(/<[^>]+\bclass="([^"]*)"[^>]*>/g)]
    .map(([, classes]) => classes.split(/\s+/));
  const heroVisualMatch = main.match(/<div class="hero-visual">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);

  assert.doesNotMatch(main, /\bhero-portrait\b/);
  assert.equal(mainClasses.some((classes) => classes.includes('system-art') && classes.includes('topology-canvas')), false);
  assert.doesNotMatch(main, /\btopology-packet\b/);
  assert.match(home, /<figure class="portrait"><img src="\/assets\/raj-aryan\.jpg"/);
  assert.ok(heroVisualMatch, 'home needs a hero visual block');
  const heroVisual = heroVisualMatch[0];
  const heroNetworkFrames = [...heroVisual.matchAll(/<(div|figure)\b[^>]*class="[^"]*\bhero-network-frame\b[^"]*"[^>]*>[\s\S]*?<\/\1>/g)];
  const heroNetworkVideos = [...heroVisual.matchAll(/<video class="hero-network-video"(?=\s|>)[^>]*>/g)];

  assert.equal(heroNetworkFrames.length, 1, 'hero visual needs exactly one network frame');
  assert.equal(heroNetworkVideos.length, 1, 'hero visual needs exactly one decorative network video');
  const heroNetworkFrame = heroNetworkFrames[0][0];
  const heroNetworkVideoMatch = heroNetworkFrame.match(/<video class="hero-network-video"[^>]*>[\s\S]*?<\/video>/);

  assert.ok(heroNetworkVideoMatch, 'hero network frame needs a video block');
  const heroNetworkVideo = heroNetworkVideoMatch[0];
  const heroNetworkVideoTag = heroNetworkVideo.match(/<video\b[^>]*>/)[0];
  assert.match(heroNetworkVideoTag, /\sautoplay(?:\s|>)/);
  assert.match(heroNetworkVideoTag, /\sloop(?:\s|>)/);
  assert.match(heroNetworkVideoTag, /\smuted(?:\s|>)/);
  assert.match(heroNetworkVideoTag, /\splaysinline(?:\s|>)/);
  assert.match(heroNetworkVideoTag, /aria-hidden="true"/);
  assert.match(heroNetworkVideoTag, /poster="\/assets\/hero-network-flow-poster\.jpg"/);
  assert.match(heroNetworkVideo, /<source src="\/assets\/hero-network-flow\.mp4" type="video\/mp4">/);
  assert.match(heroNetworkFrame, /<a[^>]*href="https:\/\/www\.pexels\.com\/video\/dynamic-3d-data-visualization-of-network-flow-34336609\/"[^>]*>[^<]+<\/a>/);
  assert.equal(existsSync('assets/hero-network-flow.mp4'), true, 'Missing hero network video asset');
  assert.equal(existsSync('assets/hero-network-flow-poster.jpg'), true, 'Missing hero network video poster asset');
  assert.match(styles, /\.hero-network-frame\s*\{[^}]*\baspect-ratio:\s*4 \/ 5;/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\) \{(?:[^{}]|\{[^{}]*\})*?\.hero-network-video \{[^}]*display: none;/);
  assert.match(script, /motionTargets[\s\S]*\.hero-network-frame/);
});

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

test('starts the desktop halo visibly and keeps work-card motion optional', () => {
  const styles = readFileSync('site.css', 'utf8');
  const script = readFileSync('site.js', 'utf8');

  assert.match(script, /let pointerX = window\.innerWidth \/ 2;/);
  assert.match(script, /let pointerY = window\.innerHeight \* 0\.48;/);
  assert.match(script, /renderPointerHalo\(\);/);
  assert.match(styles, /\.pointer-halo\[data-ready="true"\] \{ opacity:/);
  assert.match(styles, /\.work-card\.motion-reveal \{[\s\S]*scale:/);
});

test('centres wrapped button labels as well as single-line labels', () => {
  const styles = readFileSync('site.css', 'utf8');

  assert.match(styles, /\.button \{[\s\S]*text-align: center;/);
});

test('keeps the mobile hero immediately readable while desktop motion is optional', () => {
  const styles = readFileSync('site.css', 'utf8');
  const mobileStyles = styles.slice(styles.indexOf('@media (max-width: 900px)'));

  assert.match(mobileStyles, /\.js-motion \.hero-copy > \.motion-reveal[\s\S]*opacity: 1;/);
  assert.match(mobileStyles, /\.js-motion \.hero-network-frame\.motion-reveal[\s\S]*animation: none;/);
});

test('keeps the network video in a responsive hero visual grid', () => {
  const home = readFileSync('index.html', 'utf8');
  const styles = readFileSync('site.css', 'utf8');

  assert.match(home, /class="hero-visual"[\s\S]*?class="hero-network-frame(?: [^"]*)?"/);
  assert.match(styles, /\.hero-visual \{[^}]*display: grid;/);
  assert.match(styles, /@media \(max-width: 900px\) \{(?:[^{}]|\{[^{}]*\})*?\.hero-visual \{[^}]*grid-template-columns: 1fr;/);
});

test('gives medium screens a single hero column before the visual tracks become cramped', () => {
  const styles = readFileSync('site.css', 'utf8');

  assert.match(styles, /@media \(max-width: 1200px\) \{(?:[^{}]|\{[^{}]*\})*?\.hero-grid \{[^}]*grid-template-columns: 1fr;/);
});

test('keeps contact fields and their guidance legible at laptop widths', () => {
  const styles = readFileSync('site.css', 'utf8');
  const contact = readFileSync('contact/index.html', 'utf8');

  assert.match(styles, /@media \(max-width: 1200px\) \{(?:[^{}]|\{[^{}]*\})*?\.form-grid \{[^}]*grid-template-columns: 1fr;/);
  assert.match(contact, /placeholder="e\.g\. Go, Kafka, Redis, AWS"/);
  assert.match(contact, /placeholder="e\.g\. reduce p99 latency"/);
});

test('every HTML route declares a title, description, canonical and Open Graph metadata', () => {
  for (const route of requiredRoutes) {
    const page = readFileSync(route, 'utf8');
    assert.match(page, /<title>[^<]+<\/title>/, `${route} needs a title`);
    assert.match(page, /<meta name="description" content="[^"]+">/, `${route} needs a description`);
    assert.match(page, /<link rel="canonical" href="[^"]+">/, `${route} needs a canonical URL`);
    assert.match(page, /<meta property="og:title" content="[^"]+">/, `${route} needs Open Graph metadata`);
  }
});
