import { PrismaService } from '../../database/prisma.service';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(conversationId: string, content: string, direction: string, channel: string, senderId?: string, metadata?: any): Promise<{
        conversationId: string;
        id: string;
        content: string;
        direction: string;
        channel: string;
        senderId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
    }>;
    findByConversation(conversationId: string): Promise<{
        conversationId: string;
        id: string;
        content: string;
        direction: string;
        channel: string;
        senderId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
    }[]>;
    updateStatus(messageId: string, status: string): Promise<{
        conversationId: string;
        id: string;
        content: string;
        direction: string;
        channel: string;
        senderId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
    }>;
}
