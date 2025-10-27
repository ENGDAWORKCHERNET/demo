# Fintech AI Assistant

A real-time AI assistant for a fintech super app, powered by OpenAI's GPT-4 with function calling capabilities.

## Features

- 🤖 AI-powered chat assistant (Rhea)
- 📦 Product inventory management
- 💰 Real-time pricing information
- 👤 User balance inquiries
- 🔧 Function calling with OpenAI
- 🛡️ Input validation and sanitization
- 🚀 Express.js REST API

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and fill in your OpenAI API key:
```bash
cp .env.example .env
```

Edit `.env`:
```env
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=3000
NODE_ENV=development
```

### 3. Build the Project
```bash
npm run build
```

### 4. Start the Server
```bash
# Development mode with ts-node
npm run dev

# Production mode (requires build first)
npm start
```

## API Endpoints

### Health Check
```bash
GET /health
```

### AI Chat Stream
```bash
GET /api/stream?prompt=What is the stock for product-1?
```

### Product Information
```bash
GET /api/product-info?productId=product-1
```

## Available Functions

The AI assistant can call these functions:

1. **getStock(productId)** - Get current stock levels
2. **getPrice(productId)** - Get product pricing information
3. **getUserBalance(userId)** - Get user account balance

## Example Usage

### Chat with AI
```bash
curl "http://localhost:3000/api/stream?prompt=What%20is%20the%20price%20of%20product-1?"
```

### Get Product Info
```bash
curl "http://localhost:3000/api/product-info?productId=product-1"
```

## Project Structure

```
src/
├── index.ts                 # Main application entry point
├── router.ts               # Express routes and OpenAI integration
├── handlers/
│   ├── functionRouter.ts   # Function call handlers
│   └── functionDefinitions.ts # OpenAI function definitions
├── services/
│   └── pricing.ts          # Pricing service
├── prompts/
│   └── systemPrompt.ts     # AI system prompt
├── lib/
│   └── sanitization.ts     # Input validation utilities
└── common/
    └── src/
        └── unrestrictedobject.ts # Type definitions
```

## Development

### Scripts
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with ts-node
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Functions

1. Add function definition to `src/handlers/functionDefinitions.ts`
2. Add function handler to `src/handlers/functionRouter.ts`
3. The AI will automatically be able to call your new function

## Security Notes

- Always validate input using the sanitization utilities
- Never expose sensitive data in function responses
- Use environment variables for API keys and secrets
- The current implementation uses mock data - replace with real services

## License

MIT  
    
