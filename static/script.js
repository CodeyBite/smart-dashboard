// Time Updater
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    const dateStr = now.toLocaleDateString();
    document.getElementById("time").innerText = timeStr;
    document.getElementById("date").innerText = dateStr;
}
setInterval(updateTime, 1000);
updateTime(); // Initial call

// Dark Mode Toggle
const toggle = document.getElementById("darkModeToggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggle.checked = true;
}

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
});