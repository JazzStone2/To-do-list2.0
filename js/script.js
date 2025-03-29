// DOM Elements
const taskForm = document.getElementById("new-task-form");
const taskNameInput = document.getElementById("task-name");
const dueDateInput = document.getElementById("due-date");
const prioritySelect = document.getElementById("priority");
const taskList = document.getElementById("tasks");

// Load Audio Files
const addSound = new Audio("add.mp3"); // Sound for adding tasks
const deleteSound = new Audio("delete.mp3"); // Sound for deleting tasks

// Highlight Overdue Tasks
function checkOverdueTasks() {
  const currentDate = new Date().toISOString().split("T")[0]; // Get today's date

  document.querySelectorAll(".task-item").forEach((taskItem) => {
    const dueDate = taskItem.querySelector("p").innerText.split("Due: ")[1].split(" |")[0];

    if (new Date(dueDate) < new Date(currentDate)) {
      taskItem.style.backgroundColor = "#ffcccc"; // Highlight overdue tasks
      taskItem.style.border = "2px solid #ff0000";
    }
  });
}

// Set Task Alarm
function setTaskAlarm(taskName, dueDate) {
  const alarmTime = new Date(dueDate).getTime() - 10 * 60 * 1000; // Reminder 10 mins before due

  const now = new Date().getTime();
  const delay = alarmTime - now;

  if (delay > 0) {
    setTimeout(() => {
      alert(`Reminder: Task "${taskName}" is due soon!`);
    }, delay);
  }
}

// Add Task Event
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Gather Task Details
  const taskName = taskNameInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = prioritySelect.value;

  // Validate Inputs
  if (!taskName || !dueDate) {
    alert("Please fill out all fields!");
    return;
  }

  // Play Add Sound
  addSound.play();

  // Create Task Item
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.innerHTML = `
    <div>
      <strong>${taskName}</strong>
      <p>Due: ${dueDate} | Priority: ${priority}</p>
    </div>
    <div class="task-actions">
      <button class="delete-task">Delete</button>
    </div>
  `;

  // Add Delete Event
  taskItem.querySelector(".delete-task").addEventListener("click", function () {
    deleteSound.play(); // Play Delete Sound
    taskList.removeChild(taskItem);
  });

  // Append Task to List
  taskList.appendChild(taskItem);

  // Set Alarm for the Task
  setTaskAlarm(taskName, dueDate);

  // Check for Overdue Tasks
  checkOverdueTasks();

  // Clear Form Fields
  taskNameInput.value = "";
  dueDateInput.value = "";
  prioritySelect.value = "low";
});

// Run Overdue Check Automatically
setInterval(checkOverdueTasks, 60000); // Check every minute

// Mouse Trail Effect
document.addEventListener("mousemove", function (event) {
  const trail = document.createElement("div");
  trail.classList.add("mouse-trail");
  trail.style.left = `${event.pageX}px`;
  trail.style.top = `${event.pageY}px`;

  document.body.appendChild(trail);

  // Remove the trail after it fades
  setTimeout(() => {
    trail.remove();
  }, 500); // Adjust duration as needed
});
