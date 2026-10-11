// Small behaviours shared by every page. No framework, no build step.

// Flash messages: dismiss on click, and fade out on their own after a while.
document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-dismiss]");
  if (button) button.closest(".toast")?.remove();
});

function autoDismissToasts() {
  document.querySelectorAll("#messages .toast:not([data-timer])").forEach((toast) => {
    toast.dataset.timer = "1";
    setTimeout(() => toast.remove(), 6000);
  });
}
document.addEventListener("DOMContentLoaded", autoDismissToasts);
document.addEventListener("htmx:afterSettle", autoDismissToasts);

// Close an open <details> dropdown when clicking elsewhere or pressing Escape.
document.addEventListener("click", (event) => {
  document.querySelectorAll("details[open]").forEach((menu) => {
    if (!menu.contains(event.target)) menu.removeAttribute("open");
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll("details[open]").forEach((menu) => {
    menu.removeAttribute("open");
    menu.querySelector("summary")?.focus();
  });
});

// Show the top progress bar for any HTMX request, wherever it starts.
document.addEventListener("htmx:beforeRequest", () => document.getElementById("page-progress")?.classList.add("htmx-request"));
document.addEventListener("htmx:afterRequest", () => document.getElementById("page-progress")?.classList.remove("htmx-request"));

// A failed HTMX request should never fail silently.
document.addEventListener("htmx:responseError", (event) => {
  showToast(event.detail.xhr.status === 403 ? "Your session expired. Reload the page and try again." : "Something went wrong. Please try again.", "error");
});
document.addEventListener("htmx:sendError", () => showToast("Can't reach the server. Check your connection and try again.", "error"));

function showToast(text, level) {
  const container = document.getElementById("messages");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className =
    "toast pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg " +
    (level === "error"
      ? "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-100"
      : "border-zinc-200 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100");
  const message = document.createElement("p");
  message.className = "flex-1";
  message.textContent = text;
  toast.append(message);
  container.append(toast);
  autoDismissToasts();
}
window.showToast = showToast;
