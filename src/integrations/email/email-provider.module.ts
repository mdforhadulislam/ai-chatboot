import { Module } from '@nestjs/common';
import { ResendService } from './resend.service';
import { OutboundEmailProviderService } from './outbound-email-provider.service';
import { InboundEmailParserService } from './inbound-email-parser.service';

@Module({
  providers: [ResendService, OutboundEmailProviderService, InboundEmailParserService],
  exports: [ResendService, OutboundEmailProviderService, InboundEmailParserService],
})
export class EmailProviderModule {}