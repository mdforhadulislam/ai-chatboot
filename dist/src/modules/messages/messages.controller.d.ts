import { MessagesService } from './messages.service';
export declare class MessagesController {
    private messagesService;
    constructor(messagesService: MessagesService);
    findByConversation(conversationId: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
