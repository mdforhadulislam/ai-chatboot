import { Injectable } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { ConversationsService } from '../conversations/conversations.service';
import { MessagesService } from '../messages/messages.service';
import { AiService } from '../ai/ai.service';
import { OutboundEmailProviderService } from '../../integrations/email/outbound-email-provider.service';

@Injectable()
export class EmailWebhookService {
  constructor(
    private customersService: CustomersService,
    private conversationsService: ConversationsService,
    private messagesService: MessagesService,
    private aiService: AiService,
    private outboundEmailService: OutboundEmailProviderService,
  ) {}

  async handleInbound(payload: any) {
    const from = payload.from;
    const subject = payload.subject || '';
    const text = payload.text || '';

    let customer = await this.customersService.findByChannelIdentifier('email', from);
    if (!customer) {
      customer = await this.customersService.create({ email: from, channel: 'email' });
    }

    const conversation = await this.conversationsService.findOrCreate(customer.id, 'email');
    await this.messagesService.create(conversation.id, text, 'inbound', 'email', from);
    await this.conversationsService.updateLastMessage(conversation.id, text);

    const reply = await this.aiService.generateReply(text, conversation.id);
    await this.outboundEmailService.send(from, `Re: ${subject}`, reply);
    await this.messagesService.create(conversation.id, reply, 'outbound', 'email');
  }
}