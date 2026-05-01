import { ConfigService } from '@nestjs/config';
export declare class ResendService {
    private configService;
    private resend;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, html: string): Promise<{
        id: string;
    }>;
}
