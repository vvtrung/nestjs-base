import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { ErrorDTO } from '../dto/error.dto';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements GqlExceptionFilter {
  catch(exception: EntityNotFoundError, _host: ArgumentsHost) {
    // const graphContext = GqlExecutionContext.create(
    //   host as ExecutionContext,
    // ).getContext();

    const entity = exception.message.match(/(\w+)Entity/g)[0];
    const status = HttpStatus.NOT_FOUND;

    const error = plainToClass(ErrorDTO, {
      entity,
      message: 'Entity not found',
    });

    return new HttpException(error, status);
  }
}
