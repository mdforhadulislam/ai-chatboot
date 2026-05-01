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
exports.BusinessSettingsController = void 0;
const common_1 = require("@nestjs/common");
const business_settings_service_1 = require("./business-settings.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let BusinessSettingsController = class BusinessSettingsController {
    constructor(businessSettingsService) {
        this.businessSettingsService = businessSettingsService;
    }
    async getSettings(req) {
        const userId = req.user?.sub;
        return this.businessSettingsService.getSettings(userId);
    }
    async updateSettings(req, data) {
        const userId = req.user?.sub;
        if (!userId) {
            return { success: false, message: 'User not found' };
        }
        return this.businessSettingsService.updateSettings(userId, data);
    }
};
exports.BusinessSettingsController = BusinessSettingsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BusinessSettingsController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BusinessSettingsController.prototype, "updateSettings", null);
exports.BusinessSettingsController = BusinessSettingsController = __decorate([
    (0, common_1.Controller)('business-settings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [business_settings_service_1.BusinessSettingsService])
], BusinessSettingsController);
//# sourceMappingURL=business-settings.controller.js.map