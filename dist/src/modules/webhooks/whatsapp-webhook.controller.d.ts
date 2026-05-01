import { ConfigService } from '@nestjs/config';
import { WhatsAppSendService } from '../../integrations/whatsapp/whatsapp-send.service';
import { CustomersService } from '../customers/customers.service';
import { ConversationsService } from '../conversations/conversations.service';
import { MessagesService } from '../messages/messages.service';
import { AiService } from '../ai/ai.service';
import { PrismaService } from '../../database/prisma.service';
export declare class WhatsAppWebhookService {
    private configService;
    private whatsappSendService;
    private customersService;
    private conversationsService;
    private messagesService;
    private aiService;
    private prisma;
    private readonly logger;
    constructor(configService: ConfigService, whatsappSendService: WhatsAppSendService, customersService: CustomersService, conversationsService: ConversationsService, messagesService: MessagesService, aiService: AiService, prisma: PrismaService);
    verify(req: any): any;
    handleMessage(payload: any): Promise<void>;
}
