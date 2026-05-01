import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WhatsAppSendService } from '../../integrations/whatsapp/whatsapp-send.service';
import { CustomersService } from '../customers/customers.service';
import { ConversationsService } from '../conversations/conversations.service';
import { MessagesService } from '../messages/messages.service';
import { AiService } from '../ai/ai.service';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class WhatsAppWebhookService {
  private readonly logger = new Logger(WhatsAppWebhookService.name);

  constructor(
    private configService: ConfigService,
    private whatsappSendService: WhatsAppSendService,
    private customersService: CustomersService,
    private conversationsService: ConversationsService,
    private messagesService: MessagesService,
    private aiService: AiService,
    private prisma: PrismaService,
  ) {}

  verify(req: any) {
    const mode = req.query?.['hub.mode'];
    const token = req.query?.['hub.verify_token'];
    const challenge = req.query?.['hub.challenge'];

    const verifyToken = this.configService.get<string>('WHATSAPP_VERIFY_TOKEN');

    if (mode === 'subscribe' && token === verifyToken) {
      return challenge;
    }
    return 'Verification failed';
  }

  async handleMessage(payload: any) {
    try {
      const entry = payload.entry?.[0];
      const changes = entry?.changes?.[0];
      const message = changes?.value?.messages?.[0];

      if (!message) {
        this.logger.debug('No message found in payload');
        return;
      }

      const from = message.from;
      const text = message.text?.body || message.interactive?.button_reply?.title || '';
      const messageId = message.id;

      let customer = await this.customersService.findByChannelIdentifier('whatsapp', from);
      if (!customer) {
        customer = await this.customersService.create({
          phone: from,
          channel: 'whatsapp',
          name: `WhatsApp User ${from.slice(-4)}`,
        });
      }

      const conversation = await this.conversationsService.findOrCreate(customer.id, 'whatsapp');
      await this.messagesService.create(conversation.id, text, 'inbound', 'whatsapp', from, {
        messageId,
        timestamp: message.timestamp,
      });
      await this.conversationsService.updateLastMessage(conversation.id, text);

      const reply = await this.aiService.generateReply(text, conversation.id);

      await this.whatsappSendService.sendMessage(from, reply);

      await this.messagesService.create(conversation.id, reply, 'outbound', 'whatsapp', 'ai-bot', {
        replyTo: messageId,
      });

      this.logger.log(`Processed WhatsApp message from ${from}`);
    } catch (error) {
      this.logger.error('Error handling WhatsApp message', error);
    }
  }
}

