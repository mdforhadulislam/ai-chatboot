import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: dto,
    });
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { conversations: true },
      }),
      this.prisma.customer.count(),
    ]);

    return {
      data: customers,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: { conversations: { include: { messages: true } } },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.prisma.customer.delete({ where: { id } });
    return { message: 'Customer deleted successfully' };
  }

  async findByChannelIdentifier(channel: string, identifier: string) {
    const where: any = { channel };
    if (channel === 'messenger') where.facebookId = identifier;
    else if (channel === 'instagram') where.instagramId = identifier;
    else if (channel === 'whatsapp') where.whatsappId = identifier;
    else if (channel === 'email') where.email = identifier;

    return this.prisma.customer.findFirst({ where });
  }
}