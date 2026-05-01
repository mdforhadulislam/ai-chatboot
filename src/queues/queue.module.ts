import { Module, Global, Inject, OnModuleDestroy } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Global()
@Module({
  providers: [
    QueueService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: (config: ConfigService) => {
        const redisUrl = config.get<string>('REDIS_URL') || 'redis://localhost:6379';

        const redis = new Redis(redisUrl, {
          maxRetriesPerRequest: 3,
          lazyConnect: true,
          enableReadyCheck: false,
          reconnectOnError: (err) => {
            const targetError = 'ECONNRESET';
            if (err.message.includes(targetError)) {
              return true;
            }
            return false;
          },
        });

        redis.on('connect', () => {
          console.log('Redis connected successfully');
        });

        redis.on('error', (error) => {
          console.error('Redis connection error:', error.message);
        });

        redis.on('reconnecting', () => {
          console.log('Redis reconnecting...');
        });

        return redis;
      },
      inject: [ConfigService],
    },
  ],
  exports: [QueueService],
})
export class QueueModule implements OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async onModuleDestroy() {
    if (this.redis) {
      await this.redis.quit();
    }
  }
}

