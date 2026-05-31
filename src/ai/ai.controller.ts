import { Controller, Post, Body, Get, Logger } from '@nestjs/common';
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
    @Body() body: { content: string; type?: 'summary' | 'insights' | 'keywords' | 'custom' },
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
      transformation: 'translate' | 'rephrase' | 'simplify' | 'expand';
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
}
