import { IsEmail, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateGuestDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUUID()
  @IsOptional()
  category_id?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  max_guest_count?: number;
}
