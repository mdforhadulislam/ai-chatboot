import { plainToInstance, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

class EnvValidation {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  PORT?: number;

  @IsString()
  @IsOptional()
  DATABASE_URL?: string;

  @IsString()
  @IsOptional()
  JWT_SECRET?: string;

  @IsString()
  @IsOptional()
  JWT_EXPIRES_IN?: string;

  @IsString()
  @IsOptional()
  OPENAI_API_KEY?: string;

  @IsString()
  @IsOptional()
  OPENAI_MODEL?: string;

  @IsString()
  @IsOptional()
  META_VERIFY_TOKEN?: string;

  @IsString()
  @IsOptional()
  META_PAGE_ACCESS_TOKEN?: string;

  @IsString()
  @IsOptional()
  WHATSAPP_VERIFY_TOKEN?: string;

  @IsString()
  @IsOptional()
  WHATSAPP_ACCESS_TOKEN?: string;

  @IsString()
  @IsOptional()
  WHATSAPP_PHONE_NUMBER_ID?: string;

  @IsString()
  @IsOptional()
  RESEND_API_KEY?: string;

  @IsString()
  @IsOptional()
  EMAIL_FROM?: string;

  @IsString()
  @IsOptional()
  REDIS_URL?: string;

  @IsString()
  @IsOptional()
  FRONTEND_URL?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  THROTTLE_TTL?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  THROTTLE_LIMIT?: number;

  @IsString()
  @IsOptional()
  CORS_ORIGINS?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvValidation, config, { excludeExtraneousValues: true });
  const errors = validateSync(validatedConfig, { whitelist: true });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}