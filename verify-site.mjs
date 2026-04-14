import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd(), "guava-ai-workshop-site");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");

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
      html.includes("30초 수업 상담 신청하기"),
  },
  {
    label: "stronger hero positioning",
    pass:
      html.includes("내 일 하나를 AI에게 맡기는 2시간 실습") &&
      html.includes("AI를 써보고 끝내지 말고, 오늘 반복되는 일 하나를 실제 결과물로 바꿔 봅니다.") &&
      html.includes("30초 상담 신청하기") &&
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
    label: "demo result previews",
    pass:
      html.includes("결과 미리보기") &&
      html.includes("이동 시간을 줄인 일정표") &&
      html.includes("첫 통화 체크리스트") &&
      html.includes("주말 AI 체험 비교표"),
  },
  {
    label: "audience cards sharpened",
    pass:
      html.includes("이런 분은 바로 신청해도 좋습니다") &&
      html.includes("AI를 켜도 뭘 물어볼지 막히는 분") &&
      html.includes("가족과 생활 정보를 정리해야 하는 분") &&
      html.includes("반복 안내문을 줄이고 싶은 분") &&
      html.includes("30초 수업 상담 신청하기"),
  },
  {
    label: "softer form guidance",
    pass:
      html.includes("30초만 적으면 수업 상담으로 이어집니다") &&
      html.includes("어떤 수업이 맞을지 간단히 적어 주세요") &&
      html.includes("확인 후 수업 방식과") &&
      html.includes("준비물을 안내드립니다") &&
      html.includes("내 상황을 적어 주세요"),
  },
  {
    label: "mobile-first CTA and form guidance",
    pass:
      html.includes(">상담 신청</a>") &&
      html.includes("30초 정도면 작성할 수 있습니다.") &&
      html.includes("핵심만 보고 30초 안에 상담 신청까지 이어집니다."),
  },
  {
    label: "mobile responsive CSS refinements",
    pass:
      css.includes("padding-bottom: calc(96px + env(safe-area-inset-bottom));") &&
      css.includes("bottom: calc(10px + env(safe-area-inset-bottom));") &&
      css.includes(".hero-detail {\n    display: none;") &&
      css.includes(".hero-metrics li:nth-child(n + 2)") &&
      css.includes(".outcome-card,\n  .operator-proof-card,\n  .practice-card") &&
      css.includes(".application-form textarea {\n    min-height: 108px;"),
  },
  {
    label: "Korean font pairing",
    pass:
      css.includes("pretendardvariable-dynamic-subset.css") &&
      css.includes("Gowun+Batang") &&
      css.includes('--font-body: "Pretendard Variable"') &&
      css.includes('--font-display: "Gowun Batang"'),
  },
  {
    label: "operator proof section",
    pass:
      html.includes('id="operator-proof"') &&
      html.includes("AI 봇을 직접 만든 사람이 초보자용 수업으로 바꿨습니다") &&
      html.includes("직접 만든 AI 봇 4개로 검증한 실전형 AI 수업") &&
      html.includes("에르9") &&
      html.includes("망고빙수") &&
      html.includes("망고 · Openclaw Agent") &&
      html.includes("망고2") &&
      css.includes(".operator-proof-section") &&
      css.includes(".operator-proof-grid") &&
      css.includes(".operator-proof-card,\n  .practice-card"),
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
