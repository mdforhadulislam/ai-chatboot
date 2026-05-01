import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class KnowledgeBaseService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string) {
    const where: any = { isActive: true };
    if (category) {
      where.category = category;
    }
    return this.prisma.knowledgeBase.findMany({
      where,
      orderBy: { priority: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.knowledgeBase.findUnique({
      where: { id },
    });
  }

  async create(dto: any) {
    return this.prisma.knowledgeBase.create({
      data: dto,
    });
  }

  async update(id: string, dto: any) {
    return this.prisma.knowledgeBase.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.knowledgeBase.delete({
      where: { id },
    });
  }
}
