import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { ConfigModule } from '@nestjs/config';
import { Breed } from 'src/breeds/entities/breed.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Cat, Breed]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
