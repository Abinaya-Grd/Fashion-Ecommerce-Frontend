document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    loadFeaturedProducts();
});

// ================= MENU =================

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// ================= LOGIN =================

function checkAuth() {

    const token = localStorage.getItem("access_token");

    const loginLink = document.getElementById("loginLink");

    const logoutBtn = document.getElementById("logoutBtn");

    if(token){

        loginLink.style.display="none";

        logoutBtn.style.display="block";

    }

    else{

        loginLink.style.display="block";

        logoutBtn.style.display="none";

    }

}

// ================= LOGOUT =================

function logout(){

    localStorage.clear();

    window.location.href="login.html";

}

// ================= LOAD PRODUCTS =================

async function loadFeaturedProducts() {

    const container = document.getElementById("featuredProducts");

    container.innerHTML = `
        <h3 style="text-align:center;">Loading Products...</h3>
    `;

    try {

        const response = await fetch(API.PRODUCTS);

        const result = await response.json();

        if (!result.success || result.data.length === 0) {

            container.innerHTML = `
                <h2 style="text-align:center;">
                    No Products Available
                </h2>
            `;

            return;
        }

        container.innerHTML = "";

        result.data.forEach(product => {

            const price = parseFloat(product.price);

            const offerPrice = parseFloat(product.offer_price);

            let discount = 0;

            if (price > offerPrice) {

                discount = Math.round(
                    ((price - offerPrice) / price) * 100
                );

            }

            const image = product.thumbnail;

            container.innerHTML += `

            <div class="product-card">

                <img src="${image}" alt="${product.name}">

                <div class="product-info">

                    <p class="product-category">

                        ${product.category_details.name}

                    </p>

                    <h3 class="product-title">

                        ${product.name}

                    </h3>

                    <p>

                        <strong>${product.brand_details.name}</strong>

                    </p>

                    <p>

                        ${product.product_style_details.name}

                    </p>

                    <div class="rating">

                        ⭐⭐⭐⭐⭐

                        <span>(4.8)</span>

                    </div>

                    <div class="price-box">

                        <span class="offer-price">

                            ₹${offerPrice}

                        </span>

                        <span class="original-price">

                            ₹${price}

                        </span>

                        <span class="discount">

                            ${discount}% OFF

                        </span>

                    </div>

                    <div class="product-buttons">

                        <button class="cart-btn"
                                onclick="addToCart(${product.productid})">

                            Add Cart

                        </button>

                        <button class="view-btn"
                                onclick="location.href='product-details.html?id=${product.productid}'">

                            View

                        </button>

                    </div>

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `
            <h2 style="text-align:center;color:red;">
                Unable to Load Products
            </h2>
        `;

    }

}
    