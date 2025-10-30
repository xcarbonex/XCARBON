#!/usr/bin/env bash
# Script to check for non-TypeScript files in src/
# Exits with code 1 if any .js or .jsx files are found in src/

set -e

echo "🔍 Checking for non-TypeScript files in src/..."

# Get list of .js and .jsx files in src/
nonTsFiles=$(find src -type f \( -name "*.js" -o -name "*.jsx" \) 2>/dev/null || true)

if [ -n "$nonTsFiles" ]; then
  echo "❌ Found non-TypeScript files in src/:"
  echo "$nonTsFiles"
  echo ""
  echo "All files in src/ must be .ts or .tsx"
  exit 1
fi

echo "✅ All source files are TypeScript!"
exit 0
