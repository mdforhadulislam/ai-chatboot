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
exports.MetaWebhookService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const meta_send_service_1 = require("../../integrations/meta/meta-send.service");
const customers_service_1 = require("../customers/customers.service");
const conversations_service_1 = require("../conversations/conversations.service");
const messages_service_1 = require("../messages/messages.service");
const ai_service_1 = require("../ai/ai.service");
let MetaWebhookService = class MetaWebhookService {
    constructor(configService, metaSendService, customersService, conversationsService, messagesService, aiService) {
        this.configService = configService;
        this.metaSendService = metaSendService;
        this.customersService = customersService;
        this.conversationsService = conversationsService;
        this.messagesService = messagesService;
        this.aiService = aiService;
    }
    verify(req) {
        const mode = req.query?.['hub.mode'];
        const token = req.query?.['hub.verify_token'];
        const challenge = req.query?.['hub.challenge'];
        const verifyToken = this.configService.get('META_VERIFY_TOKEN');
        if (mode === 'subscribe' && token === verifyToken) {
            return challenge;
        }
        return 'Verification failed';
    }
    async handleMessage(payload) {
        try {
            const entry = payload.entry?.[0];
            const changes = entry?.changes?.[0];
            const message = changes?.value?.messaging?.[0];
            if (!message) {
                return;
            }
            const from = message.sender?.id;
            const text = message.message?.text || '';
            const messageId = message.message?.mid;
            let customer = await this.customersService.findByChannelIdentifier('facebook', from);
            if (!customer) {
                customer = await this.customersService.create({
                    channel: 'facebook',
                    name: `Facebook User ${from.slice(-4)}`,
                });
            }
            await this.customersService.update(customer.id, { facebookId: from });
            const conversation = await this.conversationsService.findOrCreate(customer.id, 'facebook');
            await this.messagesService.create(conversation.id, text, 'inbound', 'facebook', from, {
                messageId,
            });
            await this.conversationsService.updateLastMessage(conversation.id, text);
            const reply = await this.aiService.generateReply(text, conversation.id);
            await this.metaSendService.sendMessage(from, reply);
            await this.messagesService.create(conversation.id, reply, 'outbound', 'facebook', 'ai-bot', {
                replyTo: messageId,
            });
        }
        catch (error) {
            console.error('Error handling Meta webhook:', error);
        }
    }
};
exports.MetaWebhookService = MetaWebhookService;
exports.MetaWebhookService = MetaWebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        meta_send_service_1.MetaSendService,
        customers_service_1.CustomersService,
        conversations_service_1.ConversationsService,
        messages_service_1.MessagesService,
        ai_service_1.AiService])
], MetaWebhookService);
//# sourceMappingURL=meta-webhook.controller.js.map