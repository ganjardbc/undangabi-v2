import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGuestCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  color?: string;
}
