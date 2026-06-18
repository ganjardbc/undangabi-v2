import { IsOptional, IsString } from 'class-validator';

export class UpdateGuestCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  color?: string;
}
