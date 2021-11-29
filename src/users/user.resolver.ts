import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { Int } from 'type-graphql';

import { UserDTO, CreateUserInput, UpdateUserInput } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guard';
import { MessageDTO } from 'message/dto/message.dto';

@Resolver(UserDTO)
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDTO, { description: 'get user' })
  async user(@Args('id', { type: () => Int }) id: number): Promise<UserDTO> {
    const user = await this.userService.findOne(id);

    return plainToClass(UserDTO, user);
  }

  @Query(() => [UserDTO], { description: 'get users' })
  async users(): Promise<UserDTO[]> {
    const users = await this.userService.findAll();

    return plainToClass(UserDTO, users);
  }

  @ResolveField(() => MessageDTO, { nullable: true })
  async latestMessage(@Parent() user: UserDTO): Promise<MessageDTO> {
    const latest = await this.userService.getLatestMessage(user.id);

    return plainToClass(MessageDTO, latest);
  }

  @Mutation(() => UserDTO)
  async createUser(@Args('user') userInput: CreateUserInput): Promise<UserDTO> {
    const user = await this.userService.create(userInput);

    return plainToClass(UserDTO, user);
  }

  @Mutation(() => UserDTO)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('user') userInput: UpdateUserInput,
  ): Promise<UserDTO> {
    const user = await this.userService.update(id, userInput);

    return plainToClass(UserDTO, user);
  }

  @Mutation(() => UserDTO)
  async removeUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserDTO> {
    const user = await this.userService.remove(id);

    return plainToClass(UserDTO, user);
  }
}
