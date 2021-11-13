import { BeforeInsert, Column, Entity } from 'typeorm';
import { compare, hash } from 'bcrypt';

import { BaseEntity } from 'common/entity/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}
