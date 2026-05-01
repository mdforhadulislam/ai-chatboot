import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './config.object';
import { validate } from './env.validation';

export const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
  validate,
});