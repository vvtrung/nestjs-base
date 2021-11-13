import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

import { CreateUserInput, UpdateUserInput } from './dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
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
