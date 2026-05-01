import { OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
export declare class QueueModule implements OnModuleDestroy {
    private readonly redis;
    constructor(redis: Redis);
    onModuleDestroy(): Promise<void>;
}
