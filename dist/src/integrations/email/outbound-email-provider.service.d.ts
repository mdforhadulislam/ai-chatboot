import { ResendService } from './resend.service';
export declare class OutboundEmailProviderService {
    private resendService;
    constructor(resendService: ResendService);
    send(to: string, subject: string, body: string): Promise<{
        id: string;
    }>;
}
