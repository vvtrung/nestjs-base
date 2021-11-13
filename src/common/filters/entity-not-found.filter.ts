import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { ErrorDTO } from '../dto/error.dto';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements GqlExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const graphContext = GqlExecutionContext.create(
      host as ExecutionContext,
    ).getContext();

    const entity = exception.message.match(/(\w+)Entity/g)[0];
    const status = HttpStatus.NOT_FOUND;

    const error = plainToClass(ErrorDTO, {
      entity,
      message: 'Entity not found',
    });

    return graphContext.req.res.status(status).json(error);
  }
}
