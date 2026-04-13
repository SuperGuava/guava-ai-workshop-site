const tabs = Array.from(document.querySelectorAll(".demo-tab"));
const panels = Array.from(document.querySelectorAll(".demo-card"));
const copyButton = document.querySelector(".copy-button");
const toast = document.querySelector(".copy-toast");

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
