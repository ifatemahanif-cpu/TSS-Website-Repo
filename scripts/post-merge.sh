#!/bin/bash
  set -e
  npm install --no-audit
  npx drizzle-kit push --force 2>/dev/null || true
  