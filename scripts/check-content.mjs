// Fails if any placeholder ("TODO") is left in the site content.
// Run before every deploy: `npm run release` does it automatically.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../src/content/", import.meta.url);
const problems = [];

for (const file of readdirSync(dir)) {
  if (!file.endsWith(".ts") || file.endsWith(".test.ts")) continue;
  readFileSync(new URL(file, dir), "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.includes("TODO")) problems.push(`${join("src/content", file)}:${i + 1}  ${line.trim()}`);
    });
}

if (problems.length) {
  console.error(`\n${problems.length} placeholder(s) still need real content:\n`);
  for (const p of problems) console.error("  " + p);
  console.error("");
  process.exit(1);
}
console.log("Content check passed: no placeholders left.");
