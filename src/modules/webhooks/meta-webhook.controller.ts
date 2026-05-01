import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MetaSendService } from '../../integrations/meta/meta-send.service';
import { CustomersService } from '../customers/customers.service';
import { ConversationsService } from '../conversations/conversations.service';
import { MessagesService } from '../messages/messages.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class MetaWebhookService {
  constructor(
    private configService: ConfigService,
    private metaSendService: MetaSendService,
    private customersService: CustomersService,
    private conversationsService: ConversationsService,
    private messagesService: MessagesService,
    private aiService: AiService,
  ) {}

  verify(req: any) {
    const mode = req.query?.['hub.mode'];
    const token = req.query?.['hub.verify_token'];
    const challenge = req.query?.['hub.challenge'];

    const verifyToken = this.configService.get<string>('META_VERIFY_TOKEN');

    if (mode === 'subscribe' && token === verifyToken) {
      return challenge;
    }
    return 'Verification failed';
  }

  async handleMessage(payload: any) {
    try {
      const entry = payload.entry?.[0];
      const changes = entry?.changes?.[0];
      const message = changes?.value?.messaging?.[0];

      if (!message) {
        return;
      }

      const from = message.sender?.id;
      const text = message.message?.text || '';
      const messageId = message.message?.mid;

      let customer = await this.customersService.findByChannelIdentifier('facebook', from);
      if (!customer) {
        customer = await this.customersService.create({
          channel: 'facebook',
          name: `Facebook User ${from.slice(-4)}`,
        });
      }

      await this.customersService.update(customer.id, { facebookId: from });

      const conversation = await this.conversationsService.findOrCreate(customer.id, 'facebook');
      await this.messagesService.create(conversation.id, text, 'inbound', 'facebook', from, {
        messageId,
      });
      await this.conversationsService.updateLastMessage(conversation.id, text);

      const reply = await this.aiService.generateReply(text, conversation.id);
      await this.metaSendService.sendMessage(from, reply);
      await this.messagesService.create(conversation.id, reply, 'outbound', 'facebook', 'ai-bot', {
        replyTo: messageId,
      });
    } catch (error) {
      console.error('Error handling Meta webhook:', error);
    }
  }
}