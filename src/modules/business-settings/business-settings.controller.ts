import { Controller, Get, Put, Post, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { BusinessSettingsService } from './business-settings.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('business-settings')
@UseGuards(JwtAuthGuard)
export class BusinessSettingsController {
  constructor(private businessSettingsService: BusinessSettingsService) {}

  @Get()
  async getSettings(@Req() req: any) {
    const userId = req.user?.sub;
    return this.businessSettingsService.getSettings(userId);
  }

  @Put()
  async updateSettings(@Req() req: any, @Body() data: any) {
    const userId = req.user?.sub;
    if (!userId) {
      return { success: false, message: 'User not found' };
    }
    return this.businessSettingsService.updateSettings(userId, data);
  }
}
