// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");

  if (name === "" || email === "") {
    message.textContent = "All fields are required!";
    message.style.color = "red";
    return;
  }

  if (!email.includes("@")) {
    message.textContent = "Enter a valid email!";
    message.style.color = "red";
    return;
  }

  message.textContent = "Form submitted successfully!";
  message.style.color = "green";
});

// To-Do List (DOM Manipulation)
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (taskInput.value === "") return;

  const li = document.createElement("li");
  li.textContent = taskInput.value;

  // Remove task on click
  li.onclick = function () {
    taskList.removeChild(li);
  };

  taskList.appendChild(li);
  taskInput.value = "";
}
