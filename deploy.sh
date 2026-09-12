#!/usr/bin/env bash
#
# Deploy KSI-Landing-2.0 to the ksi-www host.
#
# Ships only git-tracked files (via `git ls-files`), so anything that isn't
# committed — backend/app/.env, frontend/.env, database/db.sqlite3, images
# uploaded at runtime through the admin panel — is never touched by rsync.
# There is no --delete: files removed locally are simply left in place on
# the server rather than risk deleting something that shouldn't go.
#
# Usage:
#   ./deploy.sh            # asks for confirmation, then deploys
#   ./deploy.sh -y          # no confirmation prompt
#   ./deploy.sh -n          # dry-run the rsync only, no remote changes
set -euo pipefail

REMOTE_HOST="ksi-www"
REMOTE_DIR="/opt/KSI-Landing-2.0"

ASSUME_YES=0
DRY_RUN=0
while getopts "yn" opt; do
  case "$opt" in
    y) ASSUME_YES=1 ;;
    n) DRY_RUN=1 ;;
    *) echo "Usage: $0 [-y] [-n]" >&2; exit 1 ;;
  esac
done

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_ROOT"

if [ ! -d .git ]; then
  echo "error: $REPO_ROOT is not a git repository" >&2
  exit 1
fi

echo "==> Target: ${REMOTE_HOST}:${REMOTE_DIR}"
if [ "$DRY_RUN" -eq 0 ] && [ "$ASSUME_YES" -eq 0 ]; then
  read -r -p "This will run 'docker compose down', remove the old images and rebuild on ${REMOTE_HOST}. Continue? [y/N] " reply
  case "$reply" in
    [yY]|[yY][eE][sS]) ;;
    *) echo "Aborted."; exit 1 ;;
  esac
fi

RSYNC_FLAGS=(-avz --files-from=- --from0 -e ssh)
if [ "$DRY_RUN" -eq 1 ]; then
  RSYNC_FLAGS+=(--dry-run --itemize-changes)
fi

echo "==> Syncing git-tracked files to ${REMOTE_HOST}:${REMOTE_DIR}"
git ls-files -z | rsync "${RSYNC_FLAGS[@]}" ./ "${REMOTE_HOST}:${REMOTE_DIR}/"

if [ "$DRY_RUN" -eq 1 ]; then
  echo "==> Dry run complete, no remote commands were run."
  exit 0
fi

echo "==> Fixing ownership of persisted volumes (images/, database/)"
ssh "$REMOTE_HOST" "cd '${REMOTE_DIR}' && python3 setup_enviroment.py"

echo "==> Rebuilding and restarting containers on ${REMOTE_HOST}"
ssh "$REMOTE_HOST" bash -s <<EOF
set -euo pipefail
cd '${REMOTE_DIR}'

echo "-- current images:"
OLD_IMAGES=\$(docker compose config --images)
echo "\$OLD_IMAGES"

echo "-- docker compose down"
docker compose down

echo "-- removing old images"
for img in \$OLD_IMAGES; do
  docker rmi "\$img" || true
done

echo "-- building new images"
docker compose build --pull

echo "-- docker compose up -d"
docker compose up -d

docker compose ps
EOF

echo "==> Deploy finished."
