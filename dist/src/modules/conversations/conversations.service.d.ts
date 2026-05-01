import { PrismaService } from '../../database/prisma.service';
export declare class ConversationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(customerId: string, channel: string): Promise<{
        customer: {
            email: string | null;
            name: string | null;
            id: string;
            channel: string;
            createdAt: Date;
            phone: string | null;
            facebookId: string | null;
            instagramId: string | null;
            whatsappId: string | null;
            updatedAt: Date;
        };
        messages: {
            conversationId: string;
            id: string;
            content: string;
            direction: string;
            channel: string;
            senderId: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
        }[];
    } & {
        id: string;
        channel: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        status: string;
        assignedTo: string | null;
        handoffTo: string | null;
        lastMessage: string | null;
    }>;
    findAll(channel?: string, status?: string, agentId?: string, page?: number, limit?: number): Promise<{
        data: ({
            customer: {
                email: string | null;
                name: string | null;
                id: string;
                channel: string;
                createdAt: Date;
                phone: string | null;
                facebookId: string | null;
                instagramId: string | null;
                whatsappId: string | null;
                updatedAt: Date;
            };
            messages: {
                conversationId: string;
                id: string;
                content: string;
                direction: string;
                channel: string;
                senderId: string | null;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                createdAt: Date;
            }[];
        } & {
            id: string;
            channel: string;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            status: string;
            assignedTo: string | null;
            handoffTo: string | null;
            lastMessage: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        customer: {
            email: string | null;
            name: string | null;
            id: string;
            channel: string;
            createdAt: Date;
            phone: string | null;
            facebookId: string | null;
            instagramId: string | null;
            whatsappId: string | null;
            updatedAt: Date;
        };
        messages: {
            conversationId: string;
            id: string;
            content: string;
            direction: string;
            channel: string;
            senderId: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
        }[];
    } & {
        id: string;
        channel: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        status: string;
        assignedTo: string | null;
        handoffTo: string | null;
        lastMessage: string | null;
    }>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        channel: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        status: string;
        assignedTo: string | null;
        handoffTo: string | null;
        lastMessage: string | null;
    }>;
    findOrCreate(customerId: string, channel: string): Promise<{
        id: string;
        channel: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        status: string;
        assignedTo: string | null;
        handoffTo: string | null;
        lastMessage: string | null;
    }>;
    updateLastMessage(conversationId: string, message: string): Promise<{
        id: string;
        channel: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        status: string;
        assignedTo: string | null;
        handoffTo: string | null;
        lastMessage: string | null;
    }>;
    assignAgent(conversationId: string, agentId: string): Promise<{
        customer: {
            email: string | null;
            name: string | null;
            id: string;
            channel: string;
            createdAt: Date;
            phone: string | null;
            facebookId: string | null;
            instagramId: string | null;
            whatsappId: string | null;
            updatedAt: Date;
        };
        assignedAgent: {
            email: string;
            password: string;
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            resetToken: string | null;
            resetTokenExpiry: Date | null;
        } | null;
    } & {
        id: string;
        channel: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        status: string;
        assignedTo: string | null;
        handoffTo: string | null;
        lastMessage: string | null;
    }>;
    requestHandoff(conversationId: string, reason?: string): Promise<{
        customer: {
            email: string | null;
            name: string | null;
            id: string;
            channel: string;
            createdAt: Date;
            phone: string | null;
            facebookId: string | null;
            instagramId: string | null;
            whatsappId: string | null;
            updatedAt: Date;
        };
        messages: {
            conversationId: string;
            id: string;
            content: string;
            direction: string;
            channel: string;
            senderId: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
        }[];
    } & {
        id: string;
        channel: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        status: string;
        assignedTo: string | null;
        handoffTo: string | null;
        lastMessage: string | null;
    }>;
    getConversationsByAgent(agentId: string): Promise<({
        customer: {
            email: string | null;
            name: string | null;
            id: string;
            channel: string;
            createdAt: Date;
            phone: string | null;
            facebookId: string | null;
            instagramId: string | null;
            whatsappId: string | null;
            updatedAt: Date;
        };
        messages: {
            conversationId: string;
            id: string;
            content: string;
            direction: string;
            channel: string;
            senderId: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
        }[];
    } & {
        id: string;
        channel: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        status: string;
        assignedTo: string | null;
        handoffTo: string | null;
        lastMessage: string | null;
    })[]>;
}
