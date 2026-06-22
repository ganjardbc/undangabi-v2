import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { AttendanceStatus } from '@prisma/client';

export class SubmitRsvpDto {
  @IsString()
  @IsNotEmpty()
  guest_token!: string;

  @IsEnum(AttendanceStatus)
  attendance_status!: AttendanceStatus;

  @IsInt()
  @Min(1)
  @IsOptional()
  guest_count?: number;

  @IsString()
  @IsOptional()
  message?: string;
}
