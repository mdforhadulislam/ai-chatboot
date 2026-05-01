import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WhatsAppService {
  constructor(private configService: ConfigService) {}

  verifyWebhook(mode: string, token: string, challenge: string) {
    if (mode === 'subscribe' && token === this.configService.get('whatsapp.verifyToken')) {
      return challenge;
    }
    return null;
  }
}