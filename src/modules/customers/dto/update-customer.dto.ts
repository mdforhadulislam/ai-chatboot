import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateCustomerDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  facebookId?: string;

  @IsString()
  @IsOptional()
  instagramId?: string;

  @IsString()
  @IsOptional()
  whatsappId?: string;
}