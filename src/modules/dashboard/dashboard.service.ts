import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getOverview(userId: string) {
    const [totalCustomers, totalConversations, openChats, closedChats, emailThreads] =
      await Promise.all([
        this.prisma.customer.count(),
        this.prisma.conversation.count(),
        this.prisma.conversation.count({ where: { status: 'open' } }),
        this.prisma.conversation.count({ where: { status: 'closed' } }),
        this.prisma.conversation.count({ where: { channel: 'email' } }),
      ]);

    return {
      totalCustomers,
      totalConversations,
      openChats,
      closedChats,
      emailThreads,
    };
  }
}