import { Exclude } from 'class-transformer';
import { RegisterDto } from './register.dto';

export class LoginDto extends RegisterDto {
  @Exclude()
  name: string;
}
