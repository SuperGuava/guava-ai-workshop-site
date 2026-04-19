import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd(), "guava-ai-workshop-site");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");
const script = readFileSync(resolve(root, "script.js"), "utf8");

const checks = [
  ["workspace section", html.includes('id="personal-workspace"')],
  ["workspace headline", html.includes("수업이 끝나면, 나만의 AI 작업장이 남습니다")],
  ["question template artifact", html.includes("내 질문 템플릿")],
  ["repeat work sequence artifact", html.includes("반복 업무 실행 순서")],
  ["verification checklist artifact", html.includes("검증 체크리스트")],
  ["personal wiki artifact", html.includes("개인 AI 사용 위키")],
  ["workspace CTA", html.includes("이 작업장으로 상담 신청하기")],
  ["workspace CSS section", css.includes(".workspace-section")],
  ["workspace CSS layout", css.includes(".workspace-layout")],
  ["workspace CSS artifact grid", css.includes(".workspace-artifact-grid")],
  ["workspace CSS apply", css.includes(".workspace-apply")],
  ["workspace JS button", script.includes("workspaceApplyButton")],
  ["workspace JS profile", script.includes("personalWorkspaceProfile")],
  ["workspace JS prefill copy", script.includes("개인 AI 작업장")],
];

const failures = checks.filter(([, pass]) => !pass);

if (failures.length > 0) {
  console.error("Missing personal workspace items:");
  for (const [label] of failures) {
    console.error(`- ${label}`);
  }
  process.exit(1);
}

console.log("Personal workspace UI checks passed.");
