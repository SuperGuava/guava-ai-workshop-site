# Agent Flow Not Org Chart Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a landing page section that explains why AI work should be designed as one context-preserving flow instead of a human org chart of many roles.

**Architecture:** This is a static section inserted after `operator-proof` and before `execution-harness`. It compares a weak "AI org chart" approach with the Guava "one context, mode switching, verification" approach. Verification is covered in `verify-site.mjs`.

**Tech Stack:** Static HTML, CSS, Node verification script.

---

### Task 1: Add Failing Verification

**Files:**
- Modify: `verify-site.mjs`

**Step 1: Write the failing test**

Add a check named `AI flow over org chart section` requiring:
- `id="agent-flow"`
- `AI 조직도보다 중요한 것은 하나의 작업 흐름입니다`
- `사람처럼 나누지 말고, AI답게 흐르게 합니다`
- `핸드오프`
- `중앙 문맥`
- `.agent-flow-section`
- `.flow-compare`
- `.flow-mode-grid`

**Step 2: Run test to verify it fails**

Run:

```bash
node guava-ai-workshop-site/verify-site.mjs
```

Expected: FAIL with `AI flow over org chart section`.

### Task 2: Implement Section

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Step 1: Add HTML section**

Insert the comparison section after `operator-proof`.

**Step 2: Add responsive CSS**

Add layouts that collapse to one column on mobile.

**Step 3: Run verification**

Run:

```bash
node guava-ai-workshop-site/verify-site.mjs
```

Expected: `Site polish checks passed.`
