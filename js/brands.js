async function loadBrands() {

    try {

        const response = await fetch(API.BRANDS);

        const result = await response.json();

        const brands = result.data;

        const container = document.getElementById("brandContainer");

        container.innerHTML = "";

        brands.forEach(brand => {

            container.innerHTML += `

            <div class="swiper-slide">

                <div class="brand-card">

                    <img src="${brand.logo}"
                         alt="${brand.name}"
                         loading="lazy">

                    <div class="brand-content">

                        <h4>${brand.name}</h4>

                        <p>Premium Fashion Collection</p>

                        <a href="pages/products.html?brand=${brand.brandid}"
                           class="brand-btn">

                            Explore

                        </a>

                    </div>

                </div>

            </div>

            `;

        });

        new Swiper(".brandSwiper", {

            loop: true,

            autoplay: {
                delay: 2500,
            },

            spaceBetween: 25,

            breakpoints: {

                320: {
                    slidesPerView: 1
                },

                576: {
                    slidesPerView: 2
                },

                768: {
                    slidesPerView: 3
                },

                992: {
                    slidesPerView: 4
                }

            }

        });

    } catch (error) {

        console.log("Brand Error:", error);

    }

}

loadBrands();