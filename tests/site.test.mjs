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
  assert.match(home, /Backend systems built for scale, failure and real-world traffic\./);
  assert.match(home, /application\/ld\+json/);
});

test('home features the strongest public open-source projects with provenance', () => {
  const home = readFileSync('index.html', 'utf8');
  assert.match(home, /Open source &amp; earlier builds/);
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
  assert.match(styles, /@keyframes signal-pulse/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.motion-reveal/);
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /motion-reveal/);
  assert.match(script, /classList\.add\('js-motion'\)/);
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
