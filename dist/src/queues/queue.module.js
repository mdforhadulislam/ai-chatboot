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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = void 0;
const common_1 = require("@nestjs/common");
const queue_service_1 = require("./queue.service");
const config_1 = require("@nestjs/config");
const ioredis_1 = require("ioredis");
let QueueModule = class QueueModule {
    constructor(redis) {
        this.redis = redis;
    }
    async onModuleDestroy() {
        if (this.redis) {
            await this.redis.quit();
        }
    }
};
exports.QueueModule = QueueModule;
exports.QueueModule = QueueModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            queue_service_1.QueueService,
            {
                provide: 'REDIS_CLIENT',
                useFactory: (config) => {
                    const redisUrl = config.get('REDIS_URL') || 'redis://localhost:6379';
                    const redis = new ioredis_1.Redis(redisUrl, {
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
                inject: [config_1.ConfigService],
            },
        ],
        exports: [queue_service_1.QueueService],
    }),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [ioredis_1.Redis])
], QueueModule);
//# sourceMappingURL=queue.module.js.map