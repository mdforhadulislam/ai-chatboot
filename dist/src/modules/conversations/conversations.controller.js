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
exports.ConversationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const conversations_service_1 = require("./conversations.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const response_util_1 = require("../../common/utils/response.util");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const assign_agent_dto_1 = require("./dto/assign-agent.dto");
let ConversationsController = class ConversationsController {
    constructor(conversationsService) {
        this.conversationsService = conversationsService;
    }
    async findAll(channel, status, page = 1, limit = 20) {
        const data = await this.conversationsService.findAll(channel, status, undefined, Number(page), Number(limit));
        return (0, response_util_1.successResponse)(data);
    }
    async getMyConversations(user) {
        const data = await this.conversationsService.getConversationsByAgent(user.id);
        return (0, response_util_1.successResponse)(data);
    }
    async findOne(id) {
        const data = await this.conversationsService.findOne(id);
        return (0, response_util_1.successResponse)(data);
    }
    async updateStatus(id, status) {
        const data = await this.conversationsService.updateStatus(id, status);
        return (0, response_util_1.successResponse)(data, 'Status updated');
    }
    async assignAgent(id, dto) {
        const data = await this.conversationsService.assignAgent(id, dto.agentId);
        return (0, response_util_1.successResponse)(data, 'Agent assigned');
    }
    async requestHandoff(id, dto) {
        const data = await this.conversationsService.requestHandoff(id, dto?.reason);
        return (0, response_util_1.successResponse)(data, 'Handoff requested');
    }
};
exports.ConversationsController = ConversationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all conversations with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'channel', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('channel')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my assigned conversations' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "getMyConversations", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get conversation by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update conversation status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)(':id/assign'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign conversation to agent' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_agent_dto_1.AssignAgentDto]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "assignAgent", null);
__decorate([
    (0, common_1.Post)(':id/handoff'),
    (0, swagger_1.ApiOperation)({ summary: 'Request handoff to human agent' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_agent_dto_1.HandoffRequestDto]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "requestHandoff", null);
exports.ConversationsController = ConversationsController = __decorate([
    (0, swagger_1.ApiTags)('conversations'),
    (0, common_1.Controller)('conversations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [conversations_service_1.ConversationsService])
], ConversationsController);
//# sourceMappingURL=conversations.controller.js.map