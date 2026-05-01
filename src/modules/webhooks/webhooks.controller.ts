import { Controller, Get, Post, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiExcludeEndpoint } from '@nestjs/swagger';
import { MetaWebhookService } from './meta-webhook.controller';
import { EmailWebhookService } from './email-webhook.controller';
import { Public } from '../../common/decorators/public.decorator';
import { WhatsAppWebhookService } from './whatsapp-webhook.controller';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(
    private metaWebhookService: MetaWebhookService,
    private whatsappWebhookService: WhatsAppWebhookService,
    private emailWebhookService: EmailWebhookService,
  ) {}

  @Public()
  @Get('meta')
  @ApiOperation({ summary: 'Verify Meta webhook' })
  @ApiResponse({ status: 200, description: 'Webhook verified' })
  verifyMeta(@Query() query: any) {
    return this.metaWebhookService.verify(query);
  }

  @Public()
  @Post('meta')
  @ApiOperation({ summary: 'Handle Meta webhook' })
  @ApiResponse({ status: 200, description: 'Webhook processed' })
  async handleMeta(@Body() payload: any) {
    await this.metaWebhookService.handleMessage(payload);
    return 'OK';
  }

  @Public()
  @Get('whatsapp')
  @ApiOperation({ summary: 'Verify WhatsApp webhook' })
  @ApiResponse({ status: 200, description: 'Webhook verified' })
  verifyWhatsApp(@Query() query: any) {
    return this.whatsappWebhookService.verify(query);
  }

  @Public()
  @Post('whatsapp')
  @ApiOperation({ summary: 'Handle WhatsApp webhook' })
  @ApiResponse({ status: 200, description: 'Webhook processed' })
  async handleWhatsApp(@Body() payload: any) {
    await this.whatsappWebhookService.handleMessage(payload);
    return 'OK';
  }

  @Public()
  @Post('email/inbound')
  @ApiOperation({ summary: 'Handle inbound email' })
  @ApiResponse({ status: 200, description: 'Email processed' })
  async handleEmailInbound(@Body() payload: any) {
    await this.emailWebhookService.handleInbound(payload);
    return { status: 'processed' };
  }
}
