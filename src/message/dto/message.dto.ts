import { ObjectType, Field } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

import { BaseDTO } from 'common/dto/base.dto';
import { UserDTO } from 'users/dto';

@ObjectType()
export class MessageDTO extends BaseDTO {
  @Field()
  @Expose()
  readonly text: string;

  @Field()
  @Expose()
  readonly user: UserDTO;
}
