import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';

import { ErrorDTO } from '../dto/error.dto';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements GqlExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const graphContext = GqlExecutionContext.create(
      host as ExecutionContext,
    ).getContext();

    const status = HttpStatus.UNAUTHORIZED;

    const error = plainToClass(ErrorDTO, {
      message: exception.message,
    });

    return graphContext.req.res.status(status).json(error);
  }
}
