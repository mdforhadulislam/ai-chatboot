import { ConfigService } from '@nestjs/config';
export declare class MetaSendService {
    private configService;
    constructor(configService: ConfigService);
    sendMessage(recipientId: string, message: string): Promise<import("axios").AxiosResponse<any, any, {}>>;
}
