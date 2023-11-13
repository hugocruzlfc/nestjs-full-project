import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private breedsRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    try {
      const breed = await this.breedsRepository.findOneBy({
        name: createCatDto.breed,
      });

      if (!breed) {
        return new HttpException('Breed not found', HttpStatus.NOT_FOUND);
      }

      const cat = this.catsRepository.create({
        ...createCatDto,
        breed,
      });

      return this.catsRepository.save(cat);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return this.catsRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const catFindOne = await this.catsRepository.findOne({
        where: {
          id,
        },
      });

      if (!catFindOne) {
        return new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }

      return catFindOne;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    try {
      const existingCat = await this.catsRepository.findOne({
        where: {
          id,
        },
      });

      if (!existingCat) {
        return new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }

      const breed = await this.breedsRepository.findOne({
        where: {
          name: updateCatDto.breed,
        },
      });

      if (!breed) {
        return new HttpException('Breed not found', HttpStatus.NOT_FOUND);
      }

      const responseUpdate = await this.catsRepository.update(
        { id },
        { ...existingCat, ...updateCatDto, breed },
      );

      if (responseUpdate.affected === 0) {
        return new HttpException('Cat not updated', HttpStatus.NOT_MODIFIED);
      }

      existingCat.breed = breed;
      return existingCat;

      // const updatedCat = await this.catsRepository.save({
      //   ...existingCat,
      //   ...updateCatDto,
      // });

      // const updatedCat = await this.catsRepository.update(
      //   { id },
      //   { ...existingCat, ...updateCatDto },
      // );

      // return updatedCat;
    } catch (error) {}
  }

  async delete(id: number) {
    try {
      const existingCat = await this.catsRepository.findOne({
        where: {
          id,
        },
      });

      if (!existingCat) {
        return new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }

      await this.catsRepository.softDelete({ id }); // se le pasa el id para que lo busque y lo elimine
      //this.catsRepository.softRemove(existingCat); // se le pasa el objeto o instancia para que lo elimine

      return existingCat;
    } catch (error) {
      throw new Error(error);
    }
  }
}
