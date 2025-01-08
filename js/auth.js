const API_URL = "https://backend-7-ytbh.onrender.com";

// Tokenni olish
function getAuthToken() {
  return localStorage.getItem("authToken");
}

// Token amal qilish muddati tugaganligini tekshirish
function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

// Tokenni har safar ishlatishdan oldin tekshirish
function validateAuthToken() {
  const token = getAuthToken();
  if (token && isTokenExpired(token.split(" ")[1])) {
    console.log("Token expired, please log in again.");
    localStorage.removeItem("authToken");
    alert("Session expired. Please log in again.");
    window.location.href = "/login.html"; // Login sahifasiga yo'naltirish
  }
}

// Login qilish va tokenni saqlash
async function login(username, password) {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    const authToken = `Bearer ${data.token}`;
    localStorage.setItem("authToken", authToken);
    console.log("Token saved:", authToken);
  } catch (error) {
    console.error("Login error:", error.message);
  }
}

export { API_URL, getAuthToken, validateAuthToken, login };
