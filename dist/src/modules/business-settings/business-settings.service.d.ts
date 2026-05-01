import { PrismaService } from '../../database/prisma.service';
export declare class BusinessSettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSettings(userId?: string): Promise<{
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
    updateSettings(userId: string, data: any): Promise<{
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
    }>;
}
