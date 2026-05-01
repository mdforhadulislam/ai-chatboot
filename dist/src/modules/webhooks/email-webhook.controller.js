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
exports.EmailWebhookService = void 0;
const common_1 = require("@nestjs/common");
const customers_service_1 = require("../customers/customers.service");
const conversations_service_1 = require("../conversations/conversations.service");
const messages_service_1 = require("../messages/messages.service");
const ai_service_1 = require("../ai/ai.service");
const outbound_email_provider_service_1 = require("../../integrations/email/outbound-email-provider.service");
let EmailWebhookService = class EmailWebhookService {
    constructor(customersService, conversationsService, messagesService, aiService, outboundEmailService) {
        this.customersService = customersService;
        this.conversationsService = conversationsService;
        this.messagesService = messagesService;
        this.aiService = aiService;
        this.outboundEmailService = outboundEmailService;
    }
    async handleInbound(payload) {
        const from = payload.from;
        const subject = payload.subject || '';
        const text = payload.text || '';
        let customer = await this.customersService.findByChannelIdentifier('email', from);
        if (!customer) {
            customer = await this.customersService.create({ email: from, channel: 'email' });
        }
        const conversation = await this.conversationsService.findOrCreate(customer.id, 'email');
        await this.messagesService.create(conversation.id, text, 'inbound', 'email', from);
        await this.conversationsService.updateLastMessage(conversation.id, text);
        const reply = await this.aiService.generateReply(text, conversation.id);
        await this.outboundEmailService.send(from, `Re: ${subject}`, reply);
        await this.messagesService.create(conversation.id, reply, 'outbound', 'email');
    }
};
exports.EmailWebhookService = EmailWebhookService;
exports.EmailWebhookService = EmailWebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customers_service_1.CustomersService,
        conversations_service_1.ConversationsService,
        messages_service_1.MessagesService,
        ai_service_1.AiService,
        outbound_email_provider_service_1.OutboundEmailProviderService])
], EmailWebhookService);
//# sourceMappingURL=email-webhook.controller.js.map