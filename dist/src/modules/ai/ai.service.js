"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = __importDefault(require("openai"));
const prisma_service_1 = require("../../database/prisma.service");
let AiService = AiService_1 = class AiService {
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
        this.logger = new common_1.Logger(AiService_1.name);
        this.useMock = true;
        // const apiKey = "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"
        // const apiKey = 'sk-abcdefabcdefabcdefabcdefabcdefabcdef12'
        const apiKey = "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";
        this.useMock = !apiKey || apiKey.includes('your_') || apiKey.includes('dummy');
        if (!this.useMock) {
            this.openai = new openai_1.default({
                apiKey: apiKey,
            });
        }
        else {
            this.logger.warn('Using MOCK AI mode - no valid API key found');
        }
    }
    async generateReply(message, conversationId) {
        try {
            if (this.useMock) {
                return this.generateMockReply(message);
            }
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
                model: this.configService.get('OPENAI_MODEL') || 'gpt-4.1-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message },
                ],
                max_tokens: 500,
                temperature: 0.7,
            });
            return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
        }
        catch (error) {
            this.logger.error('Error generating AI reply', error);
            if (error?.status === 401) {
                this.logger.warn('OpenAI API key invalid - switching to MOCK mode');
                this.useMock = true;
                return this.generateMockReply(message);
            }
            return 'Sorry, I am having trouble processing your request. Please try again later.';
        }
    }
    generateMockReply(message) {
        const responses = {
            'hello': 'Hello! How can I help you today?',
            'hi': 'Hi there! Welcome to our support. How can I assist you?',
            'help': 'I\'m here to help! Please let me know what you need assistance with.',
            'price': 'Our pricing information is available on our website. Would you like me to connect you with a human agent for detailed pricing?',
            'hours': 'Our working hours are typically Monday-Friday 9AM-5PM. Is there something specific you need help with?',
            'thanks': 'You\'re welcome! Is there anything else I can help you with?',
            'bye': 'Goodbye! Feel free to reach out anytime you need assistance.',
        };
        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        return `Thank you for your message: "${message}". I'm currently in demo mode. A human agent will respond shortly. Alternatively, you can ask about: hello, help, price, hours, etc.`;
    }
    async generateReplyWithContext(message, conversationId, customContext) {
        const baseReply = await this.generateReply(message, conversationId);
        if (customContext) {
            if (this.useMock) {
                return `Based on: ${customContext}\n\n${baseReply}`;
            }
            try {
                const enhancedPrompt = `Based on this context: ${customContext}\n\nProvide a response to: ${message}`;
                const completion = await this.openai.chat.completions.create({
                    model: this.configService.get('OPENAI_MODEL') || 'gpt-4.1-mini',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: enhancedPrompt },
                    ],
                });
                return completion.choices[0]?.message?.content || baseReply;
            }
            catch (error) {
                return baseReply;
            }
        }
        return baseReply;
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], AiService);
//# sourceMappingURL=ai.service.js.map