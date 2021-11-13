import { ObjectType, Field } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class BaseDTO {
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
