# Guava AI Workshop Design System

This file is the design reference for AI agents editing the Guava AI Workshop site.
Use it before changing layout, copy, colors, sections, components, or mobile behavior.

## Product Identity

### Name
- Korean: 구아바의 AI 공방
- English support label: AI Education Atelier

### Positioning
- Practical AI workshop for people who want AI to produce useful results.
- The site teaches users how to make AI work, not just how to ask clever prompts.
- The core belief is: model quality matters, but structure, context, validation, and reusable memory make AI useful in real work.

### Main Promise
- Help users turn one real task into a usable AI-assisted result within a short workshop.
- Examples of results: hospital comparison table, family travel plan, workplace notice, checklist, AI bot outline, personal AI usage wiki.

### Strategic Themes
- AI execution over AI theory.
- Harness design over model name memorization.
- Personal workflows over generic prompt tips.
- Beginner-friendly language over technical jargon.
- Reusable outputs over one-time answers.
- Human validation over blind trust in AI.

## Audience

Design and copy should work for these groups:

- 왕초보: people who open AI tools but do not know what to ask.
- 중장년층 / family users: people who want practical help for hospital, travel, family communication, and everyday decisions.
- 실무자: people who want to reduce repetitive writing, comparison, summary, notice, and checklist work.
- AI bot beginners: people interested in small AI workflows, bot planning, harness structure, memory, and verification.

Avoid making the page feel like a developer-only SaaS product. It should feel practical, warm, and credible.

## Voice And Copy Rules

### Voice
- Direct, warm, practical.
- Use Korean first. English labels may be used as short section eyebrows.
- Explain difficult AI concepts through everyday work.
- Prefer concrete outputs over abstract claims.

### Good Copy Patterns
- "AI를 쓰는 사람에서, AI가 일하게 만드는 사람으로"
- "내 일 하나를 AI에게 맡기는 2시간 실습"
- "질문 한 번으로 끝나지 않고 목표, 자료, 실행, 검증이 이어지는 흐름"
- "수업 끝나면 이런 결과물이 손에 남습니다"
- "모델은 두뇌이고, 하네스는 그 두뇌가 실제 일을 하게 만드는 운영 구조입니다"

### Avoid
- Empty hype such as "AI 시대의 혁신적인 미래".
- Overly abstract claims without a visible user result.
- Developer jargon without an everyday translation.
- Saying "agent", "workflow", "harness", or "LLM-Wiki" without showing what the beginner actually does.
- Long paragraphs on mobile.

### Preferred Explanation Style
- Technical term first only when useful.
- Everyday explanation immediately after.

Example:
- "하네스는 AI가 실제로 일하게 만드는 운영 구조입니다."
- "검증 루틴은 AI 답변을 그대로 믿지 않고 누락과 과장을 확인하는 순서입니다."

## Visual Direction

### Mood
- Warm workshop.
- Practical classroom.
- Friendly AI lab.
- Handmade but structured.
- Beginner-safe, not childish.

### Visual Metaphors
- Workshop dashboard.
- Mission cards.
- Result artifacts.
- AI work flow.
- Personal wiki.
- Bot builder notebook.
- Family or work decision board.

### Avoid Visual Metaphors
- Generic robot mascots.
- Futuristic neon grids.
- Corporate blue SaaS dashboards.
- Random AI brain graphics.
- Decorative images that do not explain the learning result.

## Color System

Use the existing CSS custom properties as the source of truth.

### Backgrounds
- `--bg: #fff7ef`
- `--bg-strong: #ffe7d0`
- Main page background should stay warm and light.
- Use soft gradients sparingly to create warmth.

### Surfaces
- `--surface: rgba(255, 249, 241, 0.88)`
- `--surface-strong: #fff3e4`
- Use translucent warm surfaces for cards and panels.
- Primary content surfaces should feel readable, not glassy or noisy.

### Text
- `--text: #2b1f1b`
- `--muted: #70564e`
- Main text should be dark warm brown.
- Secondary text should use muted warm brown.

### Brand Accents
- `--guava: #f36a5f`
- `--guava-deep: #d84d43`
- `--leaf: #4f7b5b`
- `--leaf-soft: #8eb193`
- `--sun: #f8bf66`

### Usage Rules
- Guava red is for primary CTAs and important emphasis.
- Leaf green is for trust, structure, learning flow, and AI harness ideas.
- Sun yellow is for warmth, small highlights, and friendly energy.
- Dark brown/leaf gradient may be used for high-importance panels.

### Avoid
- Dominant purple or purple-blue gradients.
- Cold enterprise blue as the main brand color.
- Heavy black backgrounds across whole sections.
- Beige-only pages without guava or leaf contrast.
- Too many unrelated accent colors in one section.

## Typography

