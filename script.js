const tabs = Array.from(document.querySelectorAll(".demo-tab"));
const panels = Array.from(document.querySelectorAll(".demo-card"));
const copyButton = document.querySelector(".copy-button");
const toast = document.querySelector(".copy-toast");
const sampleCopyButtons = Array.from(document.querySelectorAll(".sample-copy"));
const applicationForm = document.querySelector("#application-form");
const applicationStatus = document.querySelector("#application-status");
const submitDialog = document.querySelector(".submit-dialog");
const submitDialogTitle = document.querySelector("#submit-dialog-title");
const submitDialogMessage = document.querySelector("#submit-dialog-message");
const submitDialogClose = document.querySelector(".submit-dialog-close");
const diagnosisForm = document.querySelector("#diagnosis-form");
const diagnosisResult = document.querySelector("#diagnosis-result");
const diagnosisApply = document.querySelector(".diagnosis-apply");
const sandboxForm = document.querySelector("#sandbox-form");
const sandboxResult = document.querySelector("#sandbox-result");
const sandboxApplyButton = document.querySelector(".sandbox-apply");
const packageApplyButtons = Array.from(document.querySelectorAll(".package-apply"));
const missionApplyButtons = Array.from(document.querySelectorAll(".mission-apply"));
const designApplyButton = document.querySelector(".design-apply");
const workspaceApplyButton = document.querySelector(".workspace-apply");
const videoDocentApplyButton = document.querySelector(".video-docent-apply");

const diagnosisProfiles = {
  prompt: {
    title: "AI 왕초보 실습형 수업",
    body: "먼저 질문문 만들기, 결과물 확인, 다시 쓰는 템플릿 저장부터 시작하면 좋습니다.",
    audience: "왕초보",
    points: ["질문문 만들기", "결과물 검증하기", "다시 쓰는 템플릿 남기기"],
  },
  work: {
    title: "업무 결과물 제작 수업",
    body: "반복 안내문, 비교표, 정리표를 AI에게 맡기고 바로 쓰는 결과물로 바꾸는 흐름이 맞습니다.",
    audience: "실무자",
    points: ["반복 업무 찾기", "표와 안내문 만들기", "검토 루틴 만들기"],
  },
  family: {
    title: "생활형 AI 안내 수업",
    body: "부모님이나 가족에게 설명하기 쉬운 생활 예시로 시작하고, 여행·병원·정보 정리를 함께 실습합니다.",
    audience: "중장년층",
    points: ["쉬운 말로 질문하기", "생활 정보 정리하기", "가족에게 설명하기"],
  },
  bot: {
    title: "AI 작업 흐름 설계 수업",
    body: "질문 한 번으로 끝내지 않고 목표, 자료, 실행, 검증이 이어지는 작은 AI 봇 흐름으로 확장합니다.",
    audience: "실무자",
    points: ["중앙 문맥 잡기", "작업 모드 나누기", "검증 루틴 붙이기"],
  },
  design: {
    title: "AI 디자인 공방 수업",
    body: "아이디어와 기존 자료를 브랜드 기준에 맞는 발표자료, 카드뉴스, 랜딩페이지 초안으로 바꾸는 흐름이 맞습니다.",
    audience: "실무자",
    points: ["자료를 시안으로 바꾸기", "브랜드 기준 적용하기", "대화로 배치와 문구 고치기"],
  },
};

const defaultDiagnosis = {
  title: "AI 왕초보 실습형 수업",
  body: "먼저 내 문제를 AI에게 시키는 문장을 만들고, 결과물을 표나 안내문으로 바꾸는 흐름부터 시작하면 좋습니다.",
  audience: "왕초보",
  points: ["질문문 만들기", "결과물 검증하기", "다시 쓰는 템플릿 남기기"],
};

let currentDiagnosis = defaultDiagnosis;

