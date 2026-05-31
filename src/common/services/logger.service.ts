/**
 * Logger Service
 * Custom logger for the application
 */
import { Injectable, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger = new NestLogger();

  log(message: string, context?: string) {
    this.logger.log(`[${context || 'APP'}] ${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(`[${context || 'APP'}] ${message}`, trace);
  }

  warn(message: string, context?: string) {
    this.logger.warn(`[${context || 'APP'}] ${message}`);
  }

  debug(message: string, context?: string) {
    this.logger.debug(`[${context || 'APP'}] ${message}`);
  }
}
