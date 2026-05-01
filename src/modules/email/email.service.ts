import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
import { SendEmailDto } from './dto/send-email.dto';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend!: Resend;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (apiKey) {
      this.resend = new Resend(apiKey);
    }
  }

  async sendEmail(sendEmailDto: SendEmailDto): Promise<any> {
    const { to, subject, body, from, conversationId } = sendEmailDto;
    const fromEmail = from || this.configService.get<string>('EMAIL_FROM') || '';

    try {
      const result = await this.resend.emails.send({
        from: fromEmail,
        to,
        subject,
        html: body,
      });

      this.logger.log(`Email sent to ${to}: ${subject}`);

      if (conversationId) {
        await this.prisma.message.create({
          data: {
            conversationId,
            content: `Subject: ${subject}\n\n${body}`,
            direction: 'outbound',
            channel: 'email',
            senderId: 'system',
          },
        });
      }

      return result;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
      throw error;
    }
  }

  async parseInboundEmail(emailData: any): Promise<void> {
    const { from, subject, text, html, messageId, references, inReplyTo } = emailData;

    let conversation = await this.findConversationByEmail(from);

    if (!conversation) {
      conversation = await this.createConversationForEmail(from, subject);
    }

    await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        content: text || this.stripHtml(html || ''),
        direction: 'inbound',
        channel: 'email',
        senderId: from,
        metadata: { messageId, references, inReplyTo, subject },
      },
    });

    this.logger.log(`Inbound email parsed from ${from}, conversation: ${conversation.id}`);
  }

  async getEmailThread(email: string): Promise<any> {
    const customer = await this.prisma.customer.findFirst({
      where: { email },
      include: {
        conversations: {
          where: { channel: 'email' },
          include: { messages: true },
        },
      },
    });

    return customer?.conversations || [];
  }

  private async findConversationByEmail(email: string): Promise<any> {
    const customer = await this.prisma.customer.findFirst({
      where: { email },
      include: { conversations: { where: { channel: 'email' }, orderBy: { createdAt: 'desc' }, take: 1 } },
    });

    return customer?.conversations[0] || null;
  }

  private async createConversationForEmail(email: string, subject: string): Promise<any> {
    let customer = await this.prisma.customer.findFirst({ where: { email } });

    if (!customer) {
      customer = await this.prisma.customer.create({
        data: { email, channel: 'email' },
      });
    }

    return await this.prisma.conversation.create({
      data: {
        customerId: customer.id,
        channel: 'email',
        lastMessage: subject,
      },
    });
  }

  private stripHtml(html: string): string {
    return html?.replace(/<[^>]*>/g, '') || '';
  }
}

