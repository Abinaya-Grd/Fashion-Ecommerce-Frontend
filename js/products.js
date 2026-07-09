let products = [];

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  document
    .getElementById("searchInput")
    ?.addEventListener("input", searchProducts);

  document
    .getElementById("sortSelect")
    ?.addEventListener("change", sortProducts);
});

async function loadProducts() {
  const container = document.getElementById("productContainer");

  container.innerHTML = "<h2>Loading Products...</h2>";

  try {
    const response = await fetch(API.PRODUCTS);

    const result = await response.json();
    console.log(result.data);

    products = result.data;

    displayProducts(products);
  } catch (error) {
    console.log(error);

    container.innerHTML = "<h2>Unable to load products</h2>";
  }
}

function displayProducts(data) {
  const container = document.getElementById("productContainer");

  container.innerHTML = "";

  data.forEach((product) => {
    let discount = 0;

    if (product.price > product.offer_price) {
      discount = Math.round(
        ((product.price - product.offer_price) / product.price) * 100,
      );
    }

    container.innerHTML += `


        <div class="product-card">



            <img 
            src="${product.thumbnail}"
            alt="${product.name}"
            >



            <div class="product-info">



                <h3 class="product-title">

                ${product.name}

                </h3>



                <p>

                ${product.brand_details.name}

                </p>




                <p class="price">

                ₹${product.offer_price}

                <span class="old-price">

                ₹${product.price}

                </span>

                </p>




                <p class="discount">

                ${discount}% OFF

                </p>





                <button 
                onclick="
                viewProduct(${product.productid})
                "
                >

                View Product

                </button>




            </div>


        </div>


        `;
  });
}

function searchProducts(e) {
  const value = e.target.value.toLowerCase();

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(value),
  );

  displayProducts(filtered);
}

function sortProducts(e) {
  let value = e.target.value;

  let sorted = [...products];

  if (value === "low") {
    sorted.sort((a, b) => a.offer_price - b.offer_price);
  }

  if (value === "high") {
    sorted.sort((a, b) => b.offer_price - a.offer_price);
  }

  displayProducts(sorted);
}

function viewProduct(id) {
  window.location.href = `product-details.html?id=${id}`;
}
