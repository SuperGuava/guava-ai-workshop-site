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
    label: "application form endpoint",
    pass:
      html.includes('id="application-form"') &&
      html.includes('action="https://formsubmit.co/ninefire@naver.com"') &&
      html.includes('method="POST"') &&
      html.includes('name="_subject" value="구아바의 AI 공방 신청 접수"') &&
      html.includes('name="_template" value="table"') &&
      html.includes('name="_captcha" value="false"') &&
      html.includes('name="contact"') &&
      !html.includes("mailto:ninefire@naver.com"),
  },
  {
    label: "application intake copy",
    pass:
      html.includes("작성한 내용은 ninefire@naver.com으로 접수됩니다") &&
      html.includes("신청 접수 보내기"),
  },
  {
    label: "stronger hero positioning",
    pass:
      html.includes("내 일을 AI에게 맡기는 2시간 실습") &&
      html.includes("수업 상담 신청하기") &&
      html.includes('href="#outcomes"'),
  },
  {
    label: "outcome proof section",
    pass:
      html.includes('id="outcomes"') &&
      html.includes("수업 후 바로 남는 결과물") &&
      html.includes("병원·검진 비교표") &&
      html.includes("부모님 여행 일정표") &&
      html.includes("업무 안내문 초안"),
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
