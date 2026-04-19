const apiBaseInput = document.querySelector("#api-base-input");
const sourceType = document.querySelector("#source-type");
const sourceInput = document.querySelector("#source-input");
const fileInput = document.querySelector("#file-input");
const writeJson = document.querySelector("#write-json");
const writeCandidates = document.querySelector("#write-candidates");
const autoRepair = document.querySelector("#auto-repair");
const crawlUrl = document.querySelector("#crawl-url");
const crawlDepth = document.querySelector("#crawl-depth");
const crawlMaxPages = document.querySelector("#crawl-max-pages");
const convertButton = document.querySelector("#convert-button");
const statusLine = document.querySelector("#status-line");
const markdownTab = document.querySelector("#markdown-tab");
const jsonTab = document.querySelector("#json-tab");
const artifactsTab = document.querySelector("#artifacts-tab");
const enginesTab = document.querySelector("#engines-tab");

function apiUrl(path) {
  const base = apiBaseInput.value.trim().replace(/\/+$/, "");
  return `${base}${path}`;
}

function setStatus(text) {
  statusLine.textContent = text;
}

async function fetchEngines() {
  const response = await fetch(apiUrl("/api/engines"));
  const payload = await response.json();
  enginesTab.textContent = renderEngineStatus(payload);
}

async function convertSource() {
  const source = sourceInput.value.trim();
  if (sourceType.value !== "file" && !source) {
    setStatus("입력이 비어 있습니다.");
    return;
  }
  if (sourceType.value === "file" && !fileInput.files.length) {
    setStatus("파일을 선택하세요.");
    return;
  }

  setStatus("변환 중");
  convertButton.disabled = true;
  try {
    let response;
    if (sourceType.value === "file") {
      const form = new FormData();
      form.append("input_type", "file");
      form.append("write_json", String(writeJson.checked));
      form.append("write_candidates", String(writeCandidates.checked));
      form.append("auto_repair", String(autoRepair.checked));
      form.append("file", fileInput.files[0]);
      response = await fetch(apiUrl("/api/convert"), { method: "POST", body: form });
    } else {
      response = await fetch(apiUrl("/api/convert"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_type: sourceType.value,
          source,
          write_json: writeJson.checked,
          write_candidates: writeCandidates.checked,
          auto_repair: autoRepair.checked,
          crawl: sourceType.value === "url" && crawlUrl.checked,
          crawl_depth: Number(crawlDepth.value || 1),
          crawl_max_pages: Number(crawlMaxPages.value || 10),
        }),
      });
    }
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "변환에 실패했습니다.");
    }
    renderResult(payload);
    setStatus(`완료: ${payload.job_id}`);
  } catch (error) {
    setStatus(error.message);
  } finally {
    convertButton.disabled = false;
  }
}

function renderResult(payload) {
  const first = payload.items && payload.items[0] ? payload.items[0] : null;
  markdownTab.textContent = first ? first.markdown_preview : "결과가 없습니다.";
  jsonTab.textContent = JSON.stringify(payload, null, 2);
  artifactsTab.textContent = first
    ? JSON.stringify({
        manifest_path: payload.manifest_path,
        output_path: first.output_path,
        json_output_path: first.json_output_path,
        rag_bundle_paths: first.rag_bundle_paths,
        source_metadata: first.source_metadata,
        sniffed_mime_type: first.source_metadata && first.source_metadata.sniffed_mime_type,
        diagnostics: first.diagnostics,
        media_time_spans: collectMediaTimeSpans(payload),
        warnings: first.warnings,
      }, null, 2)
    : "결과 파일이 없습니다.";
}

function renderEngineStatus(payload) {
  const engines = Array.isArray(payload.engines) ? payload.engines : [];
  if (!engines.length) {
    return JSON.stringify(payload, null, 2);
  }
  const lines = [
    "Parser Studio engine diagnostics",
    "",
  ];
  for (const engine of engines) {
    const diagnostics = engine.diagnostics || {};
    const availability = engine.available ? "available" : "missing";
    lines.push(`${engine.name}: ${availability}`);
    if (engine.version) {
      lines.push(`  version: ${engine.version}`);
    }
    if (engine.error) {
      lines.push(`  error: ${engine.error}`);
    }
    if (Object.prototype.hasOwnProperty.call(diagnostics, "plugin_entry_point_count")) {
      lines.push(`  plugin_entry_point_count: ${diagnostics.plugin_entry_point_count}`);
    }
    if (Array.isArray(diagnostics.plugin_entry_points) && diagnostics.plugin_entry_points.length) {
      lines.push(
        `  plugins: ${diagnostics.plugin_entry_points.map((plugin) => plugin.name).join(", ")}`
      );
    }
    if (Object.prototype.hasOwnProperty.call(diagnostics, "mcp_server_configured")) {
      lines.push(`  mcp_server_configured: ${diagnostics.mcp_server_configured}`);
    }
    if (Object.prototype.hasOwnProperty.call(diagnostics, "mcp_endpoint_configured")) {
      lines.push(`  mcp_endpoint_configured: ${diagnostics.mcp_endpoint_configured}`);
    }
  }
  lines.push("");
  lines.push(JSON.stringify(payload, null, 2));
  return lines.join("\n");
}

function collectMediaTimeSpans(payload) {
  const spans = [];
  for (const item of payload.items || []) {
    for (const span of item.media_time_spans || []) {
      spans.push(span);
    }
    for (const candidate of item.candidates || []) {
      for (const span of candidate.media_time_spans || []) {
        spans.push(span);
      }
    }
  }
  return spans;
}

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".tab-pane").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#${button.dataset.tab}-tab`).classList.add("active");
  });
});

sourceType.addEventListener("change", () => {
  const isFile = sourceType.value === "file";
  sourceInput.disabled = isFile;
  fileInput.disabled = !isFile;
});

apiBaseInput.addEventListener("change", () => {
  localStorage.setItem("parserStudioApiBase", apiBaseInput.value.trim());
  fetchEngines().catch((error) => {
    enginesTab.textContent = error.message;
  });
});

const savedApiBase = localStorage.getItem("parserStudioApiBase");
if (savedApiBase) {
  apiBaseInput.value = savedApiBase;
}

convertButton.addEventListener("click", convertSource);
sourceType.dispatchEvent(new Event("change"));
fetchEngines().catch((error) => {
  enginesTab.textContent = `API 연결 대기: ${error.message}`;
});
