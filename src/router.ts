import "dotenv/config"; // Automatically loads environment variables from .env file
import express from "express";
import OpenAI from "openai";
import { z } from "zod";
import { validateArbitratyData } from "./lib/sanitization";
import { unrestrictedobject } from "./common/src/unrestrictedobject";
import { handleFunctionCall } from "./handlers/functionRouter";
import { functionDefinitions } from "./handlers/functionDefinitions";
import { SYSTEM_PROMPT } from "./prompts/systemPrompt";
import { getPrice } from "./services/pricing";

export const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Extended ChatMessage type to handle OpenAI function calls properly
type ChatMessage =
  | { role: "system" | "user"; content: string }
  | { role: "assistant"; content: string | null; function_call?: OpenAI.Chat.Completions.ChatCompletionMessage.FunctionCall }
  | { role: "function"; name: string; content: string };

router.get("/stream", async (req, res) => {
  const { prompt } = req.query as unrestrictedobject;

  const sanitized_prompt = validateArbitratyData(prompt, z.string());
  if (sanitized_prompt.err) {
    res.status(400).send(sanitized_prompt.val);
    return;
  }

  const userInput = sanitized_prompt.val;

  const messages: ChatMessage[] = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
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
      functions: functionDefinitions,
      temperature: 0.7,
    });

    const message = response.choices[0].message;

    // Handle function call if needed
    if (message.function_call) {
      const fnName = message.function_call.name;
      const args = JSON.parse(message.function_call.arguments || "{}");

      const result = await handleFunctionCall({
        name: fnName,
        arguments: args,
      });

      // Add the function_call message (OpenAI returns it as a message object)
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

    // No function call, return LLM direct response
    return res.status(200).json({ reply: message.content });
  } catch (err) {
    console.error("Error during chat completion:", err);
    return res.status(500).json({ error: "Internal error during LLM processing." });
  }
});

// Example inventory data - replace with actual database/service calls
const inventory: { [productId: string]: number } = {
  "product-1": 100,
  "product-2": 50,
  "product-3": 25,
};

export function getStock(productId: string): number | undefined {
  return inventory[productId];
}

router.get("/product-info", async (req, res) => {
  const { productId } = req.query;

  if (typeof productId !== "string") {
    return res.status(400).json({ error: "Invalid product ID." });
  }

  try {
    const stock = getStock(productId);
    const priceInfo = await getPrice(productId);

    if (priceInfo === null) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.status(200).json({ 
      stock, 
      price: priceInfo.price,
      currency: priceInfo.currency,
      lastUpdated: priceInfo.lastUpdated
    });
  } catch (err) {
    console.error("Error fetching product info:", err);
    return res.status(500).json({ error: "Internal error fetching product info." });
  }
});