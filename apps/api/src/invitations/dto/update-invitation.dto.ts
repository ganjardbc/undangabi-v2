import { IsEnum, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { EventType } from '@prisma/client';

export class UpdateInvitationDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsEnum(EventType)
  @IsOptional()
  event_type?: EventType;

  @IsUUID()
  @IsOptional()
  theme_id?: string;

  @IsString()
  @IsOptional()
  cover_image_url?: string;

  @IsString()
  @IsOptional()
  music_url?: string;

  @IsString()
  @IsOptional()
  youtube_url?: string;

  @IsString()
  @IsOptional()
  story?: string;

  @IsString()
  @IsOptional()
  seo_title?: string;

  @IsString()
  @IsOptional()
  seo_description?: string;

  @IsString()
  @IsOptional()
  og_image_url?: string;

  @IsObject()
  @IsOptional()
  theme_config?: Record<string, unknown>;

  @IsObject()
  @IsOptional()
  section_visibility?: Record<string, unknown>;
}
