import { Expose } from 'class-transformer';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ErrorDTO {
  @Field({ nullable: true })
  @Expose()
  readonly entity: string = null;

  @Field({ nullable: true })
  @Expose()
  readonly property: string = null;

  @Field()
  @Expose()
  readonly message: string;
}
