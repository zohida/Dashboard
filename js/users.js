const API_URL = "https://backend-7-ytbh.onrender.com"; // Backend URL
const authToken = localStorage.getItem("authToken"); // Tokenni localStorage'dan olish

// Token mavjudligini tekshirish
if (!authToken) {
  alert("Token not found. Please log in.");
  window.location.href = "/login.html"; // Login sahifasiga yo'naltirish
}

// Foydalanuvchilarni olish
async function fetchUsers() {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      headers: {
        Authorization: authToken, // Tokenni headerga qo'shish
      },
    });

    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json(); // Javobni JSON formatda olish
    renderUsers(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
}

// Foydalanuvchilarni ko'rsatish
function renderUsers(users) {
  const table = document.getElementById("userTable").querySelector("tbody");
  table.innerHTML = ""; // Jadvalni tozalash

  users.forEach((user) => {
    const row = `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="editUser('${user._id}')">Edit</button>
          <button onclick="deleteUser('${user._id}')">Delete</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// Foydalanuvchilarni yuklash
fetchUsers();

// Foydalanuvchini tahrirlash
async function editUser(userId) {
  const newName = prompt("Enter new name:");
  const newEmail = prompt("Enter new email:");

  if (!newName || !newEmail) {
    alert("All fields are required.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({ name: newName, email: newEmail, role: newRole }),
    });

    if (!response.ok) throw new Error("Failed to update user");

    alert("User updated successfully!");
    fetchUsers(); // Jadvalni yangilash
  } catch (error) {
    console.error("Error updating user:", error.message);
  }
}

// Foydalanuvchini o'chirish
async function deleteUser(userId) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: authToken,
      },
    });

    if (!response.ok) throw new Error("Failed to delete user");

    alert("User deleted successfully!");
    fetchUsers(); // Jadvalni yangilash
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }
}
