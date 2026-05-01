import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { successResponse } from '../../common/utils/response.util';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('conversation/:conversationId')
  async findByConversation(@Param('conversationId') conversationId: string) {
    const data = await this.messagesService.findByConversation(conversationId);
    return successResponse(data);
  }
}