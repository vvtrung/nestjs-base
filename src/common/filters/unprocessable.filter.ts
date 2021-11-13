import {
  ExecutionContext,
  Catch,
  ArgumentsHost,
  UnprocessableEntityException,
  ExceptionFilter,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { isEmpty } from 'lodash';

import { ErrorDTO } from '../dto/error.dto';

@Catch(UnprocessableEntityException)
export class UnprocessableExceptionFilter
  implements ExceptionFilter<UnprocessableEntityException>
{
  catch(exception: UnprocessableEntityException, host: ArgumentsHost): void {
    const graphContext = GqlExecutionContext.create(
      host as ExecutionContext,
    ).getContext();

    const statusCode = exception.getStatus();
    const r = exception.getResponse() as { message: ValidationError[] };

    const validationErrors = r.message;
    const errros = this.validationFilter(validationErrors);

    return graphContext.req.res.status(statusCode).json(errros);
  }

  private validationFilter(validationErrors: ValidationError[]): ErrorDTO[] {
    const errors = [];
    for (const validationError of validationErrors) {
      const children = validationError.children;

      if (children && !isEmpty(children)) {
        errors.push(...this.validationFilter(children));

        return;
      }

      const constraints = validationError.constraints;
      const errorType = Object.keys(constraints)[0];
      const property = validationError.property;
      const message = validationError.constraints[errorType];

      errors.push(plainToClass(ErrorDTO, { property, message }));
    }
    return errors;
  }
}
