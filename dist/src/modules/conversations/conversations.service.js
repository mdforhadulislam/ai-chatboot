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
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let ConversationsService = class ConversationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(customerId, channel) {
        return this.prisma.conversation.create({
            data: { customerId, channel },
            include: { customer: true, messages: true },
        });
    }
    async findAll(channel, status, agentId, page = 1, limit = 20) {
        const where = {};
        if (channel)
            where.channel = channel;
        if (status)
            where.status = status;
        if (agentId)
            where.assignedTo = agentId;
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
    async findOne(id) {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id },
            include: { customer: true, messages: { orderBy: { createdAt: 'asc' } } },
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        return conversation;
    }
    async updateStatus(id, status) {
        return this.prisma.conversation.update({
            where: { id },
            data: { status },
        });
    }
    async findOrCreate(customerId, channel) {
        const existing = await this.prisma.conversation.findFirst({
            where: { customerId, channel, status: 'open' },
            orderBy: { createdAt: 'desc' },
        });
        if (existing)
            return existing;
        return this.create(customerId, channel);
    }
    async updateLastMessage(conversationId, message) {
        return this.prisma.conversation.update({
            where: { id: conversationId },
            data: { lastMessage: message },
        });
    }
    async assignAgent(conversationId, agentId) {
        return this.prisma.conversation.update({
            where: { id: conversationId },
            data: { assignedTo: agentId, status: 'assigned' },
            include: { customer: true, assignedAgent: true },
        });
    }
    async requestHandoff(conversationId, reason) {
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
    async getConversationsByAgent(agentId) {
        return this.prisma.conversation.findMany({
            where: { assignedTo: agentId },
            orderBy: { updatedAt: 'desc' },
            include: { customer: true, messages: { take: 1, orderBy: { createdAt: 'desc' } } },
        });
    }
};
exports.ConversationsService = ConversationsService;
exports.ConversationsService = ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map