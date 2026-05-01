import { Injectable } from '@nestjs/common';

@Injectable()
export class InboundEmailParserService {
  parse(rawEmail: any) {
    return {
      from: rawEmail.from,
      to: rawEmail.to,
      subject: rawEmail.subject,
      text: rawEmail.text,
      html: rawEmail.html,
    };
  }
}