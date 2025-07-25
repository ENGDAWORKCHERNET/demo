"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
exports.getStock = getStock;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const openai_1 = __importDefault(require("openai"));
const zod_1 = require("zod");
const sanitization_1 = require("./lib/sanitization");
const functionRouter_1 = require("./handlers/functionRouter");
const functionDefinitions_1 = require("./handlers/functionDefinitions");
const systemPrompt_1 = require("./prompts/systemPrompt");
const pricing_1 = require("./services/pricing");
exports.router = express_1.default.Router();
const client = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
exports.router.get("/stream", async (req, res) => {
    const { prompt } = req.query;
    const sanitized_prompt = (0, sanitization_1.validateArbitratyData)(prompt, zod_1.z.string());
    if (sanitized_prompt.err) {
        res.status(400).send(sanitized_prompt.val);
        return;
    }
    const userInput = sanitized_prompt.val;
    const messages = [
        {
            role: "system",
            content: systemPrompt_1.SYSTEM_PROMPT,
        },
        {
            role: "user",
            content: userInput,
        },
    ];
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4-0613",
            messages,
            functions: functionDefinitions_1.functionDefinitions,
            temperature: 0.7,
        });
        const message = response.choices[0].message;
        if (message.function_call) {
            const fnName = message.function_call.name;
            const args = JSON.parse(message.function_call.arguments || "{}");
            const result = await (0, functionRouter_1.handleFunctionCall)({
                name: fnName,
                arguments: args,
            });
            messages.push({
                role: "assistant",
                content: message.content || null,
                function_call: message.function_call,
            });
            messages.push({
                role: "function",
                name: fnName,
                content: JSON.stringify(result),
            });
            const finalResponse = await client.chat.completions.create({
                model: "gpt-4-0613",
                messages,
                temperature: 0.7,
            });
            return res.status(200).json({
                reply: finalResponse.choices[0].message.content,
                data: result,
            });
        }
        return res.status(200).json({ reply: message.content });
    }
    catch (err) {
        console.error("Error during chat completion:", err);
        return res.status(500).json({ error: "Internal error during LLM processing." });
    }
});
const inventory = {
    "product-1": 100,
    "product-2": 50,
    "product-3": 25,
};
function getStock(productId) {
    return inventory[productId];
}
exports.router.get("/product-info", async (req, res) => {
    const { productId } = req.query;
    if (typeof productId !== "string") {
        return res.status(400).json({ error: "Invalid product ID." });
    }
    try {
        const stock = getStock(productId);
        const priceInfo = await (0, pricing_1.getPrice)(productId);
        if (priceInfo === null) {
            return res.status(404).json({ error: "Product not found." });
        }
        return res.status(200).json({
            stock,
            price: priceInfo.price,
            currency: priceInfo.currency,
            lastUpdated: priceInfo.lastUpdated
        });
    }
    catch (err) {
        console.error("Error fetching product info:", err);
        return res.status(500).json({ error: "Internal error fetching product info." });
    }
});
//# sourceMappingURL=router.js.map