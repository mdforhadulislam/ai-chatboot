import { PrismaService } from '../../database/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getOverview(userId: string): Promise<{
        totalCustomers: number;
        totalConversations: number;
        openChats: number;
        closedChats: number;
        emailThreads: number;
    }>;
}
