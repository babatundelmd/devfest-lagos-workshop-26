import { copyFileSync } from 'node:fs';
copyFileSync('api/db.seed.json', 'api/db.json');
console.log('✓ api/db.json reset to the seed data');
