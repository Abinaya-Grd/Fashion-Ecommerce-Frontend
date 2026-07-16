// ===============================
// API
// ===============================

const BASE_URL = API_BASE_URL;

let products = [];
let filteredProducts = [];

let currentPage = 1;
const productsPerPage = 12;

// ===============================
// LOAD PAGE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    loadCategories();

    loadBrands();

    loadProducts();

    setupSearch();

    setupSorting();

    setupPriceFilter();

});

async function loadCategories() {

    try {

        const response = await fetch(`${BASE_URL}/categories/`);

        const result = await response.json();

        const container = document.getElementById("categoryFilter");

        container.innerHTML = "";

        result.data.forEach(category => {

            container.innerHTML += `

            <label>

                <input
                    type="checkbox"
                    value="${category.id}"
                    class="category-check">

                ${category.name}

            </label>

            `;

        });

        document.querySelectorAll(".category-check")
            .forEach(box => {

                box.addEventListener("change", applyFilters);

            });

    } catch (error) {

        console.log(error);

    }

}


async function loadBrands() {

    try {

        const response = await fetch(`${BASE_URL}/brands/`);

        const result = await response.json();

        const container = document.getElementById("brandFilter");

        container.innerHTML = "";

        result.data.forEach(brand => {

            container.innerHTML += `

            <label>

                <input

                    type="checkbox"

                    class="brand-check"

                    value="${brand.brandid}"

                >

                ${brand.name}

            </label>

            `;

        });

        document.querySelectorAll(".brand-check")

        .forEach(box => {

            box.addEventListener("change", applyFilters);

        });

    } catch (error) {

        console.log(error);

    }

}


async function loadProducts() {

    try {

        const response = await fetch(`${BASE_URL}/products/`);

        const result = await response.json();

        products = result.data;

        filteredProducts = [...products];

        renderProducts();

    } catch (error) {

        console.log(error);

    }

}

function renderProducts() {

    const container = document.getElementById("productGrid");

    container.innerHTML = "";

    document.getElementById("productCount").innerHTML = filteredProducts.length;

    const start = (currentPage - 1) * productsPerPage;

    const end = start + productsPerPage;

    const pageProducts = filteredProducts.slice(start, end);

    pageProducts.forEach(product => {

        container.innerHTML += `

<div class="col-lg-3 col-md-4 col-6">

<div class="product-card">

<div class="product-image">

<img src="${product.main_image}" alt="">

<div class="discount-badge">

${product.discount_percentage}% OFF

</div>

<button class="wishlist-btn">

<i class="fa-regular fa-heart"></i>

</button>

</div>

<div class="product-info">

<h5 class="product-brand">

${product.brand_name}

</h5>

<p class="product-name">

${product.name}

</p>

<div class="product-rating">

<i class="fa-solid fa-star"></i>

${product.average_rating}

</div>

<div class="price-box">

<span class="current-price">

₹${product.offer_price}

</span>

<span class="old-price">

₹${product.price}

</span>

<span class="discount">

${product.discount_percentage}% OFF

</span>

</div>

<div class="product-actions">

<button

class="view-btn"

onclick="viewProduct(${product.productid})">

View

</button>

<button

class="add-cart"

onclick="addCart(${product.productid})">

Add To Cart

</button>

</div>

</div>

</div>

</div>

`;

    });

    renderPagination();

} // ==========================================
// SEARCH
// ==========================================

function setupSearch() {

    const search = document.getElementById("searchProduct");

    search.addEventListener("keyup", () => {

        applyFilters();

    });

}

// ==========================================
// SORTING
// ==========================================

function setupSorting() {

    document
        .getElementById("sortProduct")
        .addEventListener("change", () => {

            applyFilters();

        });

}

// ==========================================
// PRICE
// ==========================================

function setupPriceFilter() {

    const range = document.getElementById("priceRange");

    const value = document.querySelector(".price-value");

    range.addEventListener("input", function() {

        value.innerHTML = `₹0 - ₹${this.value}`;

        applyFilters();

    });

}

// ==========================================
// APPLY FILTERS
// ==========================================

function applyFilters() {

    filteredProducts = [...products];

    //-----------------------------------------
    // Search
    //-----------------------------------------

    const keyword = document
        .getElementById("searchProduct")
        .value
        .toLowerCase();

    if (keyword !== "") {

        filteredProducts = filteredProducts.filter(product =>

            product.name.toLowerCase().includes(keyword) ||

            product.brand_name.toLowerCase().includes(keyword)

        );

    }

    //-----------------------------------------
    // Category
    //-----------------------------------------

    const selectedCategories = [

        ...document.querySelectorAll(".category-check:checked")

    ].map(item => Number(item.value));

    if (selectedCategories.length > 0) {

        filteredProducts = filteredProducts.filter(product =>

            selectedCategories.includes(product.category)

        );

    }

    //-----------------------------------------
    // Brand
    //-----------------------------------------

    const selectedBrands = [

        ...document.querySelectorAll(".brand-check:checked")

    ].map(item => Number(item.value));

    if (selectedBrands.length > 0) {

        filteredProducts = filteredProducts.filter(product =>

            selectedBrands.includes(product.brand)

        );

    }

    //-----------------------------------------
    // Price
    //-----------------------------------------

    const maxPrice = Number(

        document.getElementById("priceRange").value

    );

    filteredProducts = filteredProducts.filter(product =>

        Number(product.offer_price) <= maxPrice

    );

    //-----------------------------------------
    // Rating
    //-----------------------------------------

    const rating = document.querySelector(

        "input[name='rating']:checked"

    );

    if (rating) {

        filteredProducts = filteredProducts.filter(product =>

            Number(product.average_rating) >= Number(rating.value)

        );

    }

    //-----------------------------------------
    // Sorting
    //-----------------------------------------

    sortProducts();

} // ==========================================
// SORT PRODUCTS
// ==========================================

function sortProducts() {

    const sort = document.getElementById("sortProduct").value;

    switch (sort) {

        case "price_low":

            filteredProducts.sort(

                (a, b) => a.offer_price - b.offer_price

            );

            break;

        case "price_high":

            filteredProducts.sort(

                (a, b) => b.offer_price - a.offer_price

            );

            break;

        case "rating":

            filteredProducts.sort(

                (a, b) => b.average_rating - a.average_rating

            );

            break;

        case "discount":

            filteredProducts.sort(

                (a, b) => b.discount_percentage - a.discount_percentage

            );

            break;

        default:

            filteredProducts.sort(

                (a, b) => b.productid - a.productid

            );

    }

    currentPage = 1;

    renderProducts();

} // ==========================================
// PAGINATION
// ==========================================

function renderPagination() {

    const container = document.getElementById("pagination");

    container.innerHTML = "";

    const totalPages = Math.ceil(

        filteredProducts.length / productsPerPage

    );

    for (let i = 1; i <= totalPages; i++) {

        container.innerHTML += `

<li class="${currentPage === i ? "active" : ""}">

<a href="#"

onclick="changePage(${i})">

${i}

</a>

</li>

`;

    }

}

function changePage(page) {

    currentPage = page;

    renderProducts();

    window.scrollTo({

        top: 250,

        behavior: "smooth"

    });

}