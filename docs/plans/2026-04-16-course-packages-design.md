# Course Packages Section Design

Goal: Help visitors choose a workshop path before they submit the application form.

Recommended approach: Add a compact package selector section after the 30-second diagnosis. The section should show four clear options, describe who each option is for, name the expected output, and keep pricing flexible with "상담 후 안내" until the actual price is decided.

Alternatives considered:
- Add a fixed price table: clear, but risky before the offer and delivery scope are finalized.
- Add a long curriculum table: informative, but it would make the already-long landing page heavier on mobile.
- Add a package selector with CTA prefill: best balance because it turns interest into a specific application message.

Design:
- Place the section after `#ai-diagnosis` and before `#growth-map`.
- Add four packages: AI 첫걸음 2시간, 생활 AI 실습반, 업무 AI 실행반, AI 봇 제작 입문.
- Show 대상, 결과물, 방식, and 상담 후 안내 for each package.
- Make the first package visually primary because it is the safest default for new visitors.
- Add "패키지 상담 신청하기" buttons that fill the existing application form with the selected package and scroll to the form.
- Reuse the existing visual language and avoid new dependencies.

Testing:
- Extend `verify-site.mjs` to require the package section, copy, CSS hooks, and JS hook.
- Add a browser smoke test in the task workspace that clicks the AI 봇 제작 입문 package and verifies the application form is prefilled.
- Run existing diagnosis and submit tests to protect previous behavior.
- Run the layout audit across 360, 390, 430, 768, and 1024 widths.
