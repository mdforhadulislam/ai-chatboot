import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);
  private queues: Map<string, Queue> = new Map();
  private workers: Map<string, Worker> = new Map();
  private isRedisConnected = false;

  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {
    this.redis.on('connect', () => {
      this.isRedisConnected = true;
      this.logger.log('Redis connected successfully');
    });

    this.redis.on('error', (error) => {
      this.logger.error(`Redis error: ${error.message}`);
      this.isRedisConnected = false;
    });
  }

  createQueue(name: string): Queue {
    if (this.queues.has(name)) {
      return this.queues.get(name)!;
    }

    if (!this.isRedisConnected) {
      this.logger.warn(`Redis not connected. Queue ${name} may not work properly.`);
    }

    const queue = new Queue(name, {
      connection: this.redis,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    });
    this.queues.set(name, queue);
    return queue;
  }

  async addJob(queueName: string, data: any, options?: any): Promise<Job | null> {
    if (!this.isRedisConnected) {
      this.logger.error('Cannot add job: Redis not connected');
      return null;
    }

    try {
      const queue = this.createQueue(queueName);
      return await queue.add('job', data, options);
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error(`Failed to add job to queue ${queueName}: ${err.message}`);
      return null;
    }
  }

  createWorker(queueName: string, processor: (job: Job) => Promise<any>): Worker {
    if (this.workers.has(queueName)) {
      return this.workers.get(queueName)!;
    }

    if (!this.isRedisConnected) {
      this.logger.warn(`Redis not connected. Worker for ${queueName} may not work properly.`);
    }

    const worker = new Worker(queueName, processor, {
      connection: this.redis,
      autorun: true,
      concurrency: 5,
    });
    this.workers.set(queueName, worker);

    worker.on('completed', (job) => {
      this.logger.log(`Job ${job.id} completed in queue ${queueName}`);
    });

    worker.on('failed', (job, err) => {
      this.logger.error(`Job ${job?.id} failed in queue ${queueName}: ${err.message}`);
    });

    worker.on('error', (err) => {
      this.logger.error(`Worker error in queue ${queueName}: ${err.message}`);
    });

    return worker;
  }

  async close(): Promise<void> {
    for (const worker of this.workers.values()) {
      await worker.close();
    }
    for (const queue of this.queues.values()) {
      await queue.close();
    }
    if (this.isRedisConnected) {
      await this.redis.quit();
    }
  }
}

