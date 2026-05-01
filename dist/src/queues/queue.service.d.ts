import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';
export declare class QueueService {
    private readonly redis;
    private readonly logger;
    private queues;
    private workers;
    private isRedisConnected;
    constructor(redis: Redis);
    createQueue(name: string): Queue;
    addJob(queueName: string, data: any, options?: any): Promise<Job | null>;
    createWorker(queueName: string, processor: (job: Job) => Promise<any>): Worker;
    close(): Promise<void>;
}
