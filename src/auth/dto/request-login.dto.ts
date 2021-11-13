import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class RequestLoginDTO {
  @Field()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  readonly password: string;
}
