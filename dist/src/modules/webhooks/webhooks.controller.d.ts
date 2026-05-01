import { MetaWebhookService } from './meta-webhook.controller';
import { EmailWebhookService } from './email-webhook.controller';
import { WhatsAppWebhookService } from './whatsapp-webhook.controller';
export declare class WebhooksController {
    private metaWebhookService;
    private whatsappWebhookService;
    private emailWebhookService;
    constructor(metaWebhookService: MetaWebhookService, whatsappWebhookService: WhatsAppWebhookService, emailWebhookService: EmailWebhookService);
    verifyMeta(query: any): any;
    handleMeta(payload: any): Promise<string>;
    verifyWhatsApp(query: any): any;
    handleWhatsApp(payload: any): Promise<string>;
    handleEmailInbound(payload: any): Promise<{
        status: string;
    }>;
}
