import { Field, InterfaceType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@InterfaceType()
export abstract class BaseDTO {
  @Field()
  @Expose()
  readonly id: number;

  @Field()
  @Expose()
  readonly updatedAt: Date;

  @Field()
  @Expose()
  readonly createdAt: Date;
}
