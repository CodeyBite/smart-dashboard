// Dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("darkToggle");
    const body = document.body;

    // Apply saved mode
    if (localStorage.getItem("mode") === "dark") {
        toggle.checked = true;
        body.classList.add("dark");
    }

    // Toggle event
    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            body.classList.add("dark");
            localStorage.setItem("mode", "dark");
        } else {
            body.classList.remove("dark");
            localStorage.setItem("mode", "light");
        }
    });

    // Live time update
    const timeElement = document.getElementById("time");
    function updateTime() {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
    }
    updateTime(); // initial
    setInterval(updateTime, 1000);
});