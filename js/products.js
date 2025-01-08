const API_URL = "https://backend-7-ytbh.onrender.com"; // Backend URL
const authToken = localStorage.getItem("authToken"); // Tokenni localStorage'dan olish

if (!authToken) {
  alert("Token not found. Please log in.");
  window.location.href = "/login.html";
}

// Mahsulotlarni olish
async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      headers: {
        Authorization: authToken,
      },
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
          <button onclick="editProduct('${product._id}')">Edit</button>
          <button onclick="deleteProduct('${product._id}')">Delete</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// Mahsulot qo'shish
async function addProduct(data) {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to add product");

    alert("Product added successfully!");
    fetchProducts();
  } catch (error) {
    console.error("Error adding product:", error.message);
  }
}

// Mahsulotni tahrirlash
async function editProduct(productId) {
  const newName = prompt("Enter new product name:");
  const newPrice = prompt("Enter new product price:");
  const newCategory = prompt("Enter new product category ID:");

  if (!newName || !newPrice || !newCategory) {
    alert("All fields are required.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({ name: newName, price: newPrice, category: newCategory }),
    });

    if (!response.ok) throw new Error("Failed to update product");

    alert("Product updated successfully!");
    fetchProducts();
  } catch (error) {
    console.error("Error updating product:", error.message);
  }
}

// Mahsulotni o'chirish
async function deleteProduct(productId) {
  const confirmDelete = confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: authToken,
      },
    });

    if (!response.ok) throw new Error("Failed to delete product");

    alert("Product deleted successfully!");
    fetchProducts();
  } catch (error) {
    console.error("Error deleting product:", error.message);
  }
}

// "Add Product" tugmasiga hodisa qo'shish
document.getElementById("addProduct").addEventListener("click", () => {
  const name = prompt("Enter product name:");
  const price = prompt("Enter product price:");
  const category = prompt("Enter product category ID:");

  if (name && price && category) {
    addProduct({ name, price, category });
  }
});

// Mahsulotlarni yuklash
fetchProducts();
