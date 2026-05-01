import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async create(customerId: string, channel: string) {
    return this.prisma.conversation.create({
      data: { customerId, channel },
      include: { customer: true, messages: true },
    });
  }

  async findAll(channel?: string, status?: string, agentId?: string, page = 1, limit = 20) {
    const where: any = {};
    if (channel) where.channel = channel;
    if (status) where.status = status;
    if (agentId) where.assignedTo = agentId;

    const skip = (page - 1) * limit;
    const [conversations, total] = await Promise.all([
      this.prisma.conversation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: { customer: true, messages: { take: 1, orderBy: { createdAt: 'desc' } } },
      }),
      this.prisma.conversation.count({ where }),
    ]);

    return {
      data: conversations,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id },
      include: { customer: true, messages: { orderBy: { createdAt: 'asc' } } },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.conversation.update({
      where: { id },
      data: { status },
    });
  }

  async findOrCreate(customerId: string, channel: string) {
    const existing = await this.prisma.conversation.findFirst({
      where: { customerId, channel, status: 'open' },
      orderBy: { createdAt: 'desc' },
    });

    if (existing) return existing;

    return this.create(customerId, channel);
  }

  async updateLastMessage(conversationId: string, message: string) {
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessage: message },
    });
  }

  async assignAgent(conversationId: string, agentId: string) {
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: { assignedTo: agentId, status: 'assigned' },
      include: { customer: true, assignedAgent: true },
    });
  }

  async requestHandoff(conversationId: string, reason?: string) {
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: {
        handoffTo: 'human',
        status: 'pending_handoff',
        messages: {
          create: {
            content: `Handoff requested${reason ? ': ' + reason : ''}`,
            direction: 'system',
            channel: 'system',
          },
        },
      },
      include: { customer: true, messages: true },
    });
  }

  async getConversationsByAgent(agentId: string) {
    return this.prisma.conversation.findMany({
      where: { assignedTo: agentId },
      orderBy: { updatedAt: 'desc' },
      include: { customer: true, messages: { take: 1, orderBy: { createdAt: 'desc' } } },
    });
  }
}