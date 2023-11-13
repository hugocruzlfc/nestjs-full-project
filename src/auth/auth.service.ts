import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const existsUser = await this.usersService.findByEmail(loginDto.email);
      if (!existsUser) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const isMatch = await bcryptjs.compare(
        loginDto.password,
        existsUser.password,
      );

      if (!isMatch) {
        return new HttpException(
          'Invalid credentials',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload = {
        email: existsUser.email,
      };

      const token = await this.jwtService.signAsync(payload);

      return {
        token,
        user: existsUser,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }
}