const sandboxProfiles = {
  routine: {
    title: "업무 AI 실행 루틴",
    audience: "실무자",
    body: "반복되는 일을 하나 고르고, AI가 처리할 순서와 사람이 확인할 기준을 함께 정리합니다.",
    steps: ["목표를 한 문장으로 정리", "필요한 자료를 붙여 넣기", "AI에게 초안을 만들게 하기", "출처와 오류를 확인하기", "다음에도 쓸 템플릿으로 저장"],
    message: "반복 업무 하나를 AI에게 맡기는 실행 흐름을 만들고 싶습니다. 목표 정리, 자료 연결, 초안 생성, 검증, 템플릿 저장까지 상담받고 싶습니다.",
  },
  youtube: {
    title: "AI 영상 도슨트 실습",
    audience: "왕초보",
    body: "영상 링크를 함께 보며 중요한 장면에서 멈추고, 내 화면 기준으로 따라 할 순서를 다시 만듭니다.",
    steps: ["보고 싶은 영상 링크 정하기", "중요 장면에서 멈춰서 해설", "내 화면 기준으로 다시 실습", "막힌 지점 복구 루틴 만들기", "다음에도 볼 체크리스트 저장"],
    message: "영상 링크를 함께 보며 중요한 장면을 해설받고, 내 화면 기준으로 따라 하는 AI 영상 도슨트 수업을 상담받고 싶습니다.",
  },
  document: {
    title: "자료 정리 작업장",
    audience: "중장년층",
    body: "사진·PDF·유튜브·메모처럼 흩어진 자료를 요약, 표, 질문, 실행계획으로 바꿉니다.",
    steps: ["자료 종류 확인", "AI에게 읽히기 쉬운 형태로 정리", "요약과 핵심 질문 만들기", "표나 체크리스트로 변환", "가족이나 팀에 공유할 문구 저장"],
    message: "사진, PDF, 유튜브, 메모 같은 자료를 AI 작업장으로 바꾸고 요약, 표, 체크리스트까지 만드는 수업을 상담받고 싶습니다.",
  },
  design: {
    title: "아이디어 시각화 공방",
    audience: "실무자",
    body: "문장과 메모를 발표자료, 카드뉴스, 랜딩페이지 초안처럼 눈에 보이는 결과물로 바꿉니다.",
    steps: ["아이디어 문장 정리", "참고 자료와 톤 정하기", "첫 시안 만들기", "문구와 배치 수정", "공유 가능한 파일이나 웹 초안으로 저장"],
    message: "아이디어와 메모를 발표자료, 카드뉴스, 랜딩페이지 초안 같은 시각 결과물로 바꾸는 수업을 상담받고 싶습니다.",
  },
  bot: {
    title: "작은 AI 하네스 설계",
    audience: "실무자",
    body: "한 번 묻고 끝내지 않고, 목표·자료·실행·검증·기억이 이어지는 작은 AI 봇 흐름을 설계합니다.",
    steps: ["AI가 맡을 일 정하기", "입력 자료와 출력 형식 정하기", "실행 단계를 나누기", "검증 질문 붙이기", "반복 가능한 사용 문서로 저장"],
    message: "목표, 자료, 실행, 검증, 기억이 이어지는 작은 AI 하네스와 봇 흐름을 설계하는 수업을 상담받고 싶습니다.",
  },
};

let currentSandbox = sandboxProfiles.routine;

const packageProfiles = {
  starter: {
    title: "AI 첫걸음 2시간",
    audience: "왕초보",
    message: "AI를 처음 켜는 사람도 질문문을 만들고, 표와 안내문 형태의 첫 결과물을 완성하는 수업을 상담받고 싶습니다.",
  },
  life: {
    title: "생활 AI 실습반",
    audience: "중장년층",
    message: "병원, 여행, 가족 정보처럼 흩어진 생활 자료를 비교표와 공유 문서로 바꾸는 수업을 상담받고 싶습니다.",
  },
  work: {
    title: "업무 AI 실행반",
    audience: "실무자",
    message: "반복 안내문, 문서 초안, 체크리스트를 AI에게 맡기는 업무 흐름 수업을 상담받고 싶습니다.",
  },
  bot: {
    title: "AI 봇 제작 입문",
    audience: "실무자",
    message: "목표, 자료, 실행, 검증이 이어지는 작은 AI 작업 흐름과 봇 제작 입문 수업을 상담받고 싶습니다.",
  },
};

const missionProfiles = {
  hospital: {
    title: "병원 비교표 만들기",
    audience: "중장년층",
    message: "가족이 이해하기 쉬운 병원 비교표와 공유 문구를 만드는 미션을 중심으로 상담받고 싶습니다.",
  },
  travel: {
    title: "여행 일정 AI에게 맡기기",
    audience: "중장년층",
    message: "부모님이나 가족 여행 일정을 조건에 맞춰 표와 카톡 안내문으로 만드는 미션을 상담받고 싶습니다.",
  },
  work: {
    title: "업무 안내문 자동 생성하기",
    audience: "실무자",
    message: "반복 안내문을 공지문, 체크리스트, 메시지 초안으로 바꾸는 업무 AI 미션을 상담받고 싶습니다.",
  },
  bot: {
    title: "내 AI 봇 설계서 만들기",
    audience: "실무자",
    message: "반복 요청을 접수, 정렬, 실행, 검증 흐름으로 바꾸는 AI 봇 설계 미션을 상담받고 싶습니다.",
  },
};

