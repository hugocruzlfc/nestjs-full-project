import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userAlreadyExists = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });

      if (userAlreadyExists) {
        return new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const user = this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userFounded = await this.userRepository.findOne({
        where: { id },
      });

      if (!userFounded) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const result = await this.userRepository.update(id, updateUserDto);

      if (result.affected === 0) {
        return new HttpException('User not updated', HttpStatus.BAD_REQUEST);
      }

      const userUpdated = {
        ...userFounded,
        ...updateUserDto,
      };

      return userUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
