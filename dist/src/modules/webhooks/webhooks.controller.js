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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const meta_webhook_controller_1 = require("./meta-webhook.controller");
const email_webhook_controller_1 = require("./email-webhook.controller");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const whatsapp_webhook_controller_1 = require("./whatsapp-webhook.controller");
let WebhooksController = class WebhooksController {
    constructor(metaWebhookService, whatsappWebhookService, emailWebhookService) {
        this.metaWebhookService = metaWebhookService;
        this.whatsappWebhookService = whatsappWebhookService;
        this.emailWebhookService = emailWebhookService;
    }
    verifyMeta(query) {
        return this.metaWebhookService.verify(query);
    }
    async handleMeta(payload) {
        await this.metaWebhookService.handleMessage(payload);
        return 'OK';
    }
    verifyWhatsApp(query) {
        return this.whatsappWebhookService.verify(query);
    }
    async handleWhatsApp(payload) {
        await this.whatsappWebhookService.handleMessage(payload);
        return 'OK';
    }
    async handleEmailInbound(payload) {
        await this.emailWebhookService.handleInbound(payload);
        return { status: 'processed' };
    }
};
exports.WebhooksController = WebhooksController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('meta'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify Meta webhook' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook verified' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "verifyMeta", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('meta'),
    (0, swagger_1.ApiOperation)({ summary: 'Handle Meta webhook' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook processed' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "handleMeta", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('whatsapp'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify WhatsApp webhook' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook verified' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "verifyWhatsApp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('whatsapp'),
    (0, swagger_1.ApiOperation)({ summary: 'Handle WhatsApp webhook' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook processed' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "handleWhatsApp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('email/inbound'),
    (0, swagger_1.ApiOperation)({ summary: 'Handle inbound email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email processed' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "handleEmailInbound", null);
exports.WebhooksController = WebhooksController = __decorate([
    (0, swagger_1.ApiTags)('webhooks'),
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [meta_webhook_controller_1.MetaWebhookService,
        whatsapp_webhook_controller_1.WhatsAppWebhookService,
        email_webhook_controller_1.EmailWebhookService])
], WebhooksController);
//# sourceMappingURL=webhooks.controller.js.map