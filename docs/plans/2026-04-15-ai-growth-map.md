# AI Growth Map Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an AI growth map and readiness self-check section to help visitors identify their current AI usage level.

**Architecture:** This is a static page enhancement. Add one section after the trust strip and before the operator proof section, then cover it in `verify-site.mjs`.

**Tech Stack:** Static HTML, CSS, Node verification script.

---

### Task 1: Add Failing Verification

**Files:**
- Modify: `verify-site.mjs`

**Step 1: Write the failing test**

Add a check named `AI growth map section` that requires:
- `id="growth-map"`
- `AI를 쓰는 사람에서, AI가 일하게 만드는 사람으로`
- `AI 입문자`
- `AI 실행자`
- `AI 설계자`
- `AI 제작자`
- `나는 지금 AI를 얼마나 쓸 수 있을까?`
- `.growth-section`
- `.growth-path`
- `.readiness-check`

**Step 2: Run test to verify it fails**

Run:

```bash
node guava-ai-workshop-site/verify-site.mjs
```

Expected: FAIL with `AI growth map section`.

### Task 2: Implement Section

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Step 1: Add HTML**

Insert the growth section after the trust strip.

**Step 2: Add CSS**

Add responsive grid styles that collapse cleanly on mobile.

**Step 3: Run verification**

Run:

```bash
node guava-ai-workshop-site/verify-site.mjs
```

Expected: `Site polish checks passed.`
