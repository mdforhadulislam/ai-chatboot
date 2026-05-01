import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { MetaWebhookService } from './meta-webhook.controller';
import { WhatsAppWebhookService } from './whatsapp-webhook.controller';
import { EmailWebhookService } from './email-webhook.controller';
import { CustomersModule } from '../customers/customers.module';
import { ConversationsModule } from '../conversations/conversations.module';
import { MessagesModule } from '../messages/messages.module';
import { AiModule } from '../ai/ai.module';
import { MetaModule } from '../../integrations/meta/meta.module';
import { WhatsAppModule } from '../../integrations/whatsapp/whatsapp.module';
import { EmailProviderModule } from '../../integrations/email/email-provider.module';

@Module({
  imports: [CustomersModule, ConversationsModule, MessagesModule, AiModule, MetaModule, WhatsAppModule, EmailProviderModule],
  controllers: [WebhooksController],
  providers: [MetaWebhookService, WhatsAppWebhookService, EmailWebhookService],
})
export class WebhooksModule {}