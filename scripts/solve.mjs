import { cpSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = 'workshop/solutions';
const requested = process.argv[2] ?? 'all';
const exercises = requested === 'all' ? readdirSync(root).sort() : [requested];

for (const exercise of exercises) {
  const from = join(root, exercise);
  if (!existsSync(from)) {
    console.error(`Unknown exercise "${exercise}". Try: ${readdirSync(root).sort().join(', ')}, all`);
    process.exit(1);
  }
  cpSync(from, '.', { recursive: true });
  console.log(`✓ ${exercise} solution applied`);
}
console.log('The app reloads by itself.');
