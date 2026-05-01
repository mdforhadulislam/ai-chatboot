import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MetaSendService {
  constructor(private configService: ConfigService) {}

  async sendMessage(recipientId: string, message: string) {
    const url = `https://graph.facebook.com/v18.0/me/messages?access_token=${this.configService.get('meta.pageAccessToken')}`;
    return axios.post(url, {
      recipient: { id: recipientId },
      message: { text: message },
    });
  }
}