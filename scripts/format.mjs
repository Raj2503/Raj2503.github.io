import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules', 'assets']);
const textExtensions = new Set(['.css', '.html', '.htm', '.js', '.json', '.md', '.txt', '.xml', '.yml', '.yaml', '']);
const files = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    if (ignored.has(entry)) continue;
    const path = join(directory, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (textExtensions.has(entry.includes('.') ? `.${entry.split('.').pop()}` : '')) files.push(path);
  }
}

walk(root);
let changed = 0;
for (const path of files) {
  const original = readFileSync(path, 'utf8');
  const formatted = `${original.replace(/[ \t]+$/gm, '').replace(/\n*$/, '')}\n`;
  if (formatted !== original) {
    writeFileSync(path, formatted);
    changed += 1;
  }
}
console.log(`Formatted ${files.length} text files${changed ? ` (${changed} changed)` : ''}.`);
