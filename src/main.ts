import { NestFactory } from '@nestjs/core';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerOptions } from './config/swagger.config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

function setupSwagger(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, swaggerOptions);
}

function setupCors(app: INestApplication, configService: ConfigService) {
  const allowedOrigins = configService.get<string>('CORS_ORIGINS')?.split(',') || '*';
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Authorization,Content-Type,Accept',
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  setupCors(app, configService);
  setupSwagger(app);

  const port = configService.get<number>('PORT') || 5000;

  await app.listen(port);
  console.log(`Application running on: http://localhost:${port}/api/v1`);
  console.log(`Swagger docs: http://localhost:${port}/api/docs`);
}
bootstrap();