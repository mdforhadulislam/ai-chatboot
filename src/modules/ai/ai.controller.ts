import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { successResponse } from '../../common/utils/response.util';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('generate-reply')
  async generateReply(@Body() body: { message: string; conversationId: string }) {
    const reply = await this.aiService.generateReply(body.message, body.conversationId);
    return successResponse({ reply });
  }
}