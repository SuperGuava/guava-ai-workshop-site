# 30-Second AI Diagnosis Design

Goal: Add a lightweight diagnosis section that helps visitors identify the right AI workshop path before they reach the application form.

Recommended approach: Use a static, client-side checklist instead of a heavy quiz. The visitor selects one or more situations, sees a recommended workshop direction, then can send that result into the application form.

Alternatives considered:
- Static checklist only: easiest to read, but does not create a personal bridge into the form.
- Multi-step quiz: more interactive, but too heavy for a simple landing page.
- Recommended checklist plus form prefill: best balance for conversion, clarity, and maintenance.

Design:
- Place the section after the trust strip and before the growth map.
- Present four common situations: not knowing what to ask, reducing repetitive work, teaching family, building a bot or automation flow.
- Show a recommendation panel with a default result and update it when options are selected.
- Include a CTA that copies the diagnosis result into the application form message and scrolls to the form.
- Keep all logic in `script.js`; no backend or new dependency.

Testing:
- Extend `verify-site.mjs` to require the section, key copy, CSS classes, and JS hooks.
- Add a browser-level smoke test in the task workspace to select an option and verify the form is prefilled.

