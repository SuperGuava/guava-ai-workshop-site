# AI Execution Harness Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a beginner-friendly AI execution harness and LLM-Wiki section to the landing page.

**Architecture:** This is a static landing page update. The new HTML section lives between `operator-proof` and `outcomes`, with scoped CSS classes and verification coverage in the existing Node script.

**Tech Stack:** Static HTML, CSS, Node verification script.

---

### Task 1: Add Failing Verification

**Files:**
- Modify: `verify-site.mjs`

**Step 1: Write the failing test**

Add a check named `AI execution harness section` that requires:
- `id="execution-harness"`
- `AI가 일하는 순서를 직접 만들어 봅니다`
- `목표 정리`
- `자료 연결`
- `단계 실행`
- `검증 루틴`
- `나만의 AI 사용 위키`
- `.harness-section`
- `.harness-steps`
- `.wiki-board`

**Step 2: Run test to verify it fails**

Run from the task root:

```bash
node guava-ai-workshop-site/verify-site.mjs
```

Expected: FAIL with `AI execution harness section`.

### Task 2: Implement Section

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Step 1: Add HTML**

Insert the new section after `operator-proof`.

**Step 2: Add CSS**

Add responsive styles for harness cards and wiki board. Reuse the current visual system.

**Step 3: Run verification**

Run:

```bash
node guava-ai-workshop-site/verify-site.mjs
```

Expected: `Site polish checks passed.`

### Task 3: Deploy

**Files:**
- Commit all changed site files.

**Step 1: Commit**

```bash
git add index.html styles.css verify-site.mjs docs/plans/2026-04-15-ai-execution-harness-design.md docs/plans/2026-04-15-ai-execution-harness.md
git commit -m "Add AI execution harness section"
```

**Step 2: Push**

```bash
git push origin main
```

**Step 3: Verify public URL**

Check that the deployed page returns HTTP 200 and contains the new section copy.
