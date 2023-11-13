import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  login(loginDto: LoginDto) {
    return this.usersService.findByEmail(loginDto.email);
  }

  register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }
}
