async function loadFestivalBanner() {

    try {

        // const response = await fetch(API.BANNERS);
        const response = await fetch(`${API.BANNERS}/active?banner_type=festival`);
        const result = await response.json();

        const banners = result.data;

        const container = document.getElementById("festivalBanner");

        container.innerHTML = "";

        if (!banners.length) {

            container.innerHTML = `
                <div class="festival-banner">

                    <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600" alt="Festival Banner">

                    <div class="festival-overlay">

                        <div class="festival-content">

                            <h5>Azyra FASHIONS</h5>

                            <h1>Festival Collection</h1>

                            <p>Up To 60% OFF On Premium Fashion</p>

                            <a href="#" class="festival-btn">
                                Shop Now
                            </a>

                        </div>

                    </div>

                </div>
            `;

            return;

        }

        const banner = banners[0];

        container.innerHTML = `

        <div class="festival-banner">

            <img src="${banner.image}" alt="${banner.title}">

            <div class="festival-overlay">

                <div class="festival-content">

                    <h5>LIMITED OFFER</h5>

                    <h1>${banner.title}</h1>

                    <p>${banner.subtitle || banner.description || ""}</p>

                    <a href="${banner.button_link || '#'}" class="festival-btn">

                        ${banner.button_text || "Shop Now"}

                    </a>

                </div>

            </div>

        </div>

        `;

    } catch (err) {

        console.log(err);

    }

}

loadFestivalBanner();