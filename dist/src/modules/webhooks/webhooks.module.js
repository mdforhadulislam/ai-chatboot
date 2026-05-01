"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksModule = void 0;
const common_1 = require("@nestjs/common");
const webhooks_controller_1 = require("./webhooks.controller");
const meta_webhook_controller_1 = require("./meta-webhook.controller");
const whatsapp_webhook_controller_1 = require("./whatsapp-webhook.controller");
const email_webhook_controller_1 = require("./email-webhook.controller");
const customers_module_1 = require("../customers/customers.module");
const conversations_module_1 = require("../conversations/conversations.module");
const messages_module_1 = require("../messages/messages.module");
const ai_module_1 = require("../ai/ai.module");
const meta_module_1 = require("../../integrations/meta/meta.module");
const whatsapp_module_1 = require("../../integrations/whatsapp/whatsapp.module");
const email_provider_module_1 = require("../../integrations/email/email-provider.module");
let WebhooksModule = class WebhooksModule {
};
exports.WebhooksModule = WebhooksModule;
exports.WebhooksModule = WebhooksModule = __decorate([
    (0, common_1.Module)({
        imports: [customers_module_1.CustomersModule, conversations_module_1.ConversationsModule, messages_module_1.MessagesModule, ai_module_1.AiModule, meta_module_1.MetaModule, whatsapp_module_1.WhatsAppModule, email_provider_module_1.EmailProviderModule],
        controllers: [webhooks_controller_1.WebhooksController],
        providers: [meta_webhook_controller_1.MetaWebhookService, whatsapp_webhook_controller_1.WhatsAppWebhookService, email_webhook_controller_1.EmailWebhookService],
    })
], WebhooksModule);
//# sourceMappingURL=webhooks.module.js.map