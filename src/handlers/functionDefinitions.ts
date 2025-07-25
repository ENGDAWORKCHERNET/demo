// OpenAI function definitions for the available functions
export const functionDefinitions = [
  {
    name: "getStock",
    description: "Get the current stock level for a product",
    parameters: {
      type: "object",
      properties: {
        productId: {
          type: "string",
          description: "The unique identifier for the product",
        },
      },
      required: ["productId"],
    },
  },
  {
    name: "getPrice",
    description: "Get the current price for a product",
    parameters: {
      type: "object",
      properties: {
        productId: {
          type: "string",
          description: "The unique identifier for the product",
        },
      },
      required: ["productId"],
    },
  },
  {
    name: "getUserBalance",
    description: "Get the current balance for a user account",
    parameters: {
      type: "object",
      properties: {
        userId: {
          type: "string",
          description: "The unique identifier for the user",
        },
      },
      required: ["userId"],
    },
  },
];