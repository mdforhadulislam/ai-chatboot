import { ConfigService } from '@nestjs/config';
export declare class WhatsAppService {
    private configService;
    constructor(configService: ConfigService);
    verifyWebhook(mode: string, token: string, challenge: string): string | null;
}
