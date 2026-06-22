import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubmitGuestbookDto {
  @IsString()
  @IsNotEmpty()
  guest_token!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
