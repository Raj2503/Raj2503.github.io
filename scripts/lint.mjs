import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules', 'assets', 'content', 'tests', 'scripts']);
const pages = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignored.has(entry)) continue;
    const path = join(directory, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (path.endsWith('.html')) pages.push(path);
  }
}

walk(root);
const failures = [];
for (const path of pages) {
  const html = readFileSync(path, 'utf8');
  const label = relative(root, path);
  for (const [description, pattern] of [
    ['language metadata', /<html lang="[^"]+">/],
    ['viewport metadata', /<meta name="viewport"/],
    ['title', /<title>[^<]+<\/title>/],
    ['description', /<meta name="description" content="[^"]+">/],
    ['canonical URL', /<link rel="canonical" href="https:\/\/raj2503\.github\.io/],
    ['Open Graph title', /<meta property="og:title" content="[^"]+">/],
    ['skip link', /<a class="skip-link" href="#main-content">/],
    ['main landmark', /<main id="main-content">/],
  ]) {
    if (!pattern.test(html)) failures.push(`${label}: missing ${description}`);
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(match[1].trim());
      if (data['@context'] !== 'https://schema.org') failures.push(`${label}: structured data is missing the Schema.org context`);
    } catch {
      failures.push(`${label}: contains invalid JSON-LD`);
    }
  }
  if (/(bootstrap|jquery|font-awesome|cdnjs)/i.test(html)) failures.push(`${label}: legacy CDN dependency found`);
}

for (const file of ['robots.txt', 'sitemap.xml', 'rss.xml', 'site.webmanifest', 'assets/mark.svg', 'assets/og-default.svg']) {
  if (!existsSync(join(root, file))) failures.push(`missing ${file}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Linted ${pages.length} HTML pages: accessibility and discovery baseline met.`);
