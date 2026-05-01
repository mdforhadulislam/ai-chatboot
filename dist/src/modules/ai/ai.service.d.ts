import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
export declare class AiService {
    private configService;
    private prisma;
    private openai;
    private readonly logger;
    constructor(configService: ConfigService, prisma: PrismaService);
    generateReply(message: string, conversationId: string): Promise<string>;
    generateReplyWithContext(message: string, conversationId: string, customContext?: string): Promise<string>;
}
