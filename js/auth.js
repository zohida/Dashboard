const API_URL = "https://backend-7-ytbh.onrender.com/api/auth";

async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Javob va tokenni tekshirish
    console.log("Response Data:", data);

    if (response.ok && data.token) {
      const authToken = `Bearer ${data.token}`;
      localStorage.setItem("authToken", authToken);
      console.log("Stored Token:", authToken);

      alert("Login successful!");

      // Asosiy sahifaga yo'naltirish
      window.location.href = "./index.html";
    } else {
      alert(data.message || "Login failed!");
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("An error occurred during login.");
  }
}

// Login formni boshqarish
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
