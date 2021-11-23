import { plainToClass } from 'class-transformer';
import { GraphQLError } from 'graphql';

import { ErrorDTO } from 'common/dto/error.dto';

export const formatError = (error: GraphQLError): any => {
  const errorResponse = error?.extensions?.exception?.response;

  if (errorResponse) {
    return errorResponse;
  }

  return plainToClass(ErrorDTO, { message: 'something went wrong!' });
};