### Fonts
- Body: `Pretendard Variable`, `Pretendard`, `Apple SD Gothic Neo`, `Malgun Gothic`, `Noto Sans KR`, sans-serif.
- Display: `Paperlogy`, then Pretendard and system Korean fonts.

### Font Roles
- Use Paperlogy for high-impact headings, brand marks, prices, and important result labels.
- Use Pretendard for paragraphs, navigation, forms, labels, and dense content.
- Keep Korean readability as the first priority.

### Heading Rules
- Headings should be short and concrete.
- Use strong line-height for display headings.
- Prefer natural Korean line breaks.
- Keep important words together with `.nowrap` when necessary.

### Body Rules
- Body copy should use generous line-height.
- Keep paragraphs short.
- Avoid dense explanatory blocks on mobile.
- Use list items when explaining steps, results, or criteria.

### Current Important CSS Rules
- Use `word-break: keep-all`.
- Use `overflow-wrap: break-word`.
- Letter spacing should not be negative.
- Eyebrow labels may use light positive letter spacing.

## Layout System

### Page Shell
- Max width: `min(1200px, calc(100% - 32px))`.
- Mobile width: `min(100% - 20px, 1200px)`.
- Page should feel spacious but not empty.

### Section Structure
Each major section should usually contain:
- `.section-heading`
- `.eyebrow`
- `h2`
- short explanatory paragraph
- one clear content grid or panel

### Section Spacing
- Desktop sections use generous vertical padding.
- Mobile sections use tighter padding and simpler stacking.
- Avoid adding dense content directly after another dense content block.

### Grid Behavior
- Desktop may use 2, 3, or 4 columns when content is short.
- At `max-width: 1024px`, most grids should collapse to one column.
- At `max-width: 720px`, cards should have reduced padding and no fixed large heights.

### Primary Flow
The page should generally move in this order:
- Hero: immediate promise and CTA.
- Trust / diagnosis / course selector: help the user find their path.
- Growth map: explain the learning journey.
- Operator proof: show the instructor actually builds AI bots.
- Agent flow / harness structure: show the unique viewpoint.
- Outcomes / samples / missions: show concrete results.
- Philosophy / curriculum / practice: explain the course.
- Reassurance / next steps / contact / FAQ: reduce hesitation and collect applications.

## Component Rules

### Buttons
- Primary buttons use guava gradient.
- Secondary buttons use warm translucent surface with subtle border.
- Buttons should be full width on mobile.
- CTA text should be action-based, such as "30초 상담 신청하기" or "이 미션으로 상담 신청하기".
- Do not use vague CTAs like "Learn More" unless the destination is informational.

### Cards
- Cards should contain one clear idea.
- Use short labels, heading, body, and one action or result.
- Avoid cards inside cards unless it is an artifact preview or functional sub-block.
- Card copy should show what the user will do or receive.

### Strong Panels
Use dark leaf/brown gradient panels for:
- diagnosis result
- readiness check
- AI formula or major strategic explanation
- highlighted package

Do not overuse strong panels. One strong panel per section is usually enough.

### Forms
- Forms should feel supportive, not administrative.
- Keep labels plain and clear.
- Show status feedback after submission.
- Preserve the success dialog pattern for application submission.
- If a section pre-fills the form, the message should clearly include the selected package, mission, or diagnosis.

### Toasts And Feedback
- Copy actions should show a short toast.
- Form submission should show visible status text and dialog feedback.
- Interactive changes should not silently fail.

### Floating CTA
- Mobile quick CTA is useful and should remain simple.
- It should not cover critical form controls.
- Account for safe-area bottom spacing.

## Section Patterns

### Hero
- Lead with a concrete result, not a generic AI claim.
- Keep the main heading short.
- Show two CTAs: application and result preview.
- On mobile, hide long supporting copy and show a concise proof line.
- Hero visual should explain a work process, not just decorate.

### 30-Second Diagnosis
- Helps users self-identify.
- Uses checkbox cards and a result panel.
- The result must map to application form prefill.
- Keep choices practical and non-technical.

### Course Packages
- Four clear paths: AI first step, life AI, work AI, bot builder.
- Each package should include target, output, format, and consultation CTA.
- Price may remain "상담 후 안내" unless exact pricing is intentionally added.

### AI Design Lab
- Translate AI design trends into a beginner-friendly outcome workflow.
- Do not promote a specific vendor product as the main message.
- Preferred flow: idea/materials -> first draft -> conversational editing -> share/export/implementation.
- Outcome examples may include Canva draft, PDF guide, PPTX presentation, and HTML landing page.
- Connect this section to `DESIGN.md` as a practical example of brand standards guiding AI-made visual results.

### Growth Map
- Shows progression from AI user to AI maker.
- Keep levels easy to understand.
- Avoid implying users must become developers.

