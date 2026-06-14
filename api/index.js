import { createRequire } from 'module';

const require = createRequire(import.meta.url);

let handlerPromise;
try {
  const mod = require('./server.cjs');
  const fn = mod.default || mod;
  handlerPromise = Promise.resolve(fn);
} catch (loadErr) {
  handlerPromise = Promise.reject(loadErr);
}

export default async function handler(req, res) {
  try {
    const fn = await handlerPromise;
    return fn(req, res);
  } catch (err) {
    console.error('SERVERLESS CRASH:', err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
}
