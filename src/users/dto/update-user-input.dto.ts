import { InputType, OmitType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user-input.dto';

@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, ['password']) {}
