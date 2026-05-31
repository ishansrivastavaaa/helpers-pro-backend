import { Controller, Post, Body, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { AIService } from './ai.service';

@Controller('ai')
export class AIController {
  private readonly logger = new Logger(AIController.name);

  constructor(private aiService: AIService) {}

  @Get('health')
  async healthCheck() {
    return {
      status: 'ok',
      message: 'Google AI Studio integration is active',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('generate-text')
  async generateText(@Body() body: { prompt: string; options?: any }) {
    this.logger.log(`Generating text with prompt: ${body.prompt.substring(0, 50)}...`);
    const result = await this.aiService.generateText(body.prompt, body.options);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('analyze-content')
  async analyzeContent(
    @Body() body: { content: string; type?: 'summary' | 'insights' | 'keywords' | 'sentiment' | 'custom' },
  ) {
    this.logger.log(`Analyzing content: ${body.content.substring(0, 50)}...`);
    const result = await this.aiService.analyzeContent(body.content, body.type || 'summary');
    return {
      success: true,
      analysisType: body.type || 'summary',
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('generate-code')
  async generateCode(@Body() body: { description: string; language?: string }) {
    this.logger.log(`Generating code for: ${body.description.substring(0, 50)}...`);
    const result = await this.aiService.generateCode(body.description, body.language);
    return {
      success: true,
      language: body.language || 'typescript',
      code: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('transform-text')
  async transformText(
    @Body()
    body: {
      text: string;
      transformation: 'translate' | 'rephrase' | 'simplify' | 'expand' | 'formal' | 'casual';
      targetLanguage?: string;
    },
  ) {
    this.logger.log(`Transforming text (${body.transformation}): ${body.text.substring(0, 50)}...`);
    const result = await this.aiService.transformText(
      body.text,
      body.transformation,
      body.targetLanguage,
    );
    return {
      success: true,
      transformation: body.transformation,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('answer-question')
  async answerQuestion(@Body() body: { context: string; question: string }) {
    this.logger.log(`Answering question: ${body.question}`);
    const result = await this.aiService.answerQuestion(body.context, body.question);
    return {
      success: true,
      question: body.question,
      answer: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('chat/start')
  async startChat(@Body() body: { sessionId: string; systemPrompt?: string }) {
    this.logger.log(`Starting chat session: ${body.sessionId}`);
    const result = await this.aiService.startChat(body.sessionId, body.systemPrompt);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('chat/:sessionId/send')
  async sendMessage(
    @Param('sessionId') sessionId: string,
    @Body() body: { message: string },
  ) {
    this.logger.log(`Sending message in session: ${sessionId}`);
    const result = await this.aiService.sendMessage(sessionId, body.message);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('chat/:sessionId/end')
  async endChat(@Param('sessionId') sessionId: string) {
    this.logger.log(`Ending chat session: ${sessionId}`);
    const result = await this.aiService.endChat(sessionId);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('generate-marketing')
  async generateMarketing(
    @Body() body: { topic: string; contentType?: 'email' | 'social' | 'blog' | 'ad' },
  ) {
    this.logger.log(`Generating marketing content for: ${body.topic}`);
    const result = await this.aiService.generateMarketingContent(body.topic, body.contentType);
    return {
      success: true,
      contentType: body.contentType || 'email',
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('generate-tests')
  async generateTests(
    @Body() body: { functionality: string; language?: string },
  ) {
    this.logger.log(`Generating test cases for: ${body.functionality.substring(0, 50)}...`);
    const result = await this.aiService.generateTestCases(body.functionality, body.language);
    return {
      success: true,
      language: body.language || 'typescript',
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('debug-code')
  async debugCode(@Body() body: { code: string; errorMessage: string }) {
    this.logger.log(`Debugging code...`);
    const result = await this.aiService.debugCode(body.code, body.errorMessage);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('generate-docs')
  async generateDocumentation(
    @Body() body: { code: string; title: string },
  ) {
    this.logger.log(`Generating documentation for: ${body.title}`);
    const result = await this.aiService.generateDocumentation(body.code, body.title);
    return {
      success: true,
      title: body.title,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }
}
