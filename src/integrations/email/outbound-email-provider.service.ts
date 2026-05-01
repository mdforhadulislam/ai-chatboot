import { Injectable } from '@nestjs/common';
import { ResendService } from './resend.service';

@Injectable()
export class OutboundEmailProviderService {
  constructor(private resendService: ResendService) {}

  async send(to: string, subject: string, body: string): Promise<{ id: string }> {
    return this.resendService.sendEmail(to, subject, body);
  }
}