import { BusinessSettingsService } from './business-settings.service';
export declare class BusinessSettingsController {
    private businessSettingsService;
    constructor(businessSettingsService: BusinessSettingsService);
    getSettings(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string | null;
        businessEmail: string | null;
        businessPhone: string | null;
        address: string | null;
        workingHours: string | null;
        autoReplyEnabled: boolean;
        aiModel: string;
        aiPrompt: string | null;
        userId: string;
    } | {
        businessName: string;
        businessEmail: string;
        businessPhone: string;
        address: string;
        workingHours: string;
        autoReplyEnabled: boolean;
        aiModel: string;
        aiPrompt: string;
    } | null>;
    updateSettings(req: any, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string | null;
        businessEmail: string | null;
        businessPhone: string | null;
        address: string | null;
        workingHours: string | null;
        autoReplyEnabled: boolean;
        aiModel: string;
        aiPrompt: string | null;
        userId: string;
    } | {
        success: boolean;
        message: string;
    }>;
}
