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
var WhatsAppWebhookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppWebhookService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const whatsapp_send_service_1 = require("../../integrations/whatsapp/whatsapp-send.service");
const customers_service_1 = require("../customers/customers.service");
const conversations_service_1 = require("../conversations/conversations.service");
const messages_service_1 = require("../messages/messages.service");
const ai_service_1 = require("../ai/ai.service");
const prisma_service_1 = require("../../database/prisma.service");
let WhatsAppWebhookService = WhatsAppWebhookService_1 = class WhatsAppWebhookService {
    constructor(configService, whatsappSendService, customersService, conversationsService, messagesService, aiService, prisma) {
        this.configService = configService;
        this.whatsappSendService = whatsappSendService;
        this.customersService = customersService;
        this.conversationsService = conversationsService;
        this.messagesService = messagesService;
        this.aiService = aiService;
        this.prisma = prisma;
        this.logger = new common_1.Logger(WhatsAppWebhookService_1.name);
    }
    verify(req) {
        const mode = req.query?.['hub.mode'];
        const token = req.query?.['hub.verify_token'];
        const challenge = req.query?.['hub.challenge'];
        const verifyToken = this.configService.get('WHATSAPP_VERIFY_TOKEN');
        if (mode === 'subscribe' && token === verifyToken) {
            return challenge;
        }
        return 'Verification failed';
    }
    async handleMessage(payload) {
        try {
            const entry = payload.entry?.[0];
            const changes = entry?.changes?.[0];
            const message = changes?.value?.messages?.[0];
            if (!message) {
                this.logger.debug('No message found in payload');
                return;
            }
            const from = message.from;
            const text = message.text?.body || message.interactive?.button_reply?.title || '';
            const messageId = message.id;
            let customer = await this.customersService.findByChannelIdentifier('whatsapp', from);
            if (!customer) {
                customer = await this.customersService.create({
                    phone: from,
                    channel: 'whatsapp',
                    name: `WhatsApp User ${from.slice(-4)}`,
                });
            }
            const conversation = await this.conversationsService.findOrCreate(customer.id, 'whatsapp');
            await this.messagesService.create(conversation.id, text, 'inbound', 'whatsapp', from, {
                messageId,
                timestamp: message.timestamp,
            });
            await this.conversationsService.updateLastMessage(conversation.id, text);
            const reply = await this.aiService.generateReply(text, conversation.id);
            await this.whatsappSendService.sendMessage(from, reply);
            await this.messagesService.create(conversation.id, reply, 'outbound', 'whatsapp', 'ai-bot', {
                replyTo: messageId,
            });
            this.logger.log(`Processed WhatsApp message from ${from}`);
        }
        catch (error) {
            this.logger.error('Error handling WhatsApp message', error);
        }
    }
};
exports.WhatsAppWebhookService = WhatsAppWebhookService;
exports.WhatsAppWebhookService = WhatsAppWebhookService = WhatsAppWebhookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        whatsapp_send_service_1.WhatsAppSendService,
        customers_service_1.CustomersService,
        conversations_service_1.ConversationsService,
        messages_service_1.MessagesService,
        ai_service_1.AiService,
        prisma_service_1.PrismaService])
], WhatsAppWebhookService);
//# sourceMappingURL=whatsapp-webhook.controller.js.map