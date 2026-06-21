// Wrapper to start the auth server with unbuffered output
import { spawn } from 'child_process';
import { createServer } from 'http';

const child = spawn('node', ['dist/index.js'], {
  cwd: new URL('.', import.meta.url).pathname,
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, FORCE_COLOR: '1' }
});

child.stdout.on('data', (d) => process.stdout.write(d));
child.stderr.on('data', (d) => process.stderr.write(d));

// Wait for server to start, then keep alive
let started = false;
const checkServer = () => {
  const req = createServer({ port: 3005, host: '127.0.0.1' });
  // Simple health check via http.get
  const http = require ? null : null; // use fetch or http
};

child.on('exit', (code) => process.exit(code));

// Keep alive
setInterval(() => {}, 60000);
