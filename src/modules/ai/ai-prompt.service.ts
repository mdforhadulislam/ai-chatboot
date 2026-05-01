import { Injectable } from '@nestjs/common';
import { AiService } from './ai.service';

@Injectable()
export class AiPromptService {
  constructor(private aiService: AiService) {}

  async generatePrompt(message: string, conversationId: string) {
    return this.aiService.generateReply(message, conversationId);
  }
}