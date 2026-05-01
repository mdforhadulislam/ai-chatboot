"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const knowledgeBaseData = [
    {
        question: 'What are your working hours?',
        answer: 'We are open from 9 AM to 6 PM, Monday to Saturday.',
        category: 'General',
        priority: 1,
    },
    {
        question: 'How can I track my order?',
        answer: 'You can track your order using the tracking link sent to your email or contact our support.',
        category: 'Orders',
        priority: 1,
    },
    {
        question: 'What is your return policy?',
        answer: 'We accept returns within 7 days of delivery. Items must be unused and in original packaging.',
        category: 'Returns',
        priority: 1,
    },
    {
        question: 'Do you offer cash on delivery?',
        answer: 'Yes, we offer cash on delivery for orders within Dhaka. Outside Dhaka, full payment is required in advance.',
        category: 'Payment',
        priority: 2,
    },
    {
        question: 'How long does delivery take?',
        answer: 'Within Dhaka: 1-2 business days. Outside Dhaka: 2-4 business days.',
        category: 'Delivery',
        priority: 1,
    },
];
async function seedKnowledgeBase() {
    await prisma.knowledgeBase.deleteMany({});
    await prisma.knowledgeBase.createMany({
        data: knowledgeBaseData,
    });
    console.log('Knowledge base seeded with', knowledgeBaseData.length, 'entries');
    await prisma.$disconnect();
}
seedKnowledgeBase().catch((error) => {
    console.error('Error seeding knowledge base:', error);
    process.exit(1);
});
//# sourceMappingURL=seed-knowledge-base.js.map