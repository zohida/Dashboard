const API_URL = "https://backend-7-ytbh.onrender.com/api/products";
const authToken = localStorage.getItem("authToken");

if (!authToken) {
  alert("Please log in.");
  window.location.href = "/login.html";
}

// Mahsulotlarni olish
async function fetchProducts() {
  try {
    const response = await fetch(API_URL, {
      headers: { Authorization: authToken },
    });

    if (!response.ok) throw new Error("Failed to fetch products");

    const { products } = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
}

// Mahsulotlarni ko'rsatish
function renderProducts(products) {
  const table = document.getElementById("productTable").querySelector("tbody");
  table.innerHTML = "";

  products.forEach((product) => {
    const row = `
      <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category?.name || "Uncategorized"}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// Mahsulotlarni yuklash
fetchProducts();
