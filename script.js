// -----------------------------------
// STEP 1: Simulate User Activity
// -----------------------------------
const currentUser = {
    viewed: ["p-101"],
    purchased: ["p-303"]
};

const userActivity = {
    userA: ["p-101", "p-301", "p-302", "p-303"],
    userB: ["p-101", "p-301", "p-302", "p-304"],
    userC: ["p-101", "p-302", "p-304"],
    userD: ["p-301", "p-302", "p-303"]
};


// -----------------------------------
// Existing product data
// -----------------------------------

function getAllProducts() {

    let products = [];

    storeData.categories.forEach(category => {

        category.subcategories.forEach(subcategory => {

            subcategory.products.forEach(product => {
                products.push(product);
            });

        });

    });

    return products;
}

const products = getAllProducts();


// -----------------------------------
// Display Products
// -----------------------------------

function displayProducts() {

    const container =
        document.getElementById("productContainer");

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <h2>${product.name}</h2>
            <p>Brand: ${product.brand}</p>
            <p>Price: ₹${product.price.toLocaleString("en-IN")}</p>
            <p>Rating: ⭐ ${product.rating}</p>
            <p>Stock: ${product.stock}</p>
        `;

        container.appendChild(card);
    });
}


// -----------------------------------
// STEP 2: Find Users Who Viewed
// a Particular Product
// -----------------------------------

function getUsersWhoViewedProduct(productId) {

    const users = [];

    for (const user in userActivity) {

        if (userActivity[user].includes(productId)) {
            users.push(user);
        }

    }

    return users;
}
function getOtherProductsViewed(users, currentProductId) {

    const products = [];

    for (const user of users) {

        for (const productId of userActivity[user]) {

            if (productId !== currentProductId) {
                products.push(productId);
            }

        }
    }

    return products;
}
function countProductFrequency(productIds) {

    const frequency = {};

    for (const productId of productIds) {

        if (frequency[productId]) {
            frequency[productId]++;
        } else {
            frequency[productId] = 1;
        }
    }

    return frequency;
}
function getTopRecommendations(frequency) {

    const sortedProducts = Object.entries(frequency);

    sortedProducts.sort((a, b) => b[1] - a[1]);

    return sortedProducts.slice(0, 3);
}
function filterRecommendations(recommendations) {

    return recommendations.filter(([productId]) => {

        const alreadyViewed =
            currentUser.viewed.includes(productId);

        const alreadyPurchased =
            currentUser.purchased.includes(productId);

        return !alreadyViewed && !alreadyPurchased;
    });
}
function displayRecommendations() {

    const container =
        document.getElementById("recommendationContainer");

    container.innerHTML = "";

    const users =
        getUsersWhoViewedProduct("p-101");

    const otherProducts =
        getOtherProductsViewed(users, "p-101");

    const frequency =
        countProductFrequency(otherProducts);

    const top3 =
        getTopRecommendations(frequency);

    const finalRecommendations =
        filterRecommendations(top3);

    finalRecommendations.forEach(([productId]) => {

        const product =
            products.find(product => product.id === productId);

        if (!product) {
            return;
        }

        const card =
            document.createElement("div");

        card.className = "recommendation-card";

        card.innerHTML = `
            <h3>${product.name}</h3>

            <p class="why-label">
                Why this product?
            </p>

            <p>
                Often viewed with MacBook Air M3
            </p>
        `;

        container.appendChild(card);
    });
}


// -----------------------------------
// Display Products
// -----------------------------------

displayProducts();


// -----------------------------------
// Test Recommendation Logic
// -----------------------------------

const users = getUsersWhoViewedProduct("p-101");

const otherProducts =
    getOtherProductsViewed(users, "p-101");

const frequency =
    countProductFrequency(otherProducts);

const top3 =
    getTopRecommendations(frequency);

const finalRecommendations =
    filterRecommendations(top3);

console.log("Final recommendations:", finalRecommendations);
displayRecommendations();
document
    .getElementById("refreshButton")
    .addEventListener("click", function () {

        displayRecommendations();

    });