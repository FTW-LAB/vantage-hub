#!/usr/bin/env bash
# FTW Lab Vantage — local ops board
# Contract: bind 0.0.0.0:8080 for dual-forge development preview.
set -euo pipefail
cd "$(dirname "$0")"

if [[ ! -d node_modules ]]; then
  npm install
fi

export VITE_PUBLIC_HOSTNAME="${VITE_PUBLIC_HOSTNAME:-ftwlab.com}"
export VITE_PUBLIC_GITHUB_ORG="${VITE_PUBLIC_GITHUB_ORG:-FTW-LAB}"
export VITE_PUBLIC_HF_ORG="${VITE_PUBLIC_HF_ORG:-FTWLAB}"

exec npm run dev