const designLabProfile = {
  title: "AI 디자인 공방",
  audience: "실무자",
  message: "아이디어, 메모, 기존 문서나 웹페이지를 AI와 함께 발표자료, 카드뉴스, Canva 초안, HTML 랜딩페이지 같은 시각 결과물로 바꾸는 수업을 상담받고 싶습니다.",
};

const personalWorkspaceProfile = {
  title: "개인 AI 작업장 만들기",
  audience: "실무자",
  message: "수업 후에도 다시 쓸 수 있는 개인 AI 작업장을 만들고 싶습니다. 내 질문 템플릿, 반복 업무 실행 순서, 검증 체크리스트, 개인 AI 사용 위키를 함께 상담받고 싶습니다.",
};

const videoDocentProfile = {
  title: "AI 영상 해설 공방",
  audience: "왕초보",
  message: "좋은 AI 유튜브를 혼자 보지 않고 같이 보면서 따라 해보고 싶습니다. 영상에서 막히는 장면을 해설받고, 내 화면에서 직접 실습한 뒤 개인 AI 작업장에 남길 질문 템플릿과 체크리스트까지 만들고 싶습니다.",
};

for (const tab of tabs) {
  tab.addEventListener("click", () => {
    const target = tab.dataset.demoTarget;

    for (const item of tabs) {
      item.classList.toggle("is-active", item === tab);
    }

    for (const panel of panels) {
      panel.classList.toggle("is-active", panel.dataset.demoPanel === target);
    }
  });
}

const showCopyToast = (message = "문의 문구를 복사했습니다.") => {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
};

const copyText = async (text, fallbackSource) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_error) {
    fallbackSource?.focus();
    fallbackSource?.select?.();
    return false;
  }
};

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const targetId = copyButton.dataset.copyTarget;
    const source = targetId ? document.getElementById(targetId) : null;

    if (!source) {
      return;
    }

    const copied = await copyText(source.value, source);

    if (copied) {
      showCopyToast();
    }
  });
}

for (const button of sampleCopyButtons) {
  button.addEventListener("click", async () => {
    const value = button.dataset.copyValue;

    if (!value) {
      return;
    }

    const copied = await copyText(value);

    if (copied) {
      showCopyToast("샘플 문구를 복사했습니다.");
    }
  });
}

const renderDiagnosis = (profile) => {
  if (!diagnosisResult) {
    return;
  }

  currentDiagnosis = profile;
  const title = diagnosisResult.querySelector("h3");
  const body = diagnosisResult.querySelector("p:not(.mini-label)");
  const list = diagnosisResult.querySelector("ul");

  if (title) {
    title.textContent = profile.title;
  }

  if (body) {
    body.textContent = profile.body;
  }

  if (list) {
    list.innerHTML = profile.points.map((point) => `<li>${point}</li>`).join("");
  }
};

const updateDiagnosisResult = () => {
  if (!diagnosisForm) {
    return;
  }

  const selected = Array.from(diagnosisForm.querySelectorAll('input[name="diagnosis"]:checked')).map((item) => item.value);
  const priority = ["design", "bot", "work", "family", "prompt"];
  const match = priority.find((item) => selected.includes(item));

  renderDiagnosis(match ? diagnosisProfiles[match] : defaultDiagnosis);
};

diagnosisForm?.addEventListener("change", updateDiagnosisResult);

const renderSandbox = (profile) => {
  currentSandbox = profile;

  if (!sandboxResult) {
    return;
  }

  const title = sandboxResult.querySelector("h3");
  const body = sandboxResult.querySelector("p:not(.mini-label)");
  const list = sandboxResult.querySelector("ol");

  if (title) {
    title.textContent = profile.title;
  }

  if (body) {
    body.textContent = profile.body;
  }

  if (list) {
    list.innerHTML = profile.steps.map((step) => `<li>${step}</li>`).join("");
  }
};

const updateSandboxResult = () => {
  if (!sandboxForm) {
    return;
  }

  const selected = sandboxForm.querySelector('input[name="sandbox"]:checked')?.value || "routine";
  renderSandbox(sandboxProfiles[selected] || sandboxProfiles.routine);
};

