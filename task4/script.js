/* ---------- THEME ---------- */
function toggleTheme() {
  document.body.classList.toggle("dark");
}

/* ---------- TODO ---------- */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <span onclick="deleteTask(${i})">✖</span>`;
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim()) {
    tasks.push(input.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();

/* ---------- PRODUCTS ---------- */
let products = [
  { name: "Smartphone", price: 15000, category: "electronics" },
  { name: "Laptop", price: 55000, category: "electronics" },
  { name: "Headphones", price: 3000, category: "electronics" },
  { name: "Shoes", price: 2500, category: "fashion" },
  { name: "Backpack", price: 1800, category: "fashion" }
];

let filtered = [...products];

function displayProducts(items) {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  items.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <b>${p.name}</b><br>
        ₹${p.price}
      </div>`;
  });
}

displayProducts(filtered);

function filterProducts(cat) {
  filtered = cat === "all" ? products : products.filter(p => p.category === cat);
  displayProducts(filtered);
}

function sortProducts() {
  filtered.sort((a, b) => a.price - b.price);
  displayProducts(filtered);
}

function searchProduct(text) {
  displayProducts(
    filtered.filter(p => p.name.toLowerCase().includes(text.toLowerCase()))
  );
}
