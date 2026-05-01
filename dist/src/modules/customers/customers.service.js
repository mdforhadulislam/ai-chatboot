"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let CustomersService = class CustomersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async findOne(id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: { conversations: { include: { messages: true } } },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        return customer;
    }
    async update(id, dto) {
        return this.prisma.customer.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        await this.prisma.customer.delete({ where: { id } });
        return { message: 'Customer deleted successfully' };
    }
    async findByChannelIdentifier(channel, identifier) {
        const where = { channel };
        if (channel === 'messenger')
            where.facebookId = identifier;
        else if (channel === 'instagram')
            where.instagramId = identifier;
        else if (channel === 'whatsapp')
            where.whatsappId = identifier;
        else if (channel === 'email')
            where.email = identifier;
        return this.prisma.customer.findFirst({ where });
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map