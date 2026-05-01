import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class BusinessSettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings(userId: string) {
    return this.prisma.businessSettings.findUnique({ where: { userId } });
  }

  async updateSettings(userId: string, data: any) {
    return this.prisma.businessSettings.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });
  }
}