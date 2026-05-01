import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class ResendService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(configService.get('resend.apiKey'));
  }

  async sendEmail(to: string, subject: string, html: string): Promise<{ id: string }> {
    const result = await this.resend.emails.send({
      from: this.configService.get('email.from') as string,
      to,
      subject,
      html,
    });
    return { id: result.data?.id || '' };
  }
}