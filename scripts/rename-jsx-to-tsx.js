#!/usr/bin/env node
/**
 * Script to rename .jsx/.js files to .tsx/.ts
 * Usage: node scripts/rename-jsx-to-tsx.js [--dry] [--apply]
 */

const fs = require("fs");
const path = require("path");

const DRY_RUN = process.argv.includes("--dry");
const APPLY = process.argv.includes("--apply");

if (!DRY_RUN && !APPLY) {
  console.log("Usage: node scripts/rename-jsx-to-tsx.js [--dry|--apply]");
  console.log("  --dry: Show what would be renamed without making changes");
  console.log("  --apply: Actually rename the files");
  process.exit(1);
}

const srcDir = path.join(__dirname, "..", "src");
const changes = [];

function hasJSXSyntax(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  return /import\s+React/.test(content) || /<[A-Z][\w]*/.test(content) || /jsx/.test(content);
}

function findFilesToRename(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFilesToRename(filePath);
    } else if (file.endsWith(".jsx")) {
      const newPath = filePath.replace(/\.jsx$/, ".tsx");
      changes.push({ old: filePath, new: newPath, type: "jsx->tsx" });
    } else if (file.endsWith(".js") && !file.includes(".test.") && !file.includes(".spec.")) {
      // Only rename .js to .ts if it's a module (has exports but no JSX)
      const content = fs.readFileSync(filePath, "utf8");
      const hasExports = /export\s+(default|const|function|class)/.test(content);
      const hasJSX = hasJSXSyntax(filePath);

      if (hasExports && !hasJSX) {
        const newPath = filePath.replace(/\.js$/, ".ts");
        changes.push({ old: filePath, new: newPath, type: "js->ts" });
      } else if (hasExports && hasJSX) {
        const newPath = filePath.replace(/\.js$/, ".tsx");
        changes.push({ old: filePath, new: newPath, type: "js->tsx" });
      }
    }
  }
}

console.log(`\n${DRY_RUN ? "🔍 DRY RUN" : "✅ APPLYING CHANGES"}\n`);
console.log(`Scanning ${srcDir}...\n`);

findFilesToRename(srcDir);

if (changes.length === 0) {
  console.log("✨ No files to rename!");
  process.exit(0);
}

console.log(`Found ${changes.length} files to rename:\n`);

changes.forEach(({ old, new: newPath, type }) => {
  const relativeOld = path.relative(process.cwd(), old);
  const relativeNew = path.relative(process.cwd(), newPath);
  console.log(`  ${type}: ${relativeOld} -> ${relativeNew}`);
});

if (APPLY) {
  console.log("\n📝 Renaming files...\n");
  changes.forEach(({ old, new: newPath }) => {
    fs.renameSync(old, newPath);
  });
  console.log("✅ Done! Files renamed successfully.");
  console.log("\n⚠️  Remember to run `yarn type-check` to validate TypeScript compilation.");
} else {
  console.log("\n💡 Run with --apply to actually rename these files.");
}
