"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("./config/swagger.config");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
function setupSwagger(app) {
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_config_1.swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document, swagger_config_1.swaggerOptions);
}
function setupCors(app, configService) {
    const allowedOrigins = configService.get('CORS_ORIGINS')?.split(',') || '*';
    app.enableCors({
        origin: allowedOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: 'Authorization,Content-Type,Accept',
    });
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    setupCors(app, configService);
    setupSwagger(app);
    const port = configService.get('PORT') || 5000;
    await app.listen(port);
    console.log(`Application running on: http://localhost:${port}/api/v1`);
    console.log(`Swagger docs: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map