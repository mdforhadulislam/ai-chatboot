import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { BusinessSettingsService } from './business-settings.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { successResponse } from '../../common/utils/response.util';

@Controller('business-settings')
@UseGuards(JwtAuthGuard)
export class BusinessSettingsController {
  constructor(private settingsService: BusinessSettingsService) {}

  @Get()
  async getSettings(@CurrentUser('id') userId: string) {
    const data = await this.settingsService.getSettings(userId);
    return successResponse(data);
  }

  @Put()
  async updateSettings(@CurrentUser('id') userId: string, @Body() body: any) {
    const data = await this.settingsService.updateSettings(userId, body);
    return successResponse(data, 'Settings updated');
  }
}