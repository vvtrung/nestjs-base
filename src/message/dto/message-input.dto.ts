import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, IsString } from 'class-validator';

@InputType()
export class MessageInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly text: string;
}
