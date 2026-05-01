import { Module, Provider } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from './config/configuration';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { MessagesModule } from './modules/messages/messages.module';
import { AiModule } from './modules/ai/ai.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { BusinessSettingsModule } from './modules/business-settings/business-settings.module';
import { KnowledgeBaseModule } from './modules/knowledge-base/knowledge-base.module';
import { SocketModule } from './gateways/socket.module';
import { MetaModule } from './integrations/meta/meta.module';
import { WhatsAppModule } from './integrations/whatsapp/whatsapp.module';
import { EmailProviderModule } from './integrations/email/email-provider.module';
import { UploadModule } from './modules/upload/upload.module';
import { AppController } from './modules/app.controller';
import { QueueModule } from './queues/queue.module';

const throttlerGuard: Provider = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: config.get<number>('THROTTLE_TTL') || 60,
            limit: config.get<number>('THROTTLE_LIMIT') || 100,
          },
        ],
      }),
    }),
    PrismaModule,
    AuthModule,
    DashboardModule,
    CustomersModule,
    ConversationsModule,
    MessagesModule,
    AiModule,
    WebhooksModule,
    BusinessSettingsModule,
    KnowledgeBaseModule,
    SocketModule,
    MetaModule,
    WhatsAppModule,
    EmailProviderModule,
    UploadModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [throttlerGuard],
})
export class AppModule {}