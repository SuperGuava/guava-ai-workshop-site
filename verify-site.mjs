import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd(), "guava-ai-workshop-site");
const html = readFileSync(resolve(root, "index.html"), "utf8");

const checks = [
  {
    label: "Open Graph title meta",
    pass: html.includes('property="og:title"'),
  },
  {
    label: "theme-color meta",
    pass: html.includes('name="theme-color"'),
  },
  {
    label: "web manifest link",
    pass: html.includes('rel="manifest"'),
  },
  {
    label: "sticky quick CTA",
    pass: /class="[^"]*\bquick-cta\b/.test(html),
  },
  {
    label: "application mail link",
    pass:
      html.includes('class="button button-primary application-link"') &&
      html.includes('href="mailto:'),
  },
  {
    label: "deployment README",
    pass: existsSync(resolve(root, "README.md")),
  },
  {
    label: "web manifest file",
    pass: existsSync(resolve(root, "site.webmanifest")),
  },
  {
    label: "Netlify config",
    pass: existsSync(resolve(root, "netlify.toml")),
  },
  {
    label: "Vercel config",
    pass: existsSync(resolve(root, "vercel.json")),
  },
  {
    label: "GitHub Pages nojekyll file",
    pass: existsSync(resolve(root, ".nojekyll")),
  },
  {
    label: "GitHub Pages workflow example",
    pass: existsSync(resolve(root, "github-pages-workflow.yml.example")),
  },
];

const failures = checks.filter((item) => !item.pass);

if (failures.length > 0) {
  console.error("Missing site polish items:");
  for (const failure of failures) {
    console.error(`- ${failure.label}`);
  }
  process.exit(1);
}

console.log("Site polish checks passed.");
