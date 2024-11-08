const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;
const toggleIcon = themeToggle.querySelector(".icon");
const toggleText = themeToggle.querySelector(".text");

// 저장된 테마가 있으면 불러오기
const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);
updateToggleButton(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateToggleButton(newTheme);
});

function updateToggleButton(theme) {
  if (theme === "dark") {
    toggleIcon.textContent = "☀️";
    toggleText.textContent = "Light Mode";
  } else {
    toggleIcon.textContent = "🌙";
    toggleText.textContent = "Dark Mode";
  }
}

// 시스템 테마 감지 및 자동 적용
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function handleSystemThemeChange(e) {
  const systemTheme = e.matches ? "dark" : "light";
  // localStorage에 저장된 사용자 설정이 없을 때만 시스템 테마 적용
  if (!localStorage.getItem("theme")) {
    html.setAttribute("data-theme", systemTheme);
    updateToggleButton(systemTheme);
  }
}

prefersDarkScheme.addListener(handleSystemThemeChange);
