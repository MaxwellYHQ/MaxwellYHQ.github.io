// ============================================================
// 1. 页脚年份：自动取当前年份，不用每年手动改
// ============================================================
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// 2. 深浅色切换
// ------------------------------------------------------------
// 逻辑：优先读本地记忆（localStorage），没有就跟随系统设置。
// 用户点过按钮后，把选择写进 localStorage，下次打开还记得。
// ============================================================
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const STORAGE_KEY = "theme";

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// 当前实际生效的主题：手动设置优先，否则看系统
function currentTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return systemPrefersDark() ? "dark" : "light";
}

function applyTheme(theme) {
  // 不设置 data-theme 时，纯靠 CSS 的媒体查询跟随系统；
  // 一旦设置，就以这里的值为准（CSS 里 html[data-theme] 优先级更高）
  root.setAttribute("data-theme", theme);
  if (toggle) {
    toggle.textContent = theme === "dark" ? "☀️" : "🌙";
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "切换到浅色模式" : "切换到深色模式"
    );
  }
}

applyTheme(currentTheme());

if (toggle) {
  toggle.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);  // 记住选择
    applyTheme(next);
  });
}

// 用户没手动选过时，系统主题变了要跟着变
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    applyTheme(currentTheme());
  }
});

// ============================================================
// 3. 滚动淡入：元素进入视口才显示
// ------------------------------------------------------------
// IntersectionObserver 是浏览器原生 API，比监听 scroll 事件省性能。
// ============================================================
const revealTargets = document.querySelectorAll(".section, .hero");

if ("IntersectionObserver" in window && revealTargets.length) {
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);  // 动画只播一次
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

// ============================================================
// 4. 导航高亮：滚动到哪个区块，对应链接变色（可选功能）
// ============================================================
const navLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window && navLinks.length) {
  const sections = [...navLinks]
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          const active = a.getAttribute("href") === "#" + entry.target.id;
          a.style.color = active ? "var(--accent)" : "";
          a.style.fontWeight = active ? "600" : "";
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }  // 元素到屏幕中间才算"当前区块"
  );

  sections.forEach((s) => spy.observe(s));
}
