console.log(API);
console.log(API.CATEGORIES);

async function loadCategories() {

    try {

        const response = await fetch(API.CATEGORIES);

        const result = await response.json();

        const categories = result.data;

        const container = document.getElementById("categoryContainer");

        container.innerHTML = "";

        categories.forEach(category => {

            container.innerHTML += `

                <div class="col-lg-3 col-md-6 col-sm-6">

                    <div class="category-card">

                        <img src="${category.image}" alt="${category.name}">

                        <div class="category-content">

                            <h4>${category.name}</h4>

                            <a href="pages/category.html?category=${category.id}" class="shop-btn">

                                Shop Now

                            </a>

                        </div>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.error("Category Error:", error);

    }

}

loadCategories();