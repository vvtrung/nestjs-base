import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'message/message.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

import { CreateUserInput, UpdateUserInput } from './dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
  ) {}

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepo.findOne(id);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOne({ email });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  async getLatestMessage(userId): Promise<MessageEntity> {
    return this.messageRepo
      .createQueryBuilder()
      .where('MessageEntity.userId = :userId', { userId })
      .orderBy({
        createdAt: 'DESC',
      })
      .getOne();
  }

  async create(userInput: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepo.create(userInput);

    return this.userRepo.save(user);
  }

  async update(id: number, userInput: UpdateUserInput): Promise<UserEntity> {
    return this.userRepo.save({ id, ...userInput });
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.findOne(id);

    if (!user) {
      throw new EntityNotFoundError(UserEntity.name, 'id');
    }

    await this.userRepo.remove(user);

    return user;
  }
}
