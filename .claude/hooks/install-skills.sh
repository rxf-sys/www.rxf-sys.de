#!/usr/bin/env bash
# Installs the third-party design skills into ~/.claude/skills at session
# start. Cloud containers are fresh each time, and the skills are not vendored
# into this repo until their licenses are cleared for a commercial project.
#
# Each source is pinned to a reviewed commit (25.11.2026): a moving branch would
# make the session a function of someone else's push. Licences: impeccable
# Apache-2.0, emilkowalski/skill MIT, taste-skill MIT. To update, review the new
# commit and replace the hash.
set -euo pipefail

# Local machines keep their own skills; only cloud sessions need this.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

SKILLS_DIR="${HOME}/.claude/skills"
mkdir -p "$SKILLS_DIR"

# "url ref" — ref is a branch, tag or commit.
SOURCES=(
  "https://github.com/pbakaus/impeccable 9e460a87ef338ee9d12c7beed8fedc597a5af5f7"
  "https://github.com/emilkowalski/skill 64eb3deb9a5fbfa041faf783e0bc3fd635872e9c"
  "https://github.com/Leonxlnx/taste-skill d1a2bb41d927083ac7118f60cfc9cdf711810ea0"
)

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

failed=()
for entry in "${SOURCES[@]}"; do
  read -r url ref <<<"$entry"
  dest="$work/$(basename "$url")"
  if ! git clone --quiet --filter=blob:none "$url" "$dest" 2>/dev/null ||
     ! git -C "$dest" checkout --quiet "$ref" 2>/dev/null; then
    failed+=("$url")
    continue
  fi
  # Every folder with a SKILL.md is one skill; the first copy of a name wins
  # (some repos ship the same skill for several agents).
  while IFS= read -r skill_md; do
    dir="$(dirname "$skill_md")"
    name="$(basename "$dir")"
    [ "$dir" = "$dest" ] && name="$(basename "$url")"
    [ -e "$SKILLS_DIR/$name" ] && continue
    cp -R "$dir" "$SKILLS_DIR/$name"
  done < <(find "$dest" -name SKILL.md -not -path '*/.git/*' | sort)
done

if [ "${#failed[@]}" -gt 0 ]; then
  # Not fatal: the session works without the design skills, but say so.
  echo "install-skills: could not fetch ${failed[*]} (network policy?)" >&2
fi
exit 0
