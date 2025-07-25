"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrice = getPrice;
exports.updatePrice = updatePrice;
const priceDatabase = {
    "product-1": {
        price: 29.99,
        currency: "USD",
        lastUpdated: new Date(),
    },
    "product-2": {
        price: 49.99,
        currency: "USD",
        lastUpdated: new Date(),
    },
    "product-3": {
        price: 19.99,
        currency: "USD",
        lastUpdated: new Date(),
    },
};
async function getPrice(productId) {
    await new Promise(resolve => setTimeout(resolve, 10));
    const priceData = priceDatabase[productId];
    if (!priceData) {
        return null;
    }
    return {
        productId,
        ...priceData,
    };
}
async function updatePrice(productId, newPrice) {
    await new Promise(resolve => setTimeout(resolve, 10));
    if (priceDatabase[productId]) {
        priceDatabase[productId] = {
            ...priceDatabase[productId],
            price: newPrice,
            lastUpdated: new Date(),
        };
        return true;
    }
    return false;
}
//# sourceMappingURL=pricing.js.map