import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
import { SendEmailDto } from './dto/send-email.dto';
export declare class EmailService {
    private readonly configService;
    private readonly prisma;
    private readonly logger;
    private resend;
    constructor(configService: ConfigService, prisma: PrismaService);
    sendEmail(sendEmailDto: SendEmailDto): Promise<any>;
    parseInboundEmail(emailData: any): Promise<void>;
    getEmailThread(email: string): Promise<any>;
    private findConversationByEmail;
    private createConversationForEmail;
    private stripHtml;
}
