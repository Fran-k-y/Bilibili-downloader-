// Change this after deploying your backend.
// Example: https://your-backend.onrender.com
const API_BASE = "https://YOUR-BACKEND-URL.onrender.com";

const form = document.getElementById("downloadForm");
const urlInput = document.getElementById("url");
const fetchBtn = document.getElementById("fetchBtn");
const statusBox = document.getElementById("status");
const result = document.getElementById("result");
const title = document.getElementById("title");
const meta = document.getElementById("meta");
const thumbnail = document.getElementById("thumbnail");
const downloadBtn = document.getElementById("downloadBtn");

function setStatus(message, error = false) {
  statusBox.textContent = message;
  statusBox.classList.remove("hidden", "error");
  if (error) statusBox.classList.add("error");
}

function hideStatus() {
  statusBox.classList.add("hidden");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const url = urlInput.value.trim();

  if (!url) return;

  result.classList.add("hidden");
  fetchBtn.disabled = true;
  fetchBtn.textContent = "Loading...";
  setStatus("Getting video information...");

  try {
    const response = await fetch(`${API_BASE}/api/info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "The server could not process this URL.");
    }

    title.textContent = data.title || "Bilibili video";
    meta.textContent = data.duration
      ? `Duration: ${data.duration}`
      : "Video information loaded.";

    thumbnail.src = data.thumbnail || "";
    thumbnail.style.display = data.thumbnail ? "block" : "none";

    downloadBtn.href =
      `${API_BASE}/api/download?url=${encodeURIComponent(url)}`;

    result.classList.remove("hidden");
    hideStatus();
  } catch (error) {
    setStatus(error.message, true);
  } finally {
    fetchBtn.disabled = false;
    fetchBtn.textContent = "Get Video";
  }
});
