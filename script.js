const root = document.documentElement;

const accentInput = document.getElementById("accentColor");
const bgInput = document.getElementById("bgColor");
const bgImageSelect = document.getElementById("bgImage");
const textInput = document.getElementById("textColor");
const fontSelect = document.getElementById("fontFamily");
const sizeInput = document.getElementById("fontSize");
const radiusInput = document.getElementById("borderRadius");
const lightMode = document.getElementById("lightMode");
const darkMode = document.getElementById("darkMode");
const autoMode = document.getElementById("autoMode");
const resetBtn = document.getElementById("resetTheme");
const glassRange = document.getElementById("glassEffect");
const presets = document.querySelectorAll(".preset");
const exportBtn = document.getElementById("exportTheme");
const importInput = document.getElementById("importTheme");
const preview = document.querySelector(".preview");

function setVar(varName, value) {
  root.style.setProperty(varName, value);
  saveTheme();
}

accentInput.addEventListener("input", e => setVar("--accent-color", e.target.value));
bgInput.addEventListener("input", e => setVar("--bg-color", e.target.value));

bgImageSelect.addEventListener("change", e => {
  const value = e.target.value === "none" ? "none" : `url('${e.target.value}')`;
  setVar("--bg-image", value);
});

textInput.addEventListener("input", e => setVar("--text-color", e.target.value));
fontSelect.addEventListener("change", e => setVar("--font-family", e.target.value));
sizeInput.addEventListener("input", e => setVar("--font-size", e.target.value + "px"));
radiusInput.addEventListener("input", e => setVar("--card-radius", e.target.value + "px"));

lightMode.addEventListener("click", () => {
  setVar("--bg-color", "#ffffff");
  setVar("--text-color", "#222222");
  setVar("--accent-color", "#4c8bf5");
});

darkMode.addEventListener("click", () => {
  setVar("--bg-color", "#121212");
  setVar("--text-color", "#f5f5f5");
  setVar("--accent-color", "#bb86fc");
});

autoMode.addEventListener("click", () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) darkMode.click();
  else lightMode.click();
});

root.style.setProperty("--glass-blur", glassRange.value + "px");
root.style.setProperty("--glass-opacity", glassRange.value / 60);

glassRange.addEventListener("input", e => {
  const blurValue = e.target.value + "px";
  const opacityValue = e.target.value / 60;
  root.style.setProperty("--glass-blur", blurValue);
  root.style.setProperty("--glass-opacity", opacityValue);
  preview.classList.add("glass");
  saveTheme();
});

const themes = {
  modern: { accent: "#2196f3", bg: "#f0f4f8", text: "#222", font: "'Poppins', sans-serif" },
  minimal: { accent: "#111", bg: "#fff", text: "#333", font: "'Open Sans', sans-serif" },
  neon: { accent: "#00e5ff", bg: "#0f0f0f", text: "#ffffff", font: "'Roboto', sans-serif" },
};

presets.forEach(btn => {
  btn.addEventListener("click", () => {
    const t = themes[btn.dataset.theme];
    setVar("--accent-color", t.accent);
    setVar("--bg-color", t.bg);
    setVar("--text-color", t.text);
    setVar("--font-family", t.font);
  });
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("theme");
  location.reload();
});

function saveTheme() {
  const theme = {
    bg: getComputedStyle(root).getPropertyValue("--bg-color"),
    text: getComputedStyle(root).getPropertyValue("--text-color"),
    accent: getComputedStyle(root).getPropertyValue("--accent-color"),
    font: getComputedStyle(root).getPropertyValue("--font-family"),
    size: getComputedStyle(root).getPropertyValue("--font-size"),
    radius: getComputedStyle(root).getPropertyValue("--card-radius"),
    image: getComputedStyle(root).getPropertyValue("--bg-image"),
    glass: glassRange.value,
  };
  localStorage.setItem("theme", JSON.stringify(theme));
}

window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("theme"));
  if (saved) {
    for (const [key, value] of Object.entries(saved)) {
      if (key !== "glass") root.style.setProperty("--" + key, value);
    }
    if (saved.glass) {
      glassRange.value = saved.glass;
      root.style.setProperty("--glass-blur", saved.glass + "px");
      root.style.setProperty("--glass-opacity", saved.glass / 60);
      preview.classList.add("glass");
    }
  }
};

exportBtn.addEventListener("click", () => {
  const blob = new Blob([localStorage.getItem("theme")], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "my-theme.json";
  a.click();
});

importInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = evt => {
    localStorage.setItem("theme", evt.target.result);
    location.reload();
  };
  reader.readAsText(file);
});
