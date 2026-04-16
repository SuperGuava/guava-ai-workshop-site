# Course Packages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a course package selector that helps visitors choose a workshop path and prefill the application form.

**Architecture:** This is a static landing-page enhancement. `index.html` owns the section content, `styles.css` owns the responsive layout, `script.js` owns package-to-form prefill behavior, and `verify-site.mjs` protects the feature with a static smoke check.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node-based verification, Chromium smoke tests.

---

### Task 1: Add Failing Verification

**Files:**
- Modify: `verify-site.mjs`

**Step 1: Write the failing check**

Add a check named `course package selector section` that requires:
- `id="course-packages"`
- `나에게 맞는 수업 고르기`
- `AI 첫걸음 2시간`
- `생활 AI 실습반`
- `업무 AI 실행반`
- `AI 봇 제작 입문`
- `상담 후 안내`
- `패키지 상담 신청하기`
- `.package-section`, `.package-grid`, `.package-card`
- `packageApplyButtons`

**Step 2: Run test to verify it fails**

Run: `node guava-ai-workshop-site/verify-site.mjs` from `tasks/chat_7887978612`.

Expected: FAIL with `course package selector section`.

### Task 2: Add Section and Styles

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Step 1: Implement minimal HTML**

Place `#course-packages` after `#ai-diagnosis` and before `#growth-map`.

**Step 2: Implement responsive CSS**

Add `.package-section`, `.package-grid`, `.package-card`, `.package-card-primary`, and `.package-price`. Collapse `.package-grid` to one column at the existing `max-width: 1024px` breakpoint and reset card min-height at mobile width.

### Task 3: Add Form Prefill Behavior

**Files:**
- Modify: `script.js`

**Step 1: Add package profiles**

Create `packageProfiles` for `starter`, `life`, `work`, and `bot`.

**Step 2: Wire buttons**

Create `packageApplyButtons`, listen for clicks, set the application `audience`, set the message textarea, scroll to the form, and focus the message textarea.

### Task 4: Verify

**Files:**
- Test: `verify-site.mjs`
- Test: task workspace `package-ui-test.mjs`
- Test: task workspace `diagnosis-ui-test.mjs`
- Test: task workspace `submit-ui-test.mjs`
- Test: task workspace `layout-audit.mjs`

**Step 1: Static check**

Run: `node guava-ai-workshop-site/verify-site.mjs`

Expected: `Site polish checks passed.`

**Step 2: Package behavior check**

Run: `node package-ui-test.mjs`

Expected: package count is 4, audience is `실무자`, and message includes `관심 수업 패키지: AI 봇 제작 입문`.

**Step 3: Regression checks**

Run: `node diagnosis-ui-test.mjs`, `node submit-ui-test.mjs`, and `node layout-audit.mjs`.

Expected: all pass, with `overflowX: 0` for every audited width.
