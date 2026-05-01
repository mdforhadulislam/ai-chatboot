import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WhatsAppSendService {
  constructor(private configService: ConfigService) {}

  async sendMessage(to: string, message: string) {
    const url = `https://graph.facebook.com/v18.0/${this.configService.get('whatsapp.phoneNumberId')}/messages`;
    return axios.post(url, {
      messaging_product: 'whatsapp',
      to,
      text: { body: message },
    }, {
      headers: { Authorization: `Bearer ${this.configService.get('whatsapp.accessToken')}` },
    });
  }
}