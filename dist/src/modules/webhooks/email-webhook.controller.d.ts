import { CustomersService } from '../customers/customers.service';
import { ConversationsService } from '../conversations/conversations.service';
import { MessagesService } from '../messages/messages.service';
import { AiService } from '../ai/ai.service';
import { OutboundEmailProviderService } from '../../integrations/email/outbound-email-provider.service';
export declare class EmailWebhookService {
    private customersService;
    private conversationsService;
    private messagesService;
    private aiService;
    private outboundEmailService;
    constructor(customersService: CustomersService, conversationsService: ConversationsService, messagesService: MessagesService, aiService: AiService, outboundEmailService: OutboundEmailProviderService);
    handleInbound(payload: any): Promise<void>;
}
