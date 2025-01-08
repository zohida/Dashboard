const API_URL = "https://backend-7-ytbh.onrender.com/api/categories";
const authToken = localStorage.getItem("authToken");

// Tokenni tekshirish
if (!authToken) {
  alert("Please log in.");
  window.location.href = "/login.html";
}

// Kategoriyalarni olish
async function fetchCategories() {
  try {
    const response = await fetch(API_URL, {
      headers: { Authorization: authToken },
    });

    if (!response.ok) throw new Error("Failed to fetch categories");

    const categories = await response.json();
    renderCategories(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
}

// Kategoriyalarni ko'rsatish
function renderCategories(categories) {
  const table = document.getElementById("categoryTable").querySelector("tbody");
  table.innerHTML = "";

  categories.forEach((category) => {
    const row = `
      <tr>
        <td>${category.name}</td>
        <td>
          <button onclick="editCategory('${category._id}')">Edit</button>
          <button onclick="deleteCategory('${category._id}')">Delete</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// Kategoriya qo'shish
async function addCategory(name) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) throw new Error("Failed to add category");

    alert("Category added successfully!");
    fetchCategories();
  } catch (error) {
    console.error("Error adding category:", error.message);
  }
}

// Kategoriya tahrirlash
async function editCategory(categoryId) {
  const newName = prompt("Enter new category name:");
  if (!newName) {
    alert("Category name is required.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({ name: newName }),
    });

    if (!response.ok) throw new Error("Failed to update category");

    alert("Category updated successfully!");
    fetchCategories();
  } catch (error) {
    console.error("Error updating category:", error.message);
  }
}

// Kategoriya o'chirish
async function deleteCategory(categoryId) {
  const confirmDelete = confirm("Are you sure you want to delete this category?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/${categoryId}`, {
      method: "DELETE",
      headers: { Authorization: authToken },
    });

    if (!response.ok) throw new Error("Failed to delete category");

    alert("Category deleted successfully!");
    fetchCategories();
  } catch (error) {
    console.error("Error deleting category:", error.message);
  }
}

// "Add Category" tugmasiga hodisa qo'shish
document.get
