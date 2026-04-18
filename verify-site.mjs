import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd(), "guava-ai-workshop-site");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");
const script = readFileSync(resolve(root, "script.js"), "utf8");
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
    label: "cache-busted frontend assets",
    pass:
      html.includes('href="styles.css?v=') &&
      html.includes('src="script.js?v=') &&
      !html.includes('href="styles.css"') &&
      !html.includes('src="script.js"'),
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
      html.includes('data-submit-endpoint="https://formsubmit.co/ajax/ninefire@naver.com"') &&
      html.includes('method="POST"') &&
      html.includes('name="_subject" value="구아바의 AI 공방 신청 접수"') &&
      html.includes('name="_template" value="table"') &&
      html.includes('name="_captcha" value="false"') &&
      html.includes('name="_url" value="https://superguava.github.io/guava-ai-workshop-site/"') &&
      html.includes('name="contact"') &&
      !html.includes("mailto:ninefire@naver.com"),
  },
  {
    label: "application submit feedback",
    pass:
      html.includes('id="application-status"') &&
      html.includes('class="submit-dialog"') &&
      html.includes('role="dialog"') &&
      html.includes("신청 내용을 보내는 중입니다") &&
      html.includes("신청이 접수되었습니다") &&
      css.includes(".form-status") &&
      css.includes(".submit-dialog") &&
      css.includes(".submit-dialog.is-visible") &&
      script.includes('document.querySelector("#application-form")') &&
      script.includes('applicationForm.addEventListener("submit"') &&
      script.includes("fetch(submitEndpoint") &&
      script.includes("신청 내용을 보내는 중입니다") &&
      script.includes("신청이 접수되었습니다"),
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
    label: "mobile Korean line break polish",
    pass:
      css.includes("word-break: keep-all;") &&
      css.includes("overflow-wrap: break-word;") &&
      css.includes(".eyebrow,\n  .mini-label") &&
      css.includes("letter-spacing: 0.1em;") &&
      css.includes(".hero-dashboard {\n    margin-top: -56px;"),
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
    label: "AI structure not model section",
    pass:
      html.includes('id="ai-work-structure"') &&
      html.includes("AI가 막히는 이유는 모델이 아니라 구조입니다") &&
      html.includes("문제는 모델이 아니라 AI가 일하는 구조일 수 있습니다") &&
      html.includes("Agent = Model + Harness") &&
      html.includes("모델은 두뇌이고, 하네스는 그 두뇌가 실제 일을 하게 만드는 운영 구조입니다") &&
      html.includes("하네스 5요소") &&
      html.includes("목표") &&
      html.includes("맥락") &&
      html.includes("도구") &&
      html.includes("검증") &&
      html.includes("기억") &&
      html.includes("수업에서 만드는 작은 하네스") &&
      css.includes(".structure-section") &&
      css.includes(".structure-equation") &&
      css.includes(".structure-grid"),
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
    label: "30-second AI diagnosis section",
    pass:
      html.includes('id="ai-diagnosis"') &&
      html.includes("나는 어떤 AI 수업이 맞을까?") &&
      html.includes("30초 AI 진단") &&
      html.includes("AI를 켜도 뭘 물어볼지 모르겠다") &&
      html.includes("반복 업무를 줄이고 싶다") &&
      html.includes("부모님이나 가족에게 알려주고 싶다") &&
      html.includes("내 AI 봇이나 자동화 흐름을 만들고 싶다") &&
      html.includes("아이디어를 시각 결과물로 만들고 싶다") &&
      html.includes('id="diagnosis-result"') &&
      html.includes("추천 수업 방향") &&
      css.includes(".diagnosis-section") &&
      css.includes(".diagnosis-options") &&
      css.includes(".diagnosis-result") &&
      script.includes('document.querySelector("#diagnosis-form")') &&
      script.includes("updateDiagnosisResult") &&
      script.includes("AI 디자인 공방 수업") &&
      script.includes("diagnosisApply"),
  },
  {
    label: "AI design lab section",
    pass:
      html.includes('id="design-lab"') &&
      html.includes("AI DESIGN LAB") &&
      html.includes("아이디어가 시안이 되고, 시안이 결과물이 됩니다") &&
      html.includes("아이디어 → 시안 → 수정 → 공유/구현") &&
      html.includes("Canva 초안") &&
      html.includes("PPTX 발표자료") &&
      html.includes("HTML 랜딩페이지") &&
      css.includes(".design-lab-section") &&
      css.includes(".design-lab-steps") &&
      script.includes("designApplyButton") &&
      script.includes("AI 디자인 공방"),
  },
  {
    label: "course package selector section",
    pass:
      html.includes('id="course-packages"') &&
      html.includes("나에게 맞는 수업 고르기") &&
      html.includes("AI 첫걸음 2시간") &&
      html.includes("생활 AI 실습반") &&
      html.includes("업무 AI 실행반") &&
      html.includes("AI 봇 제작 입문") &&
      html.includes("상담 후 안내") &&
      html.includes("패키지 상담 신청하기") &&
      css.includes(".package-section") &&
      css.includes(".package-grid") &&
      css.includes(".package-card") &&
      script.includes("packageApplyButtons"),
  },
  {
    label: "post-application next steps section",
    pass:
      html.includes('id="next-steps"') &&
      html.includes("신청 후 이렇게 진행됩니다") &&
      html.includes("상담 접수") &&
      html.includes("방향 확인") &&
      html.includes("일정과 준비물 안내") &&
      html.includes("수업 준비물") &&
      css.includes(".next-step-section") &&
      css.includes(".next-step-grid") &&
      css.includes(".prep-list"),
  },
  {
    label: "copyable sample kit section",
    pass:
      html.includes('id="sample-kit"') &&
      html.includes("수업 샘플 미리보기") &&
      html.includes("병원 비교표 샘플") &&
      html.includes("여행 일정표 샘플") &&
      html.includes("업무 안내문 샘플") &&
      html.includes("AI 봇 기획서 샘플") &&
      html.includes("샘플 문구 복사") &&
      css.includes(".sample-kit-section") &&
      css.includes(".sample-kit-grid") &&
      css.includes(".sample-copy") &&
      script.includes("sampleCopyButtons"),
  },
  {
    label: "AI workshop mission cards section",
    pass:
      html.includes('id="mission-lab"') &&
      html.includes("오늘 완성하는 AI 미션 4개") &&
      html.includes("병원 비교표 만들기") &&
      html.includes("여행 일정 AI에게 맡기기") &&
      html.includes("업무 안내문 자동 생성하기") &&
      html.includes("내 AI 봇 설계서 만들기") &&
      html.includes("결과물 갤러리") &&
      html.includes("이 미션으로 상담 신청하기") &&
      css.includes(".mission-section") &&
      css.includes(".mission-grid") &&
      css.includes(".mission-gallery") &&
      script.includes("missionApplyButtons"),
  },
  {
    label: "operator proof log section",
    pass:
      html.includes('id="proof-log"') &&
      html.includes("운영자 검증 로그") &&
      html.includes("에르9") &&
      html.includes("망고2") &&
      html.includes("질문 정렬") &&
      html.includes("실행과 검증") &&
      css.includes(".proof-log-section") &&
      css.includes(".proof-log-grid"),
  },
  {
    label: "mobile summary mode",
    pass:
      html.includes('class="mobile-summary"') &&
      html.includes("2시간 실습") &&
      html.includes("결과물 1개 완성") &&
      html.includes("왕초보 가능") &&
      html.includes("상담 후 안내") &&
      css.includes(".mobile-summary"),
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
