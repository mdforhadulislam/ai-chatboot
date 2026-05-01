import { AiService } from './ai.service';
export declare class AiPromptService {
    private aiService;
    constructor(aiService: AiService);
    generatePrompt(message: string, conversationId: string): Promise<string>;
}
