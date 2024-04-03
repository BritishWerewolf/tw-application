const switcher = document.getElementById("theme-switcher");
switcher.onclick = function (event) {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("dark-mode", document.documentElement.classList.contains("dark"));
    toggleDarkModeText();
};

if (JSON.parse(localStorage.getItem("dark"))) {
    document.documentElement.classList.toggle("dark", JSON.parse(localStorage.getItem("dark")));
} else if (window.matchMedia) {
    document.documentElement.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
} else {
    document.documentElement.classList.toggle("dark", true);
}

switcher.checked = document.documentElement.classList.contains("dark");

function toggleDarkModeText() {
    document.querySelector("label[for='theme-switcher'] > span").textContent = `Anyway, here's ${switcher.checked ? "light" : "dark"} mode.`;
};
toggleDarkModeText();
