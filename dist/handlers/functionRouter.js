"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFunctionCall = handleFunctionCall;
const functionHandlers = {
    getStock: async (args) => {
        const inventory = {
            "product-1": 100,
            "product-2": 50,
            "product-3": 25,
        };
        const stock = inventory[args.productId];
        if (stock !== undefined) {
            return { success: true, data: { stock, productId: args.productId } };
        }
        return { success: false, error: "Product not found" };
    },
    getPrice: async (args) => {
        const prices = {
            "product-1": 29.99,
            "product-2": 49.99,
            "product-3": 19.99,
        };
        const price = prices[args.productId];
        if (price !== undefined) {
            return { success: true, data: { price, productId: args.productId } };
        }
        return { success: false, error: "Price not found" };
    },
    getUserBalance: async (args) => {
        return {
            success: true,
            data: {
                balance: 1234.56,
                currency: "USD",
                userId: args.userId
            }
        };
    },
};
async function handleFunctionCall(functionCall) {
    const handler = functionHandlers[functionCall.name];
    if (!handler) {
        return {
            success: false,
            error: `Unknown function: ${functionCall.name}`,
        };
    }
    try {
        return await handler(functionCall.arguments);
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
}
//# sourceMappingURL=functionRouter.js.map