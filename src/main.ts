import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import {
  UnprocessableExceptionFilter,
  EntityNotFoundExceptionFilter,
  BadRequestExceptionFilter,
  UnauthorizedExceptionFilter,
} from 'common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.useGlobalGuards();
  app.useGlobalInterceptors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );
  app.useGlobalFilters(
    new UnprocessableExceptionFilter(),
    new EntityNotFoundExceptionFilter(),
    new BadRequestExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );
  await app.listen(3000);
}
bootstrap();
