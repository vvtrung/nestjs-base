import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'users/user.entity';
import { MessageInput } from './dto/message-input.dto';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
  ) {}

  async findAll(): Promise<MessageEntity[]> {
    return this.messageRepo
      .createQueryBuilder()
      .innerJoinAndSelect('MessageEntity.user', 'UserEntity')
      .getMany();
  }

  async create(
    messageInput: MessageInput,
    currentUser: UserEntity,
  ): Promise<MessageEntity> {
    const message = this.messageRepo.create({
      ...messageInput,
      user: currentUser,
    });

    return this.messageRepo.save(message);
  }
}
