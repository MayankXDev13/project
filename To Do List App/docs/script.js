document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const sunIcon = document.getElementById("sun");
  const moonIcon = document.getElementById("moon");
  const root = document.documentElement;
  const github = document.getElementById("github");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    renderTask(task);
  });

  addTaskBtn.addEventListener("click", saveTask);

  function saveTask() {
    const task = taskInput.value.trim();
    if (task !== "") {
      const newTask = {
        id: Date.now(),
        text: task,
      };
      taskInput.value = "";
      tasks.push(newTask);
      saveLocalStorage(tasks);
      renderTask(newTask);
    }
  }

  function saveLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTask(task) {
    const li = document.createElement("li");
    li.id = task.id;
    li.innerHTML = `
        <span>${task.text}</span>
        <button>Remove Task</button>
    `;

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveLocalStorage(tasks);
    });

    taskList.appendChild(li);
  }

  // Load dark mode preference
  function loadTheme() {
    const darkMode = localStorage.getItem("darkMode") === "enabled";
    if (darkMode) {
      root.style.setProperty("--primary-color", "#fff");
      root.style.setProperty("--secondary-color", "#1a1a1a");
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    } else {
      root.style.setProperty("--primary-color", "#1a1a1a");
      root.style.setProperty("--secondary-color", "#fff");
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    }
  }

  function toggleMode() {
    const darkMode = localStorage.getItem("darkMode") === "enabled";
    if (darkMode) {
      localStorage.setItem("darkMode", "disabled");
    } else {
      localStorage.setItem("darkMode", "enabled");
    }
    loadTheme();
  }

  sunIcon.addEventListener("click", toggleMode);
  moonIcon.addEventListener("click", toggleMode);

  loadTheme(); // Apply stored theme on page load

  github.addEventListener("click", () => {
    window.open("https://github.com/MayankXDev13", "_blank");
  });
});
