#!/usr/bin/env bash
# Copy real Layout Points product evidence into the website.
#
# Run on the Mac that has the product repository:
#   scripts/layout-points/import-evidence.sh "/Users/tcmbp/Documents/lp app"
#
# Each image renders on the site only when its file exists, so run this,
# review the images, then commit them. Use sanitised sample data only.
set -euo pipefail

SRC="${1:-/Users/tcmbp/Documents/lp app}"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DEST="$ROOT/public/images/layout-points"
mkdir -p "$DEST"

copy() {
  local from="$SRC/$1" to="$DEST/$2" max="$3"
  if [[ ! -f "$from" ]]; then
    echo "missing: $from" >&2
    return 1
  fi
  cp "$from" "$to"
  # Cap the long edge so the page stays light. sips ships with macOS.
  if command -v sips >/dev/null 2>&1; then
    sips -Z "$max" "$to" >/dev/null
    echo "$2: $(sips -g pixelWidth -g pixelHeight "$to" | awk '/pixel/ {printf "%s ", $2}')"
  else
    echo "$2 copied (sips not available, not resized)"
  fi
}

copy "output/ui-snapshots-0.1.21/workspace-dark.png" "workspace-dark.png" 2400
copy "output/ui-snapshots-0.1.21/calibration-dark.png" "calibration-dark.png" 2400
copy "output/visual-review-0.1.21/tc-printer-calibration.png" "tc-printer-calibration.png" 1600
copy "resources/macos/AppIcon-1024.png" "app-icon.png" 512

cat <<MSG

Imported into $DEST.
Before committing:
  1. Open each image and confirm every visible ID, coordinate and file name is sanitised sample data.
  2. Confirm the screens match the public release build, not an older internal build.
  3. Update width and height in lib/layout-points/evidence.ts if they differ.
MSG
