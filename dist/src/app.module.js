"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const configuration_1 = require("./config/configuration");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./database/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const customers_module_1 = require("./modules/customers/customers.module");
const conversations_module_1 = require("./modules/conversations/conversations.module");
const messages_module_1 = require("./modules/messages/messages.module");
const ai_module_1 = require("./modules/ai/ai.module");
const webhooks_module_1 = require("./modules/webhooks/webhooks.module");
const business_settings_module_1 = require("./modules/business-settings/business-settings.module");
const knowledge_base_module_1 = require("./modules/knowledge-base/knowledge-base.module");
const socket_module_1 = require("./gateways/socket.module");
const meta_module_1 = require("./integrations/meta/meta.module");
const whatsapp_module_1 = require("./integrations/whatsapp/whatsapp.module");
const email_provider_module_1 = require("./integrations/email/email-provider.module");
const upload_module_1 = require("./modules/upload/upload.module");
const app_controller_1 = require("./modules/app.controller");
const queue_module_1 = require("./queues/queue.module");
const throttlerGuard = {
    provide: core_1.APP_GUARD,
    useClass: throttler_1.ThrottlerGuard,
};
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configuration_1.ConfigModule,
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [configuration_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    throttlers: [
                        {
                            ttl: config.get('THROTTLE_TTL') || 60,
                            limit: config.get('THROTTLE_LIMIT') || 100,
                        },
                    ],
                }),
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            dashboard_module_1.DashboardModule,
            customers_module_1.CustomersModule,
            conversations_module_1.ConversationsModule,
            messages_module_1.MessagesModule,
            ai_module_1.AiModule,
            webhooks_module_1.WebhooksModule,
            business_settings_module_1.BusinessSettingsModule,
            knowledge_base_module_1.KnowledgeBaseModule,
            socket_module_1.SocketModule,
            meta_module_1.MetaModule,
            whatsapp_module_1.WhatsAppModule,
            email_provider_module_1.EmailProviderModule,
            upload_module_1.UploadModule,
            queue_module_1.QueueModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [throttlerGuard],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map