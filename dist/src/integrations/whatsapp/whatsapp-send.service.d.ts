import { ConfigService } from '@nestjs/config';
export declare class WhatsAppSendService {
    private configService;
    constructor(configService: ConfigService);
    sendMessage(to: string, message: string): Promise<import("axios").AxiosResponse<any, any, {}>>;
}
