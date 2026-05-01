import { ConfigService } from '@nestjs/config';
import { MetaSendService } from '../../integrations/meta/meta-send.service';
import { CustomersService } from '../customers/customers.service';
import { ConversationsService } from '../conversations/conversations.service';
import { MessagesService } from '../messages/messages.service';
import { AiService } from '../ai/ai.service';
export declare class MetaWebhookService {
    private configService;
    private metaSendService;
    private customersService;
    private conversationsService;
    private messagesService;
    private aiService;
    constructor(configService: ConfigService, metaSendService: MetaSendService, customersService: CustomersService, conversationsService: ConversationsService, messagesService: MessagesService, aiService: AiService);
    verify(req: any): any;
    handleMessage(payload: any): Promise<void>;
}
