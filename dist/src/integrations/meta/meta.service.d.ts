import { ConfigService } from '@nestjs/config';
export declare class MetaService {
    private configService;
    constructor(configService: ConfigService);
    verifyWebhook(mode: string, token: string, challenge: string): string | null;
}
