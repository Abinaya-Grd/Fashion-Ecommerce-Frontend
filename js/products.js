async function loadProducts() {

    try {

        const response = await fetch(API.PRODUCTS);

        const result = await response.json();

        const products = result.data;

        const container = document.getElementById("productContainer");

        container.innerHTML = "";

        products.forEach(product => {

                    let discount = 0;

                    if (product.offer_price) {

                        discount = Math.round(
                            ((product.price - product.offer_price) / product.price) * 100
                        );

                    }

                    container.innerHTML += `

            <div class="swiper-slide">

                <div class="product-card">

                    <div class="product-image">

                        <img src="${product.thumbnail}" alt="${product.name}">

                        ${
                            discount > 0
                            ?
                            `<div class="offer-badge">${discount}% OFF</div>`
                            :
                            ""
                        }

                        <div class="product-actions">

                            <button>
                                <i class="fa-regular fa-heart"></i>
                            </button>

                            <button>
                                <i class="fa-regular fa-eye"></i>
                            </button>

                        </div>

                    </div>

                    <div class="product-info">

                        <div class="product-brand">
                            ${product.brand_details.name}
                        </div>

                        <h4 class="product-name">
                            ${product.name}
                        </h4>

                        <div class="product-category">
                            ${product.category_details.name}
                        </div>

                        <div class="rating">
                            ★★★★★
                        </div>

                        <div class="price">

                            <span class="offer-price">
                                ₹${product.offer_price ?? product.price}
                            </span>

                            ${
                                product.offer_price
                                ?
                                `
                                <span class="original-price">
                                    ₹${product.price}
                                </span>

                                <span class="discount">
                                    ${discount}% OFF
                                </span>
                                `
                                :
                                ""
                            }

                        </div>

                        <button class="cart-btn">

                            <i class="fa-solid fa-cart-shopping"></i>

                            Add To Cart

                        </button>

                    </div>

                </div>

            </div>

            `;

        });

        new Swiper(".productSwiper", {

            slidesPerView: 4,

            spaceBetween: 25,

            loop: true,

            autoplay: {

                delay: 3000,

                disableOnInteraction: false

            },

            navigation: {

                nextEl: ".product-next",

                prevEl: ".product-prev"

            },

            breakpoints: {

                0: {

                    slidesPerView: 1

                },

                576: {

                    slidesPerView: 2

                },

                768: {

                    slidesPerView: 3

                },

                1200: {

                    slidesPerView: 4

                }

            }

        });

    }

    catch (error) {

        console.log(error);

    }

}

loadProducts();