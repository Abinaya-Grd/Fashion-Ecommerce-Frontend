document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  loadFeaturedProducts();
});

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

function checkAuth() {
  const token = localStorage.getItem("access_token");
  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");

  if (token) {
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    loginLink.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

async function loadFeaturedProducts() {
  const container = document.getElementById("featuredProducts");

  try {
    const response = await fetch(`${BASE_URL}/api/products/featured`);
    const result = await response.json();

    container.innerHTML = "";

    if (!result.data || result.data.length === 0) {
      container.innerHTML = "<p>No featured products found.</p>";
      return;
    }

    result.data.forEach(product => {
      const image =
        product.primary_image ||
        product.image_url ||
        "images/no-image.png";

      container.innerHTML += `
        <div class="product-card">
          <img src="${image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p class="price">₹${product.offer_price || product.price}</p>
          <a href="product-details.html?id=${product.productid}" class="btn">View</a>
        </div>
      `;
    });

  } catch (error) {
    container.innerHTML = "<p>Unable to load products.</p>";
    console.error(error);
  }
}