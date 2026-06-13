import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { EventType } from '@prisma/client';

export class CreateInvitationDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsEnum(EventType)
  @IsOptional()
  event_type?: EventType;

  @IsUUID()
  @IsOptional()
  theme_id?: string;
}
