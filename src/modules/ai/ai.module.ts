import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { AiPromptService } from './ai-prompt.service';

@Module({
  controllers: [AiController],
  providers: [AiService, AiPromptService],
  exports: [AiService],
})
export class AiModule {}