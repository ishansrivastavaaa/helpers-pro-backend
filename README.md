# Helpers Pro Backend - Google AI Studio Integration

A NestJS backend for Helpers Pro marketplace with integrated Google AI Studio capabilities.

## Features

- ✅ User & Authentication Management
- ✅ Booking & Service Management
- ✅ Helper Profiles & Reviews
- ✅ Payment Processing (Razorpay)
- ✅ **Google AI Studio Integration** (NEW!)
  - Text generation & analysis
  - Code generation & debugging
  - Marketing content creation
  - Chat conversations
  - Test case generation
  - Documentation generation

## Technology Stack

- **Framework**: NestJS
- **Database**: MySQL
- **Authentication**: JWT
- **Payment**: Razorpay
- **AI**: Google AI Studio (Gemini)
- **Real-time**: Socket.io

## Environment Setup

```bash
# Clone the repository
git clone https://github.com/ishansrivastavaaa/helpers-pro-backend.git
cd helpers-pro-backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Add your configuration:
GOOGLE_AI_API_KEY=your_api_key_from_makersuite.google.com
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=helpers_pro
JWT_SECRET=your_jwt_secret
```

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## AI Studio API Endpoints

### Text Generation & Analysis
- `POST /ai/generate-text` - Generate text from prompts
- `POST /ai/analyze-content` - Analyze content (summary, insights, keywords, sentiment)
- `POST /ai/transform-text` - Transform text (translate, rephrase, simplify, expand, formal, casual)

### Code & Development
- `POST /ai/generate-code` - Generate production-ready code
- `POST /ai/generate-tests` - Generate unit test cases
- `POST /ai/debug-code` - Debug and fix code issues
- `POST /ai/generate-docs` - Generate code documentation

### Content Creation
- `POST /ai/generate-marketing` - Create marketing content (email, social, blog, ads)
- `POST /ai/answer-question` - Answer questions based on context

### Chat & Conversations
- `POST /ai/chat/start` - Start a new chat session
- `POST /ai/chat/:sessionId/send` - Send message in chat
- `POST /ai/chat/:sessionId/end` - End chat session
- `GET /ai/health` - Health check

## API Usage Examples

### Generate Code
```bash
curl -X POST http://localhost:3001/ai/generate-code \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Create a function to validate email addresses",
    "language": "typescript"
  }'
```

### Analyze Content
```bash
curl -X POST http://localhost:3001/ai/analyze-content \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Your text to analyze here...",
    "type": "summary"
  }'
```

### Start Chat Session
```bash
curl -X POST http://localhost:3001/ai/chat/start \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "user_123",
    "systemPrompt": "You are a helpful coding assistant"
  }'
```

### Send Chat Message
```bash
curl -X POST http://localhost:3001/ai/chat/user_123/send \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I handle async/await in TypeScript?"}'
```

## Project Structure

```
src/
├── ai/                    # Google AI Studio module
│   ├── ai.config.ts       # AI configuration service
│   ├── ai.service.ts      # AI business logic
│   ├── ai.controller.ts   # AI API endpoints
│   └── ai.module.ts       # AI module definition
├── auth/                  # Authentication module
├── user/                  # User management
├── booking/               # Booking management
├── service/               # Service management
├── helper/                # Helper profiles
├── review/                # Reviews & ratings
├── payment/               # Payment processing
├── notification/          # Notifications
├── app.module.ts          # Main application module
└── main.ts                # Application entry point
```

## Configuration

### Getting Google AI API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create new API key"
3. Copy the key and add to `.env`:
   ```
   GOOGLE_AI_API_KEY=your_key_here
   ```

### Database Configuration

Update `.env` with your MySQL credentials:
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=helpers_pro
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Development

```bash
# Format code
npm run format

# Lint code
npm run lint

# Build
npm run build
```

## Deployment

```bash
# Build for production
npm run build

# Run production server
npm run start:prod
```

## AI Features in Detail

### Text Generation
Generate any type of text content from natural language prompts.

### Content Analysis
- **Summary**: Get concise summaries of long content
- **Insights**: Extract key insights and recommendations
- **Keywords**: Identify main keywords and their importance
- **Sentiment**: Analyze emotional tone and underlying emotions

### Code Generation
Generate production-ready code with:
- Error handling
- Type definitions
- Comments and documentation
- Best practices

### Developer Tools
- **Debug Code**: Fix bugs with explanations
- **Generate Tests**: Create comprehensive unit tests
- **Generate Docs**: Auto-generate code documentation

### Marketing & Content
- **Email**: Professional marketing emails
- **Social**: Engaging social media posts
- **Blog**: SEO-friendly blog content
- **Ads**: Powerful ad copy variations

### Chat Conversations
Multi-turn conversations with persistent session management.

## Troubleshooting

### API Key Not Found
```
GOOGLE_AI_API_KEY is not set in environment variables
```
Solution: Add your API key to `.env`

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
Solution: Ensure MySQL is running and credentials are correct

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3001
```
Solution: Change PORT in `.env` or kill process using the port

## Contributing

Feel free to fork this repository and submit pull requests!

## License

UNLICENSED

## Support

For issues and questions, create a GitHub issue or contact the maintainer.

## Author

**Ishan Srivastava** - [@ishansrivastavaaa](https://github.com/ishansrivastavaaa)