updateSandboxResult();
sandboxForm?.addEventListener("change", updateSandboxResult);

sandboxApplyButton?.addEventListener("click", () => {
  if (!applicationForm) {
    return;
  }

  const audience = applicationForm.querySelector('select[name="audience"]');
  const message = applicationForm.querySelector('textarea[name="message"]');

  if (audience) {
    audience.value = currentSandbox.audience;
  }

  if (message) {
    message.value = [
      `관심 AI 작업 샌드박스: ${currentSandbox.title}`,
      `상담받고 싶은 방향: ${currentSandbox.message}`,
      "수업에서 만들 결과물과 준비물을 함께 안내받고 싶습니다.",
    ].join("\n");
  }

  applicationForm.scrollIntoView({ behavior: "smooth", block: "start" });
  message?.focus({ preventScroll: true });
});

diagnosisApply?.addEventListener("click", () => {
  if (!applicationForm) {
    return;
  }

  const audience = applicationForm.querySelector('select[name="audience"]');
  const message = applicationForm.querySelector('textarea[name="message"]');
  const selectedLabels = diagnosisForm
    ? Array.from(diagnosisForm.querySelectorAll('input[name="diagnosis"]:checked'))
        .map((item) => item.closest("label")?.querySelector("strong")?.textContent)
        .filter(Boolean)
    : [];

  if (audience) {
    audience.value = currentDiagnosis.audience;
  }

  if (message) {
    const selectedText = selectedLabels.length > 0 ? selectedLabels.join(", ") : "AI 왕초보 실습형 수업 상담";
    message.value = [
      `30초 AI 진단 결과: ${currentDiagnosis.title}`,
      `선택한 상황: ${selectedText}`,
      `상담받고 싶은 방향: ${currentDiagnosis.body}`,
    ].join("\n");
  }

  applicationForm.scrollIntoView({ behavior: "smooth", block: "start" });
  message?.focus({ preventScroll: true });
});

for (const button of packageApplyButtons) {
  button.addEventListener("click", () => {
    if (!applicationForm) {
      return;
    }

    const profile = packageProfiles[button.dataset.package] || packageProfiles.starter;
    const audience = applicationForm.querySelector('select[name="audience"]');
    const message = applicationForm.querySelector('textarea[name="message"]');

    if (audience) {
      audience.value = profile.audience;
    }

    if (message) {
      message.value = [
        `관심 수업 패키지: ${profile.title}`,
        `상담받고 싶은 방향: ${profile.message}`,
        "가격, 진행 방식, 준비물을 함께 안내받고 싶습니다.",
      ].join("\n");
    }

    applicationForm.scrollIntoView({ behavior: "smooth", block: "start" });
    message?.focus({ preventScroll: true });
  });
}

for (const button of missionApplyButtons) {
  button.addEventListener("click", () => {
    if (!applicationForm) {
      return;
    }

    const profile = missionProfiles[button.dataset.mission] || missionProfiles.hospital;
    const audience = applicationForm.querySelector('select[name="audience"]');
    const message = applicationForm.querySelector('textarea[name="message"]');

    if (audience) {
      audience.value = profile.audience;
    }

    if (message) {
      message.value = [
        `관심 AI 미션: ${profile.title}`,
        `상담받고 싶은 방향: ${profile.message}`,
        "수업 시간, 준비물, 결과물 예시를 함께 안내받고 싶습니다.",
      ].join("\n");
    }

    applicationForm.scrollIntoView({ behavior: "smooth", block: "start" });
    message?.focus({ preventScroll: true });
  });
}

designApplyButton?.addEventListener("click", () => {
  if (!applicationForm) {
    return;
  }

  const audience = applicationForm.querySelector('select[name="audience"]');
  const message = applicationForm.querySelector('textarea[name="message"]');

  if (audience) {
    audience.value = designLabProfile.audience;
  }

  if (message) {
    message.value = [
      `관심 수업 방향: ${designLabProfile.title}`,
      `상담받고 싶은 방향: ${designLabProfile.message}`,
      "수업에서 만들 수 있는 결과물 예시와 준비물을 함께 안내받고 싶습니다.",
    ].join("\n");
  }

  applicationForm.scrollIntoView({ behavior: "smooth", block: "start" });
  message?.focus({ preventScroll: true });
});

