import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd(), "guava-ai-workshop-site");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");
const script = readFileSync(resolve(root, "script.js"), "utf8");

const checks = [
  ["video docent section", html.includes('id="video-docent"')],
  ["video docent title", html.includes("AI 영상 해설 공방")],
  ["video docent promise", html.includes("좋은 AI 유튜브를 혼자 보지 않고, 같이 보며 내 일로 바꾸는 수업입니다")],
  ["museum docent metaphor", html.includes("박물관 해설사처럼")],
  ["watch pause explain step", html.includes("같이 보고 멈춰서 설명")],
  ["hands-on step", html.includes("내 화면에서 같이 실습")],
  ["workspace save step", html.includes("개인 AI 작업장에 저장")],
  ["video docent CTA", html.includes("영상 해설 공방 상담 신청하기")],
  ["video docent CSS section", css.includes(".video-docent-section")],
  ["video docent CSS layout", css.includes(".video-docent-layout")],
  ["video docent CSS steps", css.includes(".video-docent-steps")],
  ["video docent CSS apply", css.includes(".video-docent-apply")],
  ["video docent JS button", script.includes("videoDocentApplyButton")],
  ["video docent JS profile", script.includes("videoDocentProfile")],
  ["video docent JS prefill", script.includes("AI 영상 해설 공방")],
];

const failures = checks.filter(([, pass]) => !pass);

if (failures.length > 0) {
  console.error("Missing video docent items:");
  for (const [label] of failures) {
    console.error(`- ${label}`);
  }
  process.exit(1);
}

console.log("Video docent UI checks passed.");
