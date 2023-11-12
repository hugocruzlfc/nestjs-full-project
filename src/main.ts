import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unknown properties from DTOs
      transform: true, // transform incoming data to DTOs
      forbidNonWhitelisted: true, // throw an error if unknown properties are present
    }),
  );

  await app.listen(3000);
}
bootstrap();
