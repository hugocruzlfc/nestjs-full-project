import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    try {
      const breed = this.breedRepository.create(createBreedDto);
      return this.breedRepository.save(breed);
    } catch (error) {
      return new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.breedRepository.find();
    } catch (error) {
      return new Error(error);
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} breed`;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    try {
      const existingBreed = await this.breedRepository.findOne({
        where: {
          id,
        },
      });

      if (!existingBreed) {
        return new Error('Breed not found');
      }

      return await this.breedRepository.save({
        ...existingBreed,
        ...updateBreedDto,
      });
    } catch (error) {
      return new Error(error);
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
