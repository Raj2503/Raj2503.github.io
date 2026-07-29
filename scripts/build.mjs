import { spawnSync } from 'node:child_process';
const commands = [
  ['node', ['scripts/lint.mjs']],
  ['node', ['scripts/check-links.mjs']],
  ['node', ['--test', 'tests/site.test.mjs']],
];
for (const [command, args] of commands) {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log('Static production build validation completed.');
