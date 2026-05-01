import { Controller, Post, Body, UseGuards, Get, Param, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('email')
@Controller('email')
@UsePipes(new ValidationPipe({ transform: true }))
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Send an email' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return await this.emailService.sendEmail(sendEmailDto);
  }

  @Post('inbound')
  @Public()
  @ApiOperation({ summary: 'Receive inbound email (webhook from Resend)' })
  @ApiResponse({ status: 200, description: 'Email processed' })
  async receiveInbound(@Body() emailData: any, @Req() req: any) {
    await this.emailService.parseInboundEmail(emailData);
    return { status: 'processed' };
  }

  @Get('thread/:email')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get email thread by email address' })
  @ApiResponse({ status: 200, description: 'Email thread retrieved' })
  async getEmailThread(@Param('email') email: string) {
    return await this.emailService.getEmailThread(email);
  }
}

