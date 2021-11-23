import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from 'common/entity/base.entity';
import { UserEntity } from 'users/user.entity';

@Entity('messages')
export class MessageEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.messages, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column()
  text: string;
}
