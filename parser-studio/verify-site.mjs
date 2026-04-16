import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const required = ["index.html", "app.js", "styles.css"];

for (const file of required) {
  const path = join(root, file);
  const stat = statSync(path);
  if (!stat.isFile() || stat.size === 0) {
    throw new Error(`${file} is missing or empty`);
  }
}

const html = readFileSync(join(root, "index.html"), "utf8");
const js = readFileSync(join(root, "app.js"), "utf8");
const css = readFileSync(join(root, "styles.css"), "utf8");

const checks = [
  ["html title", html.includes("Parser Studio")],
  ["relative stylesheet", html.includes('href="styles.css"')],
  ["relative script", html.includes('src="app.js"')],
  ["api base input", html.includes("api-base-input")],
  ["convert button", html.includes("convert-button")],
  ["engine endpoint", js.includes("/api/engines")],
  ["convert endpoint", js.includes("/api/convert")],
  ["api base config", js.includes("parserStudioApiBase")],
  ["responsive layout", css.includes("@media")],
];

const failed = checks.filter(([, ok]) => !ok);
if (failed.length) {
  for (const [name] of failed) {
    console.error(`Site polish check failed: ${name}`);
  }
  process.exit(1);
}

console.log("Site polish checks passed.");
