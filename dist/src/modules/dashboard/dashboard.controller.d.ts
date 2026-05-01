import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getOverview(userId: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
