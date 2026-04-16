# 30-Second AI Diagnosis Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 30-second AI diagnosis section that gives visitors a recommended workshop direction and sends that result into the application form.

**Architecture:** The landing page stays static. HTML provides the checklist and result panel, CSS handles responsive layout, and `script.js` updates the recommendation and prefills the existing application form.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, existing `verify-site.mjs`, Chromium smoke scripts in the task workspace.

---

### Task 1: Verification

**Files:**
- Modify: `verify-site.mjs`

**Steps:**
- Add a failing check for `id="ai-diagnosis"`, checklist copy, result panel, CSS classes, and JS hooks.
- Run `node guava-ai-workshop-site/verify-site.mjs` from the parent task folder.
- Expected: fail with `30-second AI diagnosis section`.

### Task 2: Markup

**Files:**
- Modify: `index.html`

**Steps:**
- Add the diagnosis section after the trust strip.
- Add checkbox options, result panel, and CTA to apply the result to the form.
- Keep copy short and mobile-friendly.

### Task 3: Styling

**Files:**
- Modify: `styles.css`

**Steps:**
- Add `.diagnosis-section`, `.diagnosis-options`, `.diagnosis-choice`, and `.diagnosis-result`.
- Add 1024px and 720px responsive behavior.

### Task 4: Interaction

**Files:**
- Modify: `script.js`

**Steps:**
- Read selected diagnosis values.
- Update the recommendation title/body.
- On CTA click, prefill the application form audience and message, then scroll to the form.

### Task 5: Verify And Deploy

**Files:**
- Modify: `index.html`, `styles.css`, `script.js`, `verify-site.mjs`
- Create: `docs/plans/2026-04-16-ai-diagnosis-design.md`
- Create: `docs/plans/2026-04-16-ai-diagnosis.md`

**Steps:**
- Run `node guava-ai-workshop-site/verify-site.mjs`.
- Run a browser smoke test for diagnosis prefill.
- Commit and push to `main`.
- Confirm GitHub Pages build success.
- Confirm public URL returns `HTTP/2 200`.

