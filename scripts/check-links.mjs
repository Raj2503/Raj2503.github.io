import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const pages = [];
const ignored = new Set(['.git', 'node_modules', 'assets', 'content', 'tests', 'scripts']);
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

const known = new Set(['/', '/work/', '/services/', '/writing/', '/writing/retry-amplification/', '/writing/cache-boundaries/', '/about/', '/contact/', '/404.html', '/assets/raj-aryan.jpg', '/assets/raj-aryan-resume.pdf', '/assets/mark.svg', '/assets/og-default.svg', '/rss.xml', '/site.css', '/site.js', '/site.webmanifest']);
const failures = [];
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]+)(?:#[^"]*)?"/g)) {
    if (!known.has(match[1])) failures.push(`${relative(root, page)} links to unknown ${match[1]}`);
  }
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Checked internal links across ${pages.length} HTML pages.`);
