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
  async startChat(systemPrompt?: string) {
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
    return chat;
  }

  /**
   * Send a message in an existing chat session
   */
  async sendMessage(chat: any, message: string): Promise<string> {
    try {
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
   * Analyze content and generate insights
   */
  async analyzeContent(
    content: string,
    analysisType: 'summary' | 'insights' | 'keywords' | 'custom' = 'summary',
  ): Promise<string> {
    const prompts = {
      summary: `Please provide a concise summary of the following content:\n\n${content}`,
      insights: `Analyze the following content and provide key insights:\n\n${content}`,
      keywords: `Extract the main keywords from the following content:\n\n${content}`,
      custom: content,
    };

    return this.generateText(prompts[analysisType] || prompts.summary);
  }

  /**
   * Generate code based on description
   */
  async generateCode(description: string, language: string = 'typescript'): Promise<string> {
    const prompt = `Generate ${language} code for the following requirement:\n\n${description}\n\nProvide only the code without explanations.`;
    return this.generateText(prompt);
  }

  /**
   * Transform text content (e.g., translate, rephrase, etc.)
   */
  async transformText(
    text: string,
    transformation: 'translate' | 'rephrase' | 'simplify' | 'expand',
    targetLanguage?: string,
  ): Promise<string> {
    const prompts = {
      translate: `Translate the following text to ${targetLanguage}:\n\n${text}`,
      rephrase: `Please rephrase the following text while maintaining the same meaning:\n\n${text}`,
      simplify: `Simplify the following text for easier understanding:\n\n${text}`,
      expand: `Expand on the following text with more details and examples:\n\n${text}`,
    };

    return this.generateText(prompts[transformation] || prompts.simplify);
  }

  /**
   * Answer questions about provided context
   */
  async answerQuestion(context: string, question: string): Promise<string> {
    const prompt = `Based on the following context, answer the question:\n\nContext:\n${context}\n\nQuestion: ${question}`;
    return this.generateText(prompt);
  }
}
