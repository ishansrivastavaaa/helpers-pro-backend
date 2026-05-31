import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AIConfigService {
  private genAI: GoogleGenerativeAI;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GOOGLE_AI_API_KEY');
    if (!this.apiKey) {
      throw new Error('GOOGLE_AI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  /**
   * Get the initialized Google Generative AI instance
   */
  getGenAI(): GoogleGenerativeAI {
    return this.genAI;
  }

  /**
   * Get the default model (Gemini Pro)
   */
  getDefaultModel() {
    return this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Get vision model for image analysis
   */
  getVisionModel() {
    return this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
  }

  /**
   * Verify API key is valid
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}
