import { Injectable, Logger } from '@nestjs/common';
import { AIConfigService } from './ai.config';

export interface AIGenerationOptions {
  temperature?: number;
  topP?: number;
  topK?: number;
  maxOutputTokens?: number;
}

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private chatSessions: Map<string, any> = new Map();

  constructor(private aiConfigService: AIConfigService) {}

  /**
   * Generate text content using Google AI Studio
   */
  async generateText(
    prompt: string,
    options?: AIGenerationOptions,
  ): Promise<string> {
    try {
      const model = this.aiConfigService.getDefaultModel();
      const generationConfig = {
        temperature: options?.temperature || 0.7,
        topP: options?.topP || 0.9,
        topK: options?.topK || 40,
        maxOutputTokens: options?.maxOutputTokens || 1024,
      };

      const result = await model.generateContent({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig,
      });

      const response = result.response;
      const text = response.text();
      this.logger.debug(`Generated text response: ${text.substring(0, 100)}...`);
      return text;
    } catch (error) {
      this.logger.error(`Error generating text: ${error.message}`);
      throw error;
    }
  }

  /**
   * Start a multi-turn conversation with AI Studio
   */
  async startChat(sessionId: string, systemPrompt?: string) {
    try {
      const model = this.aiConfigService.getDefaultModel();
      const chat = model.startChat({
        history: systemPrompt ? [{ role: 'user', parts: [{ text: systemPrompt }] }] : [],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 1024,
        },
      });
      this.chatSessions.set(sessionId, chat);
      this.logger.log(`Chat session ${sessionId} started`);
      return { sessionId, status: 'active' };
    } catch (error) {
      this.logger.error(`Error starting chat: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send a message in an existing chat session
   */
  async sendMessage(sessionId: string, message: string): Promise<string> {
    try {
      const chat = this.chatSessions.get(sessionId);
      if (!chat) {
        throw new Error(`Chat session ${sessionId} not found`);
      }

      const result = await chat.sendMessage(message);
      const response = result.response;
      const text = response.text();
      this.logger.debug(`Chat response: ${text.substring(0, 100)}...`);
      return text;
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      throw error;
    }
  }

  /**
   * End a chat session
   */
  async endChat(sessionId: string): Promise<{ sessionId: string; status: string }> {
    this.chatSessions.delete(sessionId);
    this.logger.log(`Chat session ${sessionId} ended`);
    return { sessionId, status: 'closed' };
  }

  /**
   * Analyze content and generate insights
   */
  async analyzeContent(
    content: string,
    analysisType: 'summary' | 'insights' | 'keywords' | 'sentiment' | 'custom' = 'summary',
  ): Promise<string> {
    const prompts = {
      summary: `Please provide a concise summary of the following content:\n\n${content}`,
      insights: `Analyze the following content and provide key insights and actionable recommendations:\n\n${content}`,
      keywords: `Extract the main keywords from the following content and explain their importance:\n\n${content}`,
      sentiment: `Analyze the sentiment of the following content and explain the underlying emotions:\n\n${content}`,
      custom: content,
    };

    return this.generateText(prompts[analysisType] || prompts.summary);
  }

  /**
   * Generate code based on description
   */
  async generateCode(description: string, language: string = 'typescript'): Promise<string> {
    const prompt = `Generate well-documented, production-ready ${language} code for the following requirement:\n\n${description}\n\nInclude error handling, type definitions, and comments.`;
    return this.generateText(prompt, { maxOutputTokens: 2048 });
  }

  /**
   * Transform text content
   */
  async transformText(
    text: string,
    transformation: 'translate' | 'rephrase' | 'simplify' | 'expand' | 'formal' | 'casual',
    targetLanguage?: string,
  ): Promise<string> {
    const prompts = {
      translate: `Translate the following text to ${targetLanguage}:\n\n${text}`,
      rephrase: `Please rephrase the following text while maintaining the same meaning:\n\n${text}`,
      simplify: `Simplify the following text for easier understanding by a general audience:\n\n${text}`,
      expand: `Expand on the following text with more details, examples, and explanations:\n\n${text}`,
      formal: `Convert the following text to formal, professional language:\n\n${text}`,
      casual: `Convert the following text to casual, friendly language:\n\n${text}`,
    };

    return this.generateText(prompts[transformation] || prompts.simplify);
  }

  /**
   * Answer questions about provided context
   */
  async answerQuestion(context: string, question: string): Promise<string> {
    const prompt = `Based on the following context, answer the question comprehensively:\n\nContext:\n${context}\n\nQuestion: ${question}`;
    return this.generateText(prompt);
  }

  /**
   * Generate marketing content
   */
  async generateMarketingContent(
    topic: string,
    contentType: 'email' | 'social' | 'blog' | 'ad' = 'email',
  ): Promise<string> {
    const prompts = {
      email: `Create a professional marketing email about ${topic}. Include subject line, greeting, compelling body, and CTA.`,
      social: `Create 3 engaging social media posts about ${topic}. Make them varied and shareable.`,
      blog: `Write an engaging blog post introduction about ${topic}. Make it SEO-friendly and compelling.`,
      ad: `Create 5 powerful ad copy variations about ${topic}. Each should be under 100 characters.`,
    };

    return this.generateText(prompts[contentType], { maxOutputTokens: 1024 });
  }

  /**
   * Generate test cases
   */
  async generateTestCases(functionality: string, language: string = 'typescript'): Promise<string> {
    const prompt = `Generate comprehensive unit test cases for the following functionality in ${language}:\n\n${functionality}\n\nInclude positive, negative, and edge case tests.`;
    return this.generateText(prompt, { maxOutputTokens: 2048 });
  }

  /**
   * Debug and fix code
   */
  async debugCode(code: string, errorMessage: string): Promise<string> {
    const prompt = `Debug the following ${code.length > 500 ? 'complex' : 'simple'} code issue:\n\nCode:\n${code}\n\nError: ${errorMessage}\n\nProvide the fixed code and explanation of the issue.`;
    return this.generateText(prompt, { maxOutputTokens: 2048 });
  }

  /**
   * Generate documentation
   */
  async generateDocumentation(code: string, title: string): Promise<string> {
    const prompt = `Generate comprehensive documentation for the following code. Title: ${title}\n\nCode:\n${code}\n\nInclude: overview, parameters, return values, usage examples, and edge cases.`;
    return this.generateText(prompt, { maxOutputTokens: 2048 });
  }
}
