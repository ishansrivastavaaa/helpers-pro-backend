import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AIConfigService } from './ai.config';
import { AIService } from './ai.service';
import { AIController } from './ai.controller';

@Module({
  imports: [ConfigModule],
  providers: [AIConfigService, AIService],
  controllers: [AIController],
  exports: [AIService, AIConfigService],
})
export class AIModule {}
