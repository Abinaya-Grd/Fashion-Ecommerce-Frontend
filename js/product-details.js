let productId = null;

let selectedSize = "";
let selectedColor = "";

let quantity = 1;



document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  productId = params.get("id");

  if (productId) {
    loadProductDetails();
  }
});



async function loadProductDetails() {
  try {
    const response = await fetch(`${API.PRODUCTS}/${productId}`);

    const result = await response.json();

    console.log("API RESPONSE:", result);

    

    const product = result.data || result;

    displayProduct(product);
  } catch (error) {
    console.error(error);

    document.getElementById("productName").innerHTML = "Product not found";
  }
}


function displayProduct(product) {
  console.log("PRODUCT:", product);

  const image = product.thumbnail || "";



  const mainImage = document.getElementById("mainImage");

  if (mainImage) {
    mainImage.src = image;

    mainImage.onerror = function () {
      this.src = "assets/no-image.png";
    };
  }


  const name = document.getElementById("productName");

  if (name) {
    name.innerHTML = product.name || "";
  }



  const brand = document.getElementById("brand");

  if (brand) {
    brand.innerHTML = "Brand : " + (product.brand_details?.name || "Unknown");
  }


  document.getElementById("offerPrice").innerHTML =
    product.offer_price || product.price;

  document.getElementById("price").innerHTML = product.price || "";

 

  document.getElementById("description").innerHTML =
    product.description || "No description available";

 

  const thumbs = document.querySelectorAll(".thumbs img");

  thumbs.forEach((img) => {
    img.src = image;

    img.onclick = () => {
      document.getElementById("mainImage").src = img.src;
    };
  });
}



document.querySelectorAll(".sizes button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".sizes button").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    selectedSize = button.innerText;
  });
});


document.querySelectorAll(".colors button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".colors button").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    selectedColor = button.className;
  });
});



function changeQuantity(type) {
  if (type === "plus") {
    quantity++;
  }

  if (type === "minus" && quantity > 1) {
    quantity--;
  }

  const qty = document.getElementById("quantity");

  if (qty) {
    qty.innerHTML = quantity;
  }
}



function addToCart() {
  if (!selectedSize) {
    alert("Please select size");

    return;
  }

  if (!selectedColor) {
    alert("Please select color");

    return;
  }

  const item = {
    product_id: productId,

    size: selectedSize,

    color: selectedColor,

    quantity: quantity,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product added to cart");
}

function buyNow() {
  addToCart();

  setTimeout(() => {
    window.location.href = "cart.html";
  }, 500);
}
