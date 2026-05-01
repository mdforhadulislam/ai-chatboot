"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var QueueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
let QueueService = QueueService_1 = class QueueService {
    constructor(redis) {
        this.redis = redis;
        this.logger = new common_1.Logger(QueueService_1.name);
        this.queues = new Map();
        this.workers = new Map();
        this.isRedisConnected = false;
        this.redis.on('connect', () => {
            this.isRedisConnected = true;
            this.logger.log('Redis connected successfully');
        });
        this.redis.on('error', (error) => {
            this.logger.error(`Redis error: ${error.message}`);
            this.isRedisConnected = false;
        });
    }
    createQueue(name) {
        if (this.queues.has(name)) {
            return this.queues.get(name);
        }
        if (!this.isRedisConnected) {
            this.logger.warn(`Redis not connected. Queue ${name} may not work properly.`);
        }
        const queue = new bullmq_1.Queue(name, {
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
    async addJob(queueName, data, options) {
        if (!this.isRedisConnected) {
            this.logger.error('Cannot add job: Redis not connected');
            return null;
        }
        try {
            const queue = this.createQueue(queueName);
            return await queue.add('job', data, options);
        }
        catch (error) {
            const err = error;
            this.logger.error(`Failed to add job to queue ${queueName}: ${err.message}`);
            return null;
        }
    }
    createWorker(queueName, processor) {
        if (this.workers.has(queueName)) {
            return this.workers.get(queueName);
        }
        if (!this.isRedisConnected) {
            this.logger.warn(`Redis not connected. Worker for ${queueName} may not work properly.`);
        }
        const worker = new bullmq_1.Worker(queueName, processor, {
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
    async close() {
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
};
exports.QueueService = QueueService;
exports.QueueService = QueueService = QueueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [ioredis_1.default])
], QueueService);
//# sourceMappingURL=queue.service.js.map