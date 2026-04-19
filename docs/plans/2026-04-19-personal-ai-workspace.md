# Personal AI Workspace Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a main-site section that shows students leave with a reusable personal AI workspace, not just one-time prompt tips.

**Architecture:** Add one static section between `execution-harness` and `outcomes`, style it with the existing warm workshop design system, and connect its CTA to the existing application form prefill flow. Add a small Node smoke test for the section, script hook, and CSS selectors.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node smoke tests.

---

### Task 1: Write Workspace Smoke Test

**Files:**
- Create: `personal-workspace-ui-test.mjs`

**Step 1: Write the failing test**

Create a Node script that reads `index.html`, `styles.css`, and `script.js`, then asserts:
- `id="personal-workspace"` exists.
- The section includes "수업이 끝나면, 나만의 AI 작업장이 남습니다".
- The section includes reusable artifacts: "내 질문 템플릿", "반복 업무 실행 순서", "검증 체크리스트", "개인 AI 사용 위키".
- The CTA includes "이 작업장으로 상담 신청하기".
- CSS includes `.workspace-section`, `.workspace-layout`, `.workspace-artifact-grid`, and `.workspace-apply`.
- JS includes `workspaceApplyButton`, `personalWorkspaceProfile`, and a prefill message containing "개인 AI 작업장".

**Step 2: Run test to verify it fails**

Run from the parent task directory:

```bash
node guava-ai-workshop-site/personal-workspace-ui-test.mjs
```

Expected: FAIL because the new section is not implemented yet.

### Task 2: Add Personal AI Workspace Section

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`
- Modify: `verify-site.mjs`

**Step 1: Implement HTML section**

Add `section#personal-workspace` after `section#execution-harness`.
Content should explain that the student leaves with:
- question templates
- repeated work execution sequence
- verification checklist
- personal AI usage wiki

Add a `.workspace-apply` button that fills the application form.

**Step 2: Implement CSS**

Add warm leaf/guava styling using the existing component language:
- `.workspace-section`
- `.workspace-layout`
- `.workspace-board`
- `.workspace-artifact-grid`
- `.workspace-artifact`
- `.workspace-apply`

Include responsive behavior in existing media queries.

**Step 3: Implement JS prefill**

Add:
- `workspaceApplyButton`
- `personalWorkspaceProfile`
- click handler that sets audience to "실무자", fills the message, scrolls to `#application-form`, and focuses the textarea.

**Step 4: Update verify-site**

Add a check that validates the section, CSS selectors, and JS hook.

### Task 3: Verify And Deploy

**Files:**
- Test: `personal-workspace-ui-test.mjs`
- Test: `verify-site.mjs`

**Step 1: Run focused test**

```bash
node guava-ai-workshop-site/personal-workspace-ui-test.mjs
```

Expected: PASS.

**Step 2: Run full site smoke test**

```bash
node guava-ai-workshop-site/verify-site.mjs
```

Expected: `Site polish checks passed.`

**Step 3: Commit and push**

```bash
git -C guava-ai-workshop-site add index.html styles.css script.js verify-site.mjs personal-workspace-ui-test.mjs docs/plans/2026-04-19-personal-ai-workspace.md
git -C guava-ai-workshop-site commit -m "Add personal AI workspace section"
git -C guava-ai-workshop-site push origin main
```

**Step 4: Verify deployed URL**

Use the new short commit hash:

```text
https://superguava.github.io/guava-ai-workshop-site/?v=<short-sha>
```
