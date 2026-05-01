import { AiService } from './ai.service';
export declare class AiController {
    private aiService;
    constructor(aiService: AiService);
    generateReply(body: {
        message: string;
        conversationId: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
