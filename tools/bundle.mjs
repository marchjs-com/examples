#!/usr/bin/env node
// ide.json at the repository's root: every page's components/<page>/ide.json in one file, keyed by the page's path
// ("components/button"). The showcase reads this one file pinned to a commit (jsDelivr) and loads it in the background
// when the site opens, so a MarchIDE page needs no request of its own.
//   node tools/bundle.mjs            write ide.json
//   node tools/bundle.mjs --check    exit 1 when ide.json is out of date
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const DIR = join(ROOT, "components");
const OUT = join(ROOT, "ide.json");

const pages = {};
for (const name of readdirSync(DIR).sort()) {
  const file = join(DIR, name, "ide.json");
  if (!existsSync(file)) continue;
  pages[`components/${name}`] = JSON.parse(readFileSync(file, "utf8"));
}
const next = `${JSON.stringify(pages)}\n`;
const now = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
if (process.argv.includes("--check")) {
  if (now !== next) { console.error("✖ ide.json is out of date: node tools/bundle.mjs"); process.exit(1); }
} else if (now !== next) writeFileSync(OUT, next);
console.log(`ide.json: ${Object.keys(pages).length} pages, ${(next.length / 1024).toFixed(1)} KB`);
