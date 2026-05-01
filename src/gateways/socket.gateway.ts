import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;
  private readonly logger = new Logger(SocketGateway.name);
  private userSockets: Map<string, string> = new Map(); // userId -> socketId

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  afterInit() {
    this.logger.log('Socket Gateway Initialized');
  }

  async handleConnection(client: Socket) {
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
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      client.data.user = payload;
      this.userSockets.set(payload.sub, client.id);

      this.logger.log(`Client connected: ${client.id}, User: ${payload.sub}`);
    } catch (error) {
      this.logger.error(`Connection error for client ${client.id}:`, (error as Error).message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data?.user?.sub;
    if (userId) {
      this.userSockets.delete(userId);
    }
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_conversation')
  handleJoinConversation(client: Socket, conversationId: string) {
    client.join(`conversation_${conversationId}`);
    this.logger.log(`Client ${client.id} joined conversation ${conversationId}`);
    return { event: 'joined', conversationId };
  }

  @SubscribeMessage('leave_conversation')
  handleLeaveConversation(client: Socket, conversationId: string) {
    client.leave(`conversation_${conversationId}`);
    this.logger.log(`Client ${client.id} left conversation ${conversationId}`);
    return { event: 'left', conversationId };
  }

  @SubscribeMessage('send_message')
  handleSendMessage(client: Socket, data: { conversationId: string; content: string; senderId: string }) {
    this.logger.log(`Message from ${data.senderId} in conversation ${data.conversationId}`);
    this.server.to(`conversation_${data.conversationId}`).emit('new_message', data);
    return { event: 'message_sent', data };
  }

  @SubscribeMessage('typing_start')
  handleTypingStart(client: Socket, data: { conversationId: string; userId: string }) {
    client.to(`conversation_${data.conversationId}`).emit('user_typing', {
      userId: data.userId,
      isTyping: true,
    });
  }

  @SubscribeMessage('typing_stop')
  handleTypingStop(client: Socket, data: { conversationId: string; userId: string }) {
    client.to(`conversation_${data.conversationId}`).emit('user_typing', {
      userId: data.userId,
      isTyping: false,
    });
  }

  sendMessageToConversation(conversationId: string, event: string, data: any) {
    this.server.to(`conversation_${conversationId}`).emit(event, data);
  }

  notifyUser(userId: string, event: string, data: any) {
    const socketId = this.userSockets.get(userId);
    if (socketId) {
      this.server.to(socketId).emit(event, data);
    }
  }

  getOnlineUsers(): string[] {
    return Array.from(this.userSockets.keys());
  }
}
