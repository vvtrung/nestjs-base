import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  MaxLength,
  IsString,
  IsEmail,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly lastName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  readonly password: string;
}
