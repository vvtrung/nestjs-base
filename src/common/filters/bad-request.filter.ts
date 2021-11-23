import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';

import { ErrorDTO } from '../dto/error.dto';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements GqlExceptionFilter {
  catch(exception: BadRequestException, _host: ArgumentsHost) {
    // const graphContext = GqlExecutionContext.create(
    //   host as ExecutionContext,
    // ).getContext();

    const status = HttpStatus.BAD_REQUEST;

    const error = plainToClass(ErrorDTO, {
      message: exception.message,
    });

    return new HttpException(error, status);
  }
}
