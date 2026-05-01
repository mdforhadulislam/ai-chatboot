import { Module } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';
import { WhatsAppSendService } from './whatsapp-send.service';

@Module({
  providers: [WhatsAppService, WhatsAppSendService],
  exports: [WhatsAppService, WhatsAppSendService],
})
export class WhatsAppModule {}