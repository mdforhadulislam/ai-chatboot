import { PrismaService } from '../../database/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCustomerDto): Promise<{
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
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            conversations: {
                id: string;
                channel: string;
                createdAt: Date;
                updatedAt: Date;
                customerId: string;
                status: string;
                assignedTo: string | null;
                handoffTo: string | null;
                lastMessage: string | null;
            }[];
        } & {
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        conversations: ({
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
    } & {
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
    }>;
    update(id: string, dto: UpdateCustomerDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findByChannelIdentifier(channel: string, identifier: string): Promise<{
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
    } | null>;
}
