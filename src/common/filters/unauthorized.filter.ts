import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';

import { ErrorDTO } from '../dto/error.dto';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements GqlExceptionFilter {
  catch(exception: UnauthorizedException, _host: ArgumentsHost) {
    // const graphContext = GqlExecutionContext.create(
    //   host as ExecutionContext,
    // ).getContext();

    const status = HttpStatus.UNAUTHORIZED;

    const error = plainToClass(ErrorDTO, {
      message: exception.message,
    });

    return new HttpException(error, status);
  }
}
