# Visual Typography Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the softer Korean display typography and text-heavy SVG infographics with a more modern execution-workshop visual system.

**Architecture:** Keep the static site structure. Swap the display font from Gowun Batang to Paperlogy, move infographic text into HTML/CSS, and make the SVG assets decorative without embedded text so typography stays consistent.

**Tech Stack:** Static HTML, CSS, SVG assets, Node verification script.

---

### Task 1: Add Failing Verification

**Files:**
- Modify: `verify-site.mjs`

**Step 1: Write the failing test**

Add checks requiring:
- Paperlogy CSS import and `--font-display: "Paperlogy"`
- no Gowun Batang import
- hero dashboard HTML copy
- prompt flow HTML infographic
- no embedded `<text>` or `font-family` in the SVG assets

**Step 2: Run test to verify it fails**

Run:

```bash
node guava-ai-workshop-site/verify-site.mjs
```

Expected: FAIL on typography and visual refresh checks.

### Task 2: Implement Typography and Visual Refresh

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `assets/hero-workshop.svg`
- Modify: `assets/question-ladder.svg`

**Step 1: Replace display font**

Import Paperlogy and set `--font-display` to Paperlogy.

**Step 2: Replace text-heavy visuals**

Use HTML/CSS for dashboard and prompt flow text. Keep SVGs decorative.

**Step 3: Run verification**

Run:

```bash
node guava-ai-workshop-site/verify-site.mjs
```

Expected: `Site polish checks passed.`
