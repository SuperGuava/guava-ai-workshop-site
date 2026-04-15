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
