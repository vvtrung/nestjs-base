import { ObjectType, Field } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

import { BaseDTO } from 'common/dto/base.dto';

@ObjectType()
export class UserDTO extends BaseDTO {
  @Field()
  @Expose()
  readonly email: string;

  @Field({ nullable: true })
  @Expose()
  readonly firstName?: string;

  @Field({ nullable: true })
  @Expose()
  readonly lastName?: string;
}
