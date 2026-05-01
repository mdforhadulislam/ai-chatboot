import { BusinessSettingsService } from './business-settings.service';
export declare class BusinessSettingsController {
    private settingsService;
    constructor(settingsService: BusinessSettingsService);
    getSettings(userId: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    updateSettings(userId: string, body: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
