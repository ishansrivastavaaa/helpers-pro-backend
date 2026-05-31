/**
 * AI Integration Documentation
 */

# Google AI Studio Integration Guide

## Overview

The Helpers Pro backend now includes comprehensive Google AI Studio integration through the AIModule. This provides powerful AI capabilities across the entire application.

## Features

### 1. Text Generation
- Generate text from natural language prompts
- Customizable temperature, top_p, top_k, and max_tokens
- Endpoint: `POST /ai/generate-text`

### 2. Content Analysis
- Summary generation
- Insights extraction
- Keyword identification
- Sentiment analysis
- Endpoint: `POST /ai/analyze-content`

### 3. Code Generation
- Generate TypeScript/JavaScript code
- Generates production-ready code with error handling
- Includes type definitions and comments
- Endpoint: `POST /ai/generate-code`

### 4. Code Debugging
- Analyze code errors
- Provide fixes and explanations
- Endpoint: `POST /ai/debug-code`

### 5. Test Generation
- Generate unit tests
- Covers positive, negative, and edge cases
- Endpoint: `POST /ai/generate-tests`

### 6. Documentation
- Auto-generate code documentation
- Includes usage examples
- Endpoint: `POST /ai/generate-docs`

### 7. Text Transformation
- Translation to multiple languages
- Rephrasing and simplification
- Formal/casual tone adjustment
- Endpoint: `POST /ai/transform-text`

### 8. Marketing Content
- Email generation
- Social media posts
- Blog content
- Ad copy
- Endpoint: `POST /ai/generate-marketing`

### 9. Q&A System
- Answer questions based on context
- Comprehensive responses
- Endpoint: `POST /ai/answer-question`

### 10. Chat Sessions
- Multi-turn conversations
- Session persistence
- Context awareness
- Start: `POST /ai/chat/start`
- Send: `POST /ai/chat/:sessionId/send`
- End: `POST /ai/chat/:sessionId/end`

## Configuration

### API Key Setup

1. Visit https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add to `.env`:
   ```
   GOOGLE_AI_API_KEY=your_key_here
   ```

### Environment Variables

```env
# Google AI
GOOGLE_AI_API_KEY=your_api_key

# Application
NODE_ENV=development
PORT=3001

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=helpers_pro

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600
```

## Usage Examples

### 1. Generate Text

```bash
curl -X POST http://localhost:3001/ai/generate-text \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a greeting message for a new user",
    "options": {
      "temperature": 0.7,
      "maxOutputTokens": 256
    }
  }'
```

### 2. Analyze Content

```bash
curl -X POST http://localhost:3001/ai/analyze-content \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Your text content here...",
    "type": "summary"
  }'
```

### 3. Generate Code

```bash
curl -X POST http://localhost:3001/ai/generate-code \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Create a function to calculate factorial",
    "language": "typescript"
  }'
```

### 4. Debug Code

```bash
curl -X POST http://localhost:3001/ai/debug-code \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const x = null; console.log(x.toString());",
    "errorMessage": "Cannot read property 'toString' of null"
  }'
```

### 5. Generate Tests

```bash
curl -X POST http://localhost:3001/ai/generate-tests \
  -H "Content-Type: application/json" \
  -d '{
    "functionality": "Function that validates email addresses",
    "language": "typescript"
  }'
```

### 6. Chat Session

```bash
# Start chat
curl -X POST http://localhost:3001/ai/chat/start \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "user_123",
    "systemPrompt": "You are a helpful coding assistant"
  }'

# Send message
curl -X POST http://localhost:3001/ai/chat/user_123/send \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I handle async/await?"}'

# End chat
curl -X POST http://localhost:3001/ai/chat/user_123/end
```

## Integration Points

### In Services

```typescript
import { AIService } from './ai/ai.service';

@Injectable()
export class UserService {
  constructor(private aiService: AIService) {}

  async generateWelcomeMessage(userName: string): Promise<string> {
    return this.aiService.generateText(
      `Generate a personalized welcome message for ${userName}`
    );
  }
}
```

### In Controllers

```typescript
import { AIService } from './ai/ai.service';

@Controller('users')
export class UserController {
  constructor(private aiService: AIService) {}

  @Post('generate-profile-summary')
  async generateSummary(@Body() body: { bio: string }) {
    return this.aiService.analyzeContent(body.bio, 'summary');
  }
}
```

## Error Handling

```typescript
try {
  const result = await this.aiService.generateText(prompt);
  return { success: true, data: result };
} catch (error) {
  this.logger.error(`AI Error: ${error.message}`);
  return { success: false, error: error.message };
}
```

## Performance Optimization

- Cache frequently generated content
- Use appropriate token limits
- Implement rate limiting for production
- Monitor API usage and costs

## Security Considerations

1. **API Key Protection**: Never expose API key in frontend
2. **Input Validation**: Validate all user inputs
3. **Rate Limiting**: Implement rate limits
4. **Content Moderation**: Moderate generated content
5. **Authentication**: Protect AI endpoints with JWT

## Troubleshooting

### Issue: "GOOGLE_AI_API_KEY is not set"
- **Solution**: Add API key to `.env` file

### Issue: "Chat session not found"
- **Solution**: Ensure session ID matches the one started

### Issue: "Max tokens exceeded"
- **Solution**: Reduce `maxOutputTokens` in request

### Issue: "Rate limit exceeded"
- **Solution**: Implement request throttling

## Best Practices

1. **Use appropriate temperature values**
   - 0.7: Balanced creativity and consistency
   - 0.5: More deterministic
   - 1.0: More creative

2. **Set reasonable token limits**
   - Keep tokens as low as needed
   - Monitor costs
   - Cache results when possible

3. **Error handling**
   - Always wrap AI calls in try-catch
   - Log errors properly
   - Provide fallbacks

4. **Session management**
   - Clean up sessions after use
   - Implement session timeout
   - Track session duration

## API Response Format

All AI endpoints follow this response format:

```json
{
  "success": true,
  "data": "Generated content here",
  "timestamp": "2026-05-31T09:00:00.000Z"
}
```

## Support

For issues or questions:
1. Check this documentation
2. Review code examples
3. Check Google AI Studio documentation
4. Open GitHub issue
