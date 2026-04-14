# AI Execution Harness Design

## Goal

Position the workshop as a practical AI execution class, not a plain prompt class.

## Direction

The new section should translate current agent and LLM-Wiki trends into beginner language. The page should not lead with hard terms like harness, agent, or RAG. It should say that students learn how to make AI handle a real task through a simple sequence: clarify the goal, attach context, let AI produce artifacts, review the result, and save reusable patterns.

## Site Changes

- Add a section after the operator proof section, where the founder's bot-building credibility naturally leads into the new concept.
- Use the headline "AI가 일하는 순서를 직접 만들어 봅니다".
- Include four short steps: 목표 정리, 자료 연결, 단계 실행, 검증 루틴.
- Add a second block for "나만의 AI 사용 위키" to show that the class leaves reusable knowledge assets.
- Keep copy concrete and life-oriented so beginner users do not feel the page became too technical.

## Verification

- Extend `verify-site.mjs` so the new section and CSS hooks are required.
- Run the verification script before and after implementation to confirm red-green behavior.
