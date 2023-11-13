import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateBreedDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  description?: string;
}
