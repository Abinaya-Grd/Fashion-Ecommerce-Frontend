const BASE_URL = "https://fashion-ecommerce-ozav.onrender.com";

const API = {

    LOGIN: `${BASE_URL}/api/accounts/login`,

    REGISTER: `${BASE_URL}/api/accounts/register`,

    PRODUCTS: `${BASE_URL}/api/products`,

    CART: `${BASE_URL}/api/cart`,

    WISHLIST: `${BASE_URL}/api/wishlist`,

    PROFILE: `${BASE_URL}/api/accounts/profile`,

    ORDERS: `${BASE_URL}/api/orders`,

    BANNERS: `${BASE_URL}/api/banners`,

    CATEGORIES: `${BASE_URL}/api/categories`

};

function normalHeaders() {
    return {
        "Content-Type": "application/json"
    };
}

function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access_token")
    };
}