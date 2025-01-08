const API_URL = "https://backend-7-ytbh.onrender.com/api/users";
const authToken = localStorage.getItem("authToken");

// Tokenni tekshirish
if (!authToken) {
  alert("Please log in.");
  window.location.href = "/login.html";
}

// Foydalanuvchilarni olish
async function fetchUsers() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { Authorization: authToken },
    });

    if (!response.ok) throw new Error(`Failed to fetch users: ${response.statusText}`);

    const users = await response.json();
    console.log("Users Data:", users); // Foydalanuvchilarni kuzatish
    renderUsers(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    alert("Failed to fetch users.");
  }
}

// Foydalanuvchilarni jadvalda ko‘rsatish
function renderUsers(users) {
  const table = document.getElementById("userTable").querySelector("tbody");
  table.innerHTML = "";

  users.forEach((user) => {
    const row = `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="deleteUser('${user._id}')">Delete</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// Foydalanuvchini o‘chirish
async function deleteUser(userId) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "DELETE",
      headers: { Authorization: authToken },
    });

    if (!response.ok) throw new Error(`Failed to delete user: ${response.statusText}`);

    alert("User deleted successfully!");
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error.message);
    alert("Failed to delete user.");
  }
}

// Foydalanuvchilarni yuklash
fetchUsers();
