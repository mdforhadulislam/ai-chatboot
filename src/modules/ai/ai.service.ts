import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateReply(message: string, conversationId: string): Promise<string> {
    try {
      const knowledgeBase = await this.prisma.knowledgeBase.findMany({
        where: { isActive: true },
        orderBy: { priority: 'desc' },
      });

      const context = knowledgeBase
        .map((kb) => `Q: ${kb.question}\nA: ${kb.answer}`)
        .join('\n\n');

      const conversation = await this.prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          customer: true,
        },
      });

      const businessSettings = await this.prisma.businessSettings.findFirst();

      const conversationHistory = conversation?.messages
        .reverse()
        .map((msg) => `${msg.direction === 'inbound' ? 'Customer' : 'Agent'}: ${msg.content}`)
        .join('\n');

      const systemPrompt = `You are a helpful customer support assistant for ${businessSettings?.businessName || 'our business'}.
${businessSettings?.businessName ? `Business Name: ${businessSettings.businessName}` : ''}
${businessSettings?.workingHours ? `Working Hours: ${businessSettings.workingHours}` : ''}

Use this knowledge base to answer customer questions:
${context}

Conversation history:
${conversationHistory || 'No previous messages'}

Customer info:
- Name: ${conversation?.customer?.name || 'Unknown'}
- Channel: ${conversation?.channel || 'Unknown'}

Provide concise, helpful, and context-aware responses. If you don't know the answer, politely say so and offer to connect to a human agent.`;

      const completion = await this.openai.chat.completions.create({
        model: this.configService.get<string>('OPENAI_MODEL') || 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      this.logger.error('Error generating AI reply', error);
      return 'Sorry, I am having trouble processing your request. Please try again later.';
    }
  }

  async generateReplyWithContext(message: string, conversationId: string, customContext?: string): Promise<string> {
    const baseReply = await this.generateReply(message, conversationId);

    if (customContext) {
      const enhancedPrompt = `Based on this context: ${customContext}\n\nProvide a response to: ${message}`;

      const completion = await this.openai.chat.completions.create({
        model: this.configService.get<string>('OPENAI_MODEL') || 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: enhancedPrompt },
        ],
      });

      return completion.choices[0]?.message?.content || baseReply;
    }

    return baseReply;
  }
}
