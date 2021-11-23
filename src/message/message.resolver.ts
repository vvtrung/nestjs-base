import { Inject, UseGuards } from '@nestjs/common';
import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { Args, Mutation } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { PubSub } from 'graphql-subscriptions';

import { CurrentUser } from 'common/decorator';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guard';
import { UserEntity } from 'users/user.entity';
import { MessageInput } from './dto/message-input.dto';
import { MessageDTO } from './dto/message.dto';
import { MessageService } from './message.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class MessageResolver {
  constructor(
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
    private readonly messageService: MessageService,
  ) {}

  @Query(() => [MessageDTO], { description: 'get messages' })
  async messages(): Promise<MessageDTO[]> {
    const messages = await this.messageService.findAll();

    return plainToClass(MessageDTO, messages);
  }

  @Mutation(() => MessageDTO)
  async createMessage(
    @Args('message') createMessageDTO: MessageInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<MessageDTO> {
    const message = await this.messageService.create(
      createMessageDTO,
      currentUser,
    );

    this.pubSub.publish('messageAdded', message);

    return plainToClass(MessageDTO, message);
  }

  @Subscription(() => MessageDTO, {
    resolve: (value) => plainToClass(MessageDTO, value),
  })
  async messageAdded() {
    return this.pubSub.asyncIterator('messageAdded');
  }
}
