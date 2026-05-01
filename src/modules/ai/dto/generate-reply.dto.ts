import { IsString, IsOptional } from 'class-validator';

export class GenerateReplyDto {
  @IsString()
  message!: string;

  @IsString()
  @IsOptional()
  conversationId?: string;
}