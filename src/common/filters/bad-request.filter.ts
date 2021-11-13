import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';

import { ErrorDTO } from '../dto/error.dto';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements GqlExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const graphContext = GqlExecutionContext.create(
      host as ExecutionContext,
    ).getContext();

    const status = HttpStatus.NOT_FOUND;

    const error = plainToClass(ErrorDTO, {
      message: exception.message,
    });

    return graphContext.req.res.status(status).json(error);
  }
}
