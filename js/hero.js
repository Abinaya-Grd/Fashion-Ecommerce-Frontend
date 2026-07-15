async function loadHeroBanners() {

    try {

        // const response = await fetch(API.BANNERS);
        const response = await fetch(`${API.BANNERS}/active?banner_type=hero`);
        const result = await response.json();

        const container = document.getElementById("bannerContainer");

        container.innerHTML = "";

        const banners = result.data || result;

        banners.forEach(banner => {

            const image =
                banner.image ||
                banner.banner_image ||
                banner.thumbnail ||
                "";

            container.innerHTML += `

            <div class="swiper-slide">

                <div style="position:relative">

                    <img src="${image}" alt="Banner">

                    <div class="hero-content">

                        <h5>NEW COLLECTION</h5>

                        <h1>${banner.title || "SSS Fashions"}</h1>

                        <p>${banner.description || "Discover the latest fashion trends."}</p>

                        <div class="hero-buttons">

                            <a href="pages/products.html" class="shop-btn">
                                Shop Now
                            </a>

                            <a href="pages/products.html" class="explore-btn">
                                Explore Collection
                            </a>

                        </div>

                    </div>

                </div>

            </div>

            `;

        });

        new Swiper(".heroSwiper", {

            loop: true,

            autoplay: {
                delay: 4000,
            },

            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }

        });

    } catch (error) {

        console.log(error);

    }

}

loadHeroBanners();