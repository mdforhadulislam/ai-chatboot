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
var SocketGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let SocketGateway = SocketGateway_1 = class SocketGateway {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(SocketGateway_1.name);
        this.userSockets = new Map(); // userId -> socketId
    }
    afterInit() {
        this.logger.log('Socket Gateway Initialized');
    }
    async handleConnection(client) {
        try {
            let token = client.handshake.auth?.token;
            if (!token) {
                const authHeader = client.handshake.headers?.authorization;
                if (authHeader && authHeader.startsWith('Bearer ')) {
                    token = authHeader.split(' ')[1];
                }
            }
            if (!token) {
                this.logger.warn(`Client ${client.id} disconnected: No token provided`);
                client.disconnect();
                return;
            }
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            client.data.user = payload;
            this.userSockets.set(payload.sub, client.id);
            this.logger.log(`Client connected: ${client.id}, User: ${payload.sub}`);
        }
        catch (error) {
            this.logger.error(`Connection error for client ${client.id}:`, error.message);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const userId = client.data?.user?.sub;
        if (userId) {
            this.userSockets.delete(userId);
        }
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoinConversation(client, conversationId) {
        client.join(`conversation_${conversationId}`);
        this.logger.log(`Client ${client.id} joined conversation ${conversationId}`);
        return { event: 'joined', conversationId };
    }
    handleLeaveConversation(client, conversationId) {
        client.leave(`conversation_${conversationId}`);
        this.logger.log(`Client ${client.id} left conversation ${conversationId}`);
        return { event: 'left', conversationId };
    }
    handleSendMessage(client, data) {
        this.logger.log(`Message from ${data.senderId} in conversation ${data.conversationId}`);
        this.server.to(`conversation_${data.conversationId}`).emit('new_message', data);
        return { event: 'message_sent', data };
    }
    handleTypingStart(client, data) {
        client.to(`conversation_${data.conversationId}`).emit('user_typing', {
            userId: data.userId,
            isTyping: true,
        });
    }
    handleTypingStop(client, data) {
        client.to(`conversation_${data.conversationId}`).emit('user_typing', {
            userId: data.userId,
            isTyping: false,
        });
    }
    sendMessageToConversation(conversationId, event, data) {
        this.server.to(`conversation_${conversationId}`).emit(event, data);
    }
    notifyUser(userId, event, data) {
        const socketId = this.userSockets.get(userId);
        if (socketId) {
            this.server.to(socketId).emit(event, data);
        }
    }
    getOnlineUsers() {
        return Array.from(this.userSockets.keys());
    }
};
exports.SocketGateway = SocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_conversation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleJoinConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave_conversation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleLeaveConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send_message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing_start'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleTypingStart", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing_stop'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleTypingStop", null);
exports.SocketGateway = SocketGateway = SocketGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
        transports: ['websocket', 'polling'],
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], SocketGateway);
//# sourceMappingURL=socket.gateway.js.map