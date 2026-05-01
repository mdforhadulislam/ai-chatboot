import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class BusinessSettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings(userId?: string) {
    if (!userId) {
      // Return default settings if no userID
      return {
        businessName: '',
        businessEmail: '',
        businessPhone: '',
        address: '',
        workingHours: '',
        autoReplyEnabled: true,
        aiModel: 'gpt-4.1-mini',
        aiPrompt: '',
      };
    }
    return this.prisma.businessSettings.findFirst({
      where: { userId },
    });
  }

  async updateSettings(userId: string, data: any) {
    const existing = await this.prisma.businessSettings.findFirst({
      where: { userId },
    });

    if (existing) {
      return this.prisma.businessSettings.update({
        where: { id: existing.id },
        data,
      });
    } else {
      return this.prisma.businessSettings.create({
        data: { userId, ...data },
      });
    }
  }
}