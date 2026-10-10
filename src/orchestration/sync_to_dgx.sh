#!/usr/bin/env bash
# Copy this repository's code and benchmark input from the laptop to each DGX.
#
#   export DGX_HOSTS="<user>@<dgx-host-a> <user>@<dgx-host-b>"
#   src/orchestration/sync_to_dgx.sh [--with-skills]
#
# Copies src/ and benchmark/ into DGX_DEST on each host (default
# Documents/ws/dgx-eval, relative to the remote home directory). With
# --with-skills it also copies the skills from the local ibook-skills checkout
# (BK_HOME, default ~/Documents/ws/ibook-skills) to DGX_SKILLS_DEST on the
# host (default Documents/ws/ibook-skills), and records which commit they came
# from in VERSION.txt. Do not sync skills while a run is reading them.
#
# Files are added and overwritten, never deleted, so syncing is safe while a
# run is in progress. macOS tar would otherwise scatter "._" sidecar files
# through the copy, and a run would treat them as part of the book.
#
# The real hosts stay out of this repository: pass them in DGX_HOSTS.
set -euo pipefail

repo=$(cd "$(dirname "$0")/../.." && pwd)
dest=${DGX_DEST:-Documents/ws/dgx-eval}
bk=${BK_HOME:-$HOME/Documents/ws/ibook-skills}
skills_dest=${DGX_SKILLS_DEST:-Documents/ws/ibook-skills}
: "${DGX_HOSTS:?set DGX_HOSTS to a space-separated list of SSH targets}"
ssh_opts=(-o BatchMode=yes -o ConnectTimeout=8)

i=0
for host in $DGX_HOSTS; do
  i=$((i + 1))
  COPYFILE_DISABLE=1 tar --no-xattrs -C "$repo" \
      --exclude='__pycache__' --exclude='.DS_Store' -cf - src benchmark \
    | ssh "${ssh_opts[@]}" "$host" "
        mkdir -p \"\$HOME/$dest\" && tar -C \"\$HOME/$dest\" -xf - &&
        find \"\$HOME/$dest\" -name '._*' -delete &&
        chmod +x \"\$HOME/$dest\"/src/*/*.sh &&
        echo \"host $i: \$(find \"\$HOME/$dest/src\" \"\$HOME/$dest/benchmark\" -type f | wc -l) files in $dest\""

  if [ "${1:-}" = "--with-skills" ]; then
    commit=$(git -C "$bk" rev-parse --short HEAD)
    changed=$(git -C "$bk" status --porcelain skills | wc -l | tr -d ' ')
    COPYFILE_DISABLE=1 tar --no-xattrs -C "$bk" \
        --exclude='__pycache__' --exclude='.DS_Store' --exclude='skills/archived' -cf - skills \
      | ssh "${ssh_opts[@]}" "$host" "
          mkdir -p \"\$HOME/$skills_dest\" &&
          tar -C \"\$HOME/$skills_dest\" -xf - &&
          find \"\$HOME/$skills_dest\" -name '._*' -delete &&
          echo 'skills from commit $commit, with $changed uncommitted change(s)' \
            > \"\$HOME/$skills_dest/VERSION.txt\" &&
          echo \"host $i: \$(ls \"\$HOME/$skills_dest/skills\" | wc -l) skills, commit $commit\""
  fi
done
