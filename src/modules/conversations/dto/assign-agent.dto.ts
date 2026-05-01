import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AssignAgentDto {
  @IsString()
  @IsNotEmpty()
  agentId!: string;
}

export class HandoffRequestDto {
  @IsOptional()
  @IsString()
  reason?: string;
}
