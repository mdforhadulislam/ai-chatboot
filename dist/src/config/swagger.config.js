"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('INBOCART AI - Multi-Channel Chatbot API')
    .setDescription('API documentation for the multi-channel AI chatbot backend')
    .setVersion('1.0')
    .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
    in: 'header',
}, 'JWT-auth')
    .addTag('auth', 'Authentication endpoints')
    .addTag('dashboard', 'Dashboard analytics')
    .addTag('customers', 'Customer management')
    .addTag('conversations', 'Conversation management')
    .addTag('messages', 'Message handling')
    .addTag('ai', 'AI reply generation')
    .addTag('email', 'Email operations')
    .addTag('webhooks', 'Webhook endpoints')
    .addTag('business-settings', 'Business configuration')
    .build();
exports.swaggerOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    },
    customSiteTitle: 'INBOCART AI API Docs',
};
//# sourceMappingURL=swagger.config.js.map