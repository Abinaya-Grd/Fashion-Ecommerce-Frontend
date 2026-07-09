// api.js

async function apiRequest(url, options = {}) {

    try {

        const response = await fetch(url, options);

        return await response.json();

    }

    catch (error) {

        console.error(error);

        return null;

    }

}