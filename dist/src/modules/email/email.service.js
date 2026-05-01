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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../database/prisma.service");
const resend_1 = require("resend");
let EmailService = EmailService_1 = class EmailService {
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
        this.logger = new common_1.Logger(EmailService_1.name);
        const apiKey = this.configService.get('RESEND_API_KEY');
        if (apiKey) {
            this.resend = new resend_1.Resend(apiKey);
        }
    }
    async sendEmail(sendEmailDto) {
        const { to, subject, body, from, conversationId } = sendEmailDto;
        const fromEmail = from || this.configService.get('EMAIL_FROM') || '';
        try {
            const result = await this.resend.emails.send({
                from: fromEmail,
                to,
                subject,
                html: body,
            });
            this.logger.log(`Email sent to ${to}: ${subject}`);
            if (conversationId) {
                await this.prisma.message.create({
                    data: {
                        conversationId,
                        content: `Subject: ${subject}\n\n${body}`,
                        direction: 'outbound',
                        channel: 'email',
                        senderId: 'system',
                    },
                });
            }
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}`, error);
            throw error;
        }
    }
    async parseInboundEmail(emailData) {
        const { from, subject, text, html, messageId, references, inReplyTo } = emailData;
        let conversation = await this.findConversationByEmail(from);
        if (!conversation) {
            conversation = await this.createConversationForEmail(from, subject);
        }
        await this.prisma.message.create({
            data: {
                conversationId: conversation.id,
                content: text || this.stripHtml(html || ''),
                direction: 'inbound',
                channel: 'email',
                senderId: from,
                metadata: { messageId, references, inReplyTo, subject },
            },
        });
        this.logger.log(`Inbound email parsed from ${from}, conversation: ${conversation.id}`);
    }
    async getEmailThread(email) {
        const customer = await this.prisma.customer.findFirst({
            where: { email },
            include: {
                conversations: {
                    where: { channel: 'email' },
                    include: { messages: true },
                },
            },
        });
        return customer?.conversations || [];
    }
    async findConversationByEmail(email) {
        const customer = await this.prisma.customer.findFirst({
            where: { email },
            include: { conversations: { where: { channel: 'email' }, orderBy: { createdAt: 'desc' }, take: 1 } },
        });
        return customer?.conversations[0] || null;
    }
    async createConversationForEmail(email, subject) {
        let customer = await this.prisma.customer.findFirst({ where: { email } });
        if (!customer) {
            customer = await this.prisma.customer.create({
                data: { email, channel: 'email' },
            });
        }
        return await this.prisma.conversation.create({
            data: {
                customerId: customer.id,
                channel: 'email',
                lastMessage: subject,
            },
        });
    }
    stripHtml(html) {
        return html?.replace(/<[^>]*>/g, '') || '';
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], EmailService);
//# sourceMappingURL=email.service.js.map