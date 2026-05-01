import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    private configService;
    server: Server;
    private readonly logger;
    private userSockets;
    constructor(jwtService: JwtService, configService: ConfigService);
    afterInit(): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinConversation(client: Socket, conversationId: string): {
        event: string;
        conversationId: string;
    };
    handleLeaveConversation(client: Socket, conversationId: string): {
        event: string;
        conversationId: string;
    };
    handleSendMessage(client: Socket, data: {
        conversationId: string;
        content: string;
        senderId: string;
    }): {
        event: string;
        data: {
            conversationId: string;
            content: string;
            senderId: string;
        };
    };
    handleTypingStart(client: Socket, data: {
        conversationId: string;
        userId: string;
    }): void;
    handleTypingStop(client: Socket, data: {
        conversationId: string;
        userId: string;
    }): void;
    sendMessageToConversation(conversationId: string, event: string, data: any): void;
    notifyUser(userId: string, event: string, data: any): void;
    getOnlineUsers(): string[];
}
