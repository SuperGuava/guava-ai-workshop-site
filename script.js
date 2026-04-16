const tabs = Array.from(document.querySelectorAll(".demo-tab"));
const panels = Array.from(document.querySelectorAll(".demo-card"));
const copyButton = document.querySelector(".copy-button");
const toast = document.querySelector(".copy-toast");
const applicationForm = document.querySelector("#application-form");
const applicationStatus = document.querySelector("#application-status");
const submitDialog = document.querySelector(".submit-dialog");
const submitDialogTitle = document.querySelector("#submit-dialog-title");
const submitDialogMessage = document.querySelector("#submit-dialog-message");
const submitDialogClose = document.querySelector(".submit-dialog-close");
const diagnosisForm = document.querySelector("#diagnosis-form");
const diagnosisResult = document.querySelector("#diagnosis-result");
const diagnosisApply = document.querySelector(".diagnosis-apply");
const packageApplyButtons = Array.from(document.querySelectorAll(".package-apply"));

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
};

const defaultDiagnosis = {
  title: "AI 왕초보 실습형 수업",
  body: "먼저 내 문제를 AI에게 시키는 문장을 만들고, 결과물을 표나 안내문으로 바꾸는 흐름부터 시작하면 좋습니다.",
  audience: "왕초보",
  points: ["질문문 만들기", "결과물 검증하기", "다시 쓰는 템플릿 남기기"],
};

let currentDiagnosis = defaultDiagnosis;

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

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const targetId = copyButton.dataset.copyTarget;
    const source = targetId ? document.getElementById(targetId) : null;

    if (!source) {
      return;
    }

    try {
      await navigator.clipboard.writeText(source.value);
      toast?.classList.add("is-visible");
      window.setTimeout(() => toast?.classList.remove("is-visible"), 1800);
    } catch (_error) {
      source.focus();
      source.select();
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
  const priority = ["bot", "work", "family", "prompt"];
  const match = priority.find((item) => selected.includes(item));

  renderDiagnosis(match ? diagnosisProfiles[match] : defaultDiagnosis);
};

diagnosisForm?.addEventListener("change", updateDiagnosisResult);

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
