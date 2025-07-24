// Live Time Updater
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  const dateString = now.toLocaleDateString();
  document.getElementById('datetime').textContent = `${dateString} ${timeString}`;
}
setInterval(updateTime, 1000);
updateTime(); // Initial call

// Dark Mode Toggle
const toggle = document.getElementById("darkModeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});

// To-do Add
document.querySelector('#todo-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const taskInput = document.getElementById('todo-input');
  const task = taskInput.value.trim();

  if (task) {
    const res = await fetch('/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Failed to add task.");
    }
  }
});

// To-do Delete
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const id = btn.dataset.id;
    const res = await fetch(`/delete/${id}`, { method: 'POST' });
    if (res.ok) {
      location.reload();
    } else {
      alert("Failed to delete task.");
    }
  });
});