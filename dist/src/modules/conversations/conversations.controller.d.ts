import { ConversationsService } from './conversations.service';
import { AssignAgentDto, HandoffRequestDto } from './dto/assign-agent.dto';
export declare class ConversationsController {
    private conversationsService;
    constructor(conversationsService: ConversationsService);
    findAll(channel?: string, status?: string, page?: number, limit?: number): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getMyConversations(user: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    updateStatus(id: string, status: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    assignAgent(id: string, dto: AssignAgentDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    requestHandoff(id: string, dto?: HandoffRequestDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
