# AI Agent Instructions

This repository contains the Guava AI Workshop static landing page.

## Required First Read

Before changing any UI, copy, layout, section, color, typography, or mobile behavior, read:

- `DESIGN.md`

`DESIGN.md` is the source of truth for:

- brand identity
- Korean copy tone
- color and font rules
- section patterns
- mobile layout rules
- interaction feedback rules
- verification checklist

Do not import a random external design system over this site. The current identity is a warm, practical Korean AI workshop, not a generic SaaS landing page.

## Editing Scope

Main site files:

- `index.html`
- `styles.css`
- `script.js`
- `assets/`
- `DESIGN.md`

Parser Studio is separate:

- `parser-studio/`

Do not mix Parser Studio changes with the main landing page unless the user explicitly asks.

## Copy Rules

Use Korean-first copy. English can be used for short eyebrow labels only.

Prefer:

- concrete user outcomes
- practical AI work examples
- beginner-friendly explanations
- visible application flow

Avoid:

- abstract AI hype
- unexplained technical jargon
- generic robot/AI metaphors
- developer-only SaaS language

## Design Rules

Keep the current visual identity:

- guava red for primary CTAs
- leaf green for structure and trust
- sun yellow for warmth
- warm light backgrounds
- Paperlogy for display headings
- Pretendard for body text

Mobile readability is critical. Check 360px and 390px widths for long Korean text, overflow, and CTA placement when layout changes.

## Interaction Rules

Existing interactions must keep working:

- diagnosis result update
- package consultation prefill
- mission consultation prefill
- sample copy toast
- application form submission feedback dialog

If adding interaction, always provide visible feedback.

## Verification

From the parent task directory, run:

```bash
node guava-ai-workshop-site/verify-site.mjs
```

If editing layout or mobile behavior, also inspect mobile widths around 360px, 390px, 430px, 768px, and 1024px.

Do not claim the site is ready until verification has passed.
