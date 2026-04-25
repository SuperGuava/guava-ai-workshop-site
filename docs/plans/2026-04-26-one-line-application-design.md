# One-Line Application Design

**Goal:** 상담 신청 직전의 입력 부담을 줄여 전환율을 높인다.

**Decision:** 신청 폼은 기본적으로 이름, 연락처, 배우고 싶은 것 한 줄만 노출한다. 자세한 설명은 선택적으로 접어서 연다.

**Structure:**
- 기본 입력: `name`, `contact`, `summary`
- 선택 입력: `audience`, `message`, `reference`
- CTA 문구는 부담이 낮은 표현으로 완화
- 기존 자동 채움 흐름은 유지하되, 기본적으로 `summary`와 상세 메모를 함께 채운다
- 제출 시 `summary`를 기준으로 최종 신청 메시지를 구성한다

**Non-goals:**
- 접수 엔드포인트 변경
- 신청 완료 팝업 제거
- 기존 섹션별 CTA 제거
