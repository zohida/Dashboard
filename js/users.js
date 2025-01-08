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
      headers: { Authorization: authToken },
    });

    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json();
    renderUsers(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
}

// Foydalanuvchilarni jadvalda ko'rsatish
function renderUsers(users) {
  const table = document.getElementById("userTable").querySelector("tbody");
  table.innerHTML = "";

  users.forEach((user) => {
    const row = `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// Foydalanuvchilarni yuklash
fetchUsers();
