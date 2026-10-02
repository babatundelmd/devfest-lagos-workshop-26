import { spawn } from 'node:child_process';
import { copyFileSync, existsSync } from 'node:fs';
import { createServer } from 'node:net';

if (!existsSync('api/db.json')) copyFileSync('api/db.seed.json', 'api/db.json');

function freePort(start) {
  return new Promise((resolve) => {
    const server = createServer()
      .once('error', () => resolve(freePort(start + 1)))
      .once('listening', () => server.close(() => resolve(start)))
      .listen(start);
  });
}

const apiPort = await freePort(3000);
if (apiPort !== 3000) console.log(`Port 3000 is busy, so the API is using ${apiPort} instead.`);

const shell = process.platform === 'win32';
const env = { ...process.env, API_PORT: String(apiPort) };
const run = (args) => spawn('npx', args, { stdio: 'inherit', shell, env });

const children = [
  run(['json-server', 'api/db.json', '--port', String(apiPort)]),
  run(['ng', 'serve', ...process.argv.slice(2)]),
];

const stop = () => children.forEach((child) => child.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
children.forEach((child) => child.on('exit', stop));
