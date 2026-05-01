import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(sendEmailDto: SendEmailDto): Promise<any>;
    receiveInbound(emailData: any, req: any): Promise<{
        status: string;
    }>;
    getEmailThread(email: string): Promise<any>;
}
