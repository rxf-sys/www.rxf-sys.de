#!/usr/bin/env bash
#
# deploy.sh — Pull-Deploy für www.rxf-sys.de
#
# Wird vom GitHub-Webhook (adnanh/webhook) bei jedem Push auf main getriggert.
# Installationspfad auf dem LXC: /opt/landing/deploy.sh
# Versioniert unter infrastructure/deploy.sh — nach Änderungen dorthin kopieren.
#
set -euo pipefail

REPO_DIR="/var/www/www.rxf-sys.de"
BRANCH="main"

cd "$REPO_DIR"

echo "[deploy] $(date --iso-8601=seconds) — sync ${BRANCH}"

# Arbeitsverzeichnis auf dem Server exakt auf origin/main bringen: keine
# Merge-Commits, etwaige lokale Änderungen auf dem Server werden bewusst
# verworfen (der Server ist kein Entwicklungs-Checkout).
git fetch --prune origin "$BRANCH"
git reset --hard "origin/${BRANCH}"

echo "[deploy] OK — HEAD $(git rev-parse --short HEAD): $(git log -1 --format=%s)"
