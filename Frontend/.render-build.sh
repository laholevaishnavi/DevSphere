#!/usr/bin/env bash
set -o errexit  

# fresh install without cache
rm -rf node_modules package-lock.json

npm install
npm run build
