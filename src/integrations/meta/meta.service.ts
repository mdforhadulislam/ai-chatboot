import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MetaService {
  constructor(private configService: ConfigService) {}

  verifyWebhook(mode: string, token: string, challenge: string) {
    if (mode === 'subscribe' && token === this.configService.get('meta.verifyToken')) {
      return challenge;
    }
    return null;
  }
}