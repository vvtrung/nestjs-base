import { ObjectType, Field } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class AuthTokenDTO {
  @Field()
  @Expose()
  readonly accessToken: string;
}