workspaceApplyButton?.addEventListener("click", () => {
  if (!applicationForm) {
    return;
  }

  const audience = applicationForm.querySelector('select[name="audience"]');
  const message = applicationForm.querySelector('textarea[name="message"]');

  if (audience) {
    audience.value = personalWorkspaceProfile.audience;
  }

  if (message) {
    message.value = [
      `관심 수업 방향: ${personalWorkspaceProfile.title}`,
      `상담받고 싶은 방향: ${personalWorkspaceProfile.message}`,
      "내 상황에 맞는 작업장 예시와 수업 후 남는 결과물을 함께 안내받고 싶습니다.",
    ].join("\n");
  }

  applicationForm.scrollIntoView({ behavior: "smooth", block: "start" });
  message?.focus({ preventScroll: true });
});

videoDocentApplyButton?.addEventListener("click", () => {
  if (!applicationForm) {
    return;
  }

  const audience = applicationForm.querySelector('select[name="audience"]');
  const message = applicationForm.querySelector('textarea[name="message"]');

  if (audience) {
    audience.value = videoDocentProfile.audience;
  }

  if (message) {
    message.value = [
      `관심 수업 방향: ${videoDocentProfile.title}`,
      `상담받고 싶은 방향: ${videoDocentProfile.message}`,
      "보고 싶은 AI 영상이 있으면 링크를 함께 전달하겠습니다.",
    ].join("\n");
  }

  applicationForm.scrollIntoView({ behavior: "smooth", block: "start" });
  message?.focus({ preventScroll: true });
});

const showSubmitDialog = (title, message) => {
  if (!submitDialog || !submitDialogTitle || !submitDialogMessage) {
    return;
  }

  submitDialogTitle.textContent = title;
  submitDialogMessage.textContent = message;
  submitDialog.classList.add("is-visible");
  submitDialog.setAttribute("aria-hidden", "false");
  submitDialogClose?.focus();
};

const hideSubmitDialog = () => {
  submitDialog?.classList.remove("is-visible");
  submitDialog?.setAttribute("aria-hidden", "true");
};

submitDialogClose?.addEventListener("click", hideSubmitDialog);

submitDialog?.addEventListener("click", (event) => {
  if (event.target === submitDialog) {
    hideSubmitDialog();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideSubmitDialog();
  }
});

if (applicationForm) {
  const query = new URLSearchParams(window.location.search);

  if (query.get("submitted") === "1") {
    applicationStatus.textContent = "신청이 접수되었습니다. 확인 후 안내드리겠습니다.";
    showSubmitDialog(
      "신청이 접수되었습니다",
      "작성한 내용이 ninefire@naver.com으로 전송되었습니다. 확인 후 수업 방식과 준비물을 안내드립니다."
    );
  }

  applicationForm.addEventListener("submit", async (event) => {
    const submitEndpoint = applicationForm.dataset.submitEndpoint;

    if (!submitEndpoint || !window.fetch) {
      return;
    }

    event.preventDefault();

    if (!applicationForm.reportValidity()) {
      return;
    }

    const submitButton = applicationForm.querySelector('button[type="submit"]');
    const defaultButtonText = submitButton?.textContent || "30초 수업 상담 신청하기";

    applicationStatus?.classList.remove("is-error");
    if (applicationStatus) {
      applicationStatus.textContent = "신청 내용을 보내는 중입니다. 잠시만 기다려 주세요.";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "전송 중입니다";
    }

    applicationForm.setAttribute("aria-busy", "true");

    try {
      const formData = new FormData(applicationForm);
      const response = await fetch(submitEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("submit failed");
      }

      applicationForm.reset();
      if (applicationStatus) {
        applicationStatus.textContent = "신청이 접수되었습니다. 확인 후 안내드리겠습니다.";
      }
      showSubmitDialog(
        "신청이 접수되었습니다",
        "작성한 내용이 ninefire@naver.com으로 전송되었습니다. 확인 후 수업 방식과 준비물을 안내드립니다."
      );
    } catch (_error) {
      applicationStatus?.classList.add("is-error");
      if (applicationStatus) {
        applicationStatus.textContent = "전송 상태를 확인하지 못했습니다. 잠시 후 다시 시도하거나 ninefire@naver.com으로 직접 보내 주세요.";
      }
      showSubmitDialog(
        "전송 상태를 확인하지 못했습니다",
        "네트워크 또는 접수 서비스 문제일 수 있습니다. 잠시 후 다시 시도하거나 ninefire@naver.com으로 직접 보내 주세요."
      );
    } finally {
      applicationForm.removeAttribute("aria-busy");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonText;
      }
    }
  });
}
