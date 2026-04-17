# AI Work Structure Section

## Goal

Sharpen the site positioning from "learn AI tools" to "learn the operating structure that makes AI work reliably."

## Source Idea

The supplied draft frames the gap clearly: good models still fail in practical work when goals, context, tools, checks, and memory are not structured.

## Implemented Direction

- Add a section between `agent-flow` and `execution-harness`.
- Lead with "AI가 막히는 이유는 모델이 아니라 구조입니다."
- Keep the equation `Agent = Model + Harness`.
- Explain five harness elements: 목표, 맥락, 도구, 검증, 기억.
- Connect the concept back to class outputs: 병원 비교표, 여행 일정표, 업무 안내문, AI 봇 설계서.

## Verification

- Add `verify-site.mjs` checks for the section.
- Include structure elements in the layout audit.
- Run existing interaction smoke tests to confirm application flows remain intact.
