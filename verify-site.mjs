import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd(), "guava-ai-workshop-site");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");
const heroSvg = readFileSync(resolve(root, "assets/hero-workshop.svg"), "utf8");
const ladderSvg = readFileSync(resolve(root, "assets/question-ladder.svg"), "utf8");

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
      html.includes("내 일 하나를") &&
      html.includes("AI에게") &&
      html.includes("맡기는 2시간 실습") &&
      html.includes("AI를 써보고 끝내지 말고, 오늘 반복되는 일 하나를 실제 결과물로 바꿔 봅니다.") &&
      html.includes("30초 상담 신청하기") &&
      html.includes('href="#outcomes"'),
  },
  {
    label: "outcome proof section",
    pass:
      html.includes('id="outcomes"') &&
      html.includes("수업 끝나면 이런 결과물이 손에 남습니다") &&
      html.includes("가족 작전실 리포트") &&
      html.includes("AI 비서 업무 데스크") &&
      html.includes("망고2 질문 템플릿팩") &&
      html.includes("Before") &&
      html.includes("After") &&
      css.includes(".artifact-preview") &&
      css.includes(".sample-pill"),
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
    label: "reassurance section",
    pass:
      html.includes("이런 걱정이 있어도 괜찮습니다") &&
      html.includes("컴퓨터를 잘 못해도 됩니다") &&
      html.includes("질문문은 같이 만듭니다") &&
      html.includes("수업 후 다시 쓸 문구를 가져갑니다") &&
      html.includes("막히는 상황도 수업에 포함합니다") &&
      html.includes('href="#application-form">걱정 없이 상담 신청하기</a>') &&
      css.includes(".reassurance-section") &&
      css.includes(".reassurance-grid"),
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
      css.includes(".outcome-card") &&
      css.includes(".operator-proof-card") &&
      css.includes(".practice-card") &&
      css.includes(".application-form textarea {\n    min-height: 108px;"),
  },
  {
    label: "Korean font pairing",
    pass:
      css.includes("pretendardvariable-dynamic-subset.css") &&
      css.includes("Paperlogy.css") &&
      css.includes('--font-body: "Pretendard Variable"') &&
      css.includes('--font-display: "Paperlogy"') &&
      !css.includes("Gowun+Batang"),
  },
  {
    label: "visual refresh without embedded SVG text",
    pass:
      html.includes('class="hero-dashboard"') &&
      html.includes("작업장 대시보드") &&
      html.includes('class="prompt-flow ') &&
      html.includes("검증된 템플릿") &&
      !html.includes('src="assets/question-ladder.svg"') &&
      !heroSvg.includes("<text") &&
      !heroSvg.includes("font-family") &&
      !ladderSvg.includes("<text") &&
      !ladderSvg.includes("font-family"),
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
      css.includes(".operator-proof-card"),
  },
  {
    label: "AI flow over org chart section",
    pass:
      html.includes('id="agent-flow"') &&
      html.includes("AI 조직도보다 중요한 것은 하나의 작업 흐름입니다") &&
      html.includes("사람처럼 나누지 말고, AI답게 흐르게 합니다") &&
      html.includes("핸드오프") &&
      html.includes("중앙 문맥") &&
      css.includes(".agent-flow-section") &&
      css.includes(".flow-compare") &&
      css.includes(".flow-mode-grid"),
  },
  {
    label: "AI growth map section",
    pass:
      html.includes('id="growth-map"') &&
      html.includes("AI를 쓰는 사람에서, AI가 일하게 만드는 사람으로") &&
      html.includes("AI 입문자") &&
      html.includes("AI 실행자") &&
      html.includes("AI 설계자") &&
      html.includes("AI 제작자") &&
      html.includes("나는 지금 AI를 얼마나 쓸 수 있을까?") &&
      css.includes(".growth-section") &&
      css.includes(".growth-path") &&
      css.includes(".readiness-check"),
  },
  {
    label: "AI execution harness section",
    pass:
      html.includes('id="execution-harness"') &&
      html.includes("AI가 일하는 순서를 직접 만들어 봅니다") &&
      html.includes("목표 정리") &&
      html.includes("자료 연결") &&
      html.includes("단계 실행") &&
      html.includes("검증 루틴") &&
      html.includes("나만의 AI 사용 위키") &&
      css.includes(".harness-section") &&
      css.includes(".harness-steps") &&
      css.includes(".wiki-board"),
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
