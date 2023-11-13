import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;
}
