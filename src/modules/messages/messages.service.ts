import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(conversationId: string, content: string, direction: string, channel: string, senderId?: string, metadata?: any) {
    return this.prisma.message.create({
      data: {
        conversationId,
        content,
        direction,
        channel,
        senderId,
        metadata,
      },
    });
  }

  async findByConversation(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async updateStatus(messageId: string, status: string) {
    return this.prisma.message.update({
      where: { id: messageId },
      data: { metadata: { status } },
    });
  }
}