### Operator Proof
- Emphasize that the instructor directly builds and runs AI bots.
- Use named bots as proof: 에르9, 망고빙수, 망고, 망고2.
- Translate operator experience into beginner learning value.

### Agent Flow
- Explain why human-style AI organization charts are often inefficient.
- Prefer one coherent AI work flow over many artificial roles.
- Key ideas: central context, mode switching, validation routine.

### AI Work Structure
- Keep the formula `Agent = Model + Harness`.
- Explain model as brain and harness as operating structure.
- Harness elements: goal, context, tools, validation, memory.

### Execution Harness
- Beginner version of harness design.
- Use steps: goal, materials, execution, validation.
- Tie to personal AI usage wiki.

### Outcomes
- Show before/after transformations.
- Use artifacts, lists, and sample outputs.
- Make results feel useful immediately after class.

### Mission Lab
- Missions should feel more interesting than generic samples.
- Each mission needs time, output, and consultation CTA.
- Strongest mission can be AI bot outline or AI work flow design.

### Contact
- Application flow should be clear.
- Use supportive text before the form.
- Keep real recipient integration intact.
- Users should know their application was submitted.

## Mobile Rules

Mobile quality is critical. Many users will arrive through Telegram or mobile links.

### Required Mobile Behavior
- Header navigation may be hidden.
- Main CTA should be easy to reach.
- Buttons become full width.
- All major grids collapse to one column.
- Large card min-heights are removed.
- Long hero detail is replaced with a shorter proof line.
- No horizontal overflow at 360px width.
- Korean text should not break awkwardly inside narrow cards.

### Mobile Content Rules
- Keep headings short.
- Keep one idea per card.
- Use labels and bullets instead of long paragraphs.
- Avoid four dense cards in a row without visual breathing room.
- Avoid tiny text inside artifact previews.

### Mobile Testing Widths
Check at least:
- 360px
- 390px
- 430px
- 768px
- 1024px

## Interaction Rules

### Existing Interaction Patterns
- Demo tabs switch visible demo cards.
- Sample copy buttons copy example prompts and show toast.
- Diagnosis choices update the recommended course.
- Diagnosis, package, and mission CTAs prefill the application form.
- Application form submits through the configured form endpoint and shows a dialog.

### When Adding New Interaction
- It must have visible feedback.
- It must not break form prefill behavior.
- It must work without requiring a backend unless explicitly added.
- It must be keyboard-accessible where practical.
- It must not depend on hidden state that users cannot understand.

## Asset Rules

### Current Assets
- `assets/hero-workshop.svg`
- `assets/question-ladder.svg`

### Use Assets For
- Explaining workshop flow.
- Showing question improvement.
- Representing results and work structure.

### Avoid
- Generic stock AI robots.
- Unrelated futuristic illustrations.
- Decorative graphics that introduce visual noise.
- Infographics with unreadable Korean on mobile.

## Accessibility And Semantics

- Use semantic sections with meaningful IDs.
- Keep `aria-label` on grids when it helps describe grouped content.
- Use `aria-live` for dynamic result areas.
- Form fields need explicit labels.
- Buttons should be real `button` elements when they perform actions.
- Links should be used for navigation.
- Color contrast should remain readable on warm backgrounds.

## Performance And Deployment

- This is a static site.
- Avoid heavy frameworks for small interactions.
- Keep images lightweight.
- Cache-bust CSS/JS query strings when public GitHub Pages deployment needs visible updates.
- Run the existing verification script before deployment.

## Verification Checklist For AI Agents

Before claiming a UI update is ready:

- Check `index.html`, `styles.css`, and `script.js` for consistency with this file.
- Run `node verify-site.mjs`.
- If behavior changes, test the relevant interaction.
- If layout changes, check mobile widths around 360px and 390px.
- Confirm there is no horizontal overflow.
- Confirm the application form still submits and shows visible feedback.
- Confirm Korean text remains readable and does not collide with nearby content.

## Do

- Keep the site warm, practical, and result-oriented.
- Show real outputs users can imagine using.
- Keep AI bot builder credibility visible.
- Translate advanced AI ideas into beginner actions.
- Use guava, leaf, sun, warm backgrounds, Paperlogy, and Pretendard consistently.
- Maintain mobile-first readability.
- Preserve application CTAs and feedback.

## Don't

- Do not import a random external DESIGN.md and overwrite the current identity.
- Do not make the page look like a generic SaaS landing page.
- Do not add abstract AI hype without a user-facing result.
- Do not introduce unrelated color palettes.
- Do not add dense sections that read like documentation rather than a landing page.
- Do not use technical diagrams that beginners cannot decode quickly.
- Do not hide application feedback.
- Do not break the current static deployment model unless the backend plan is explicit.
