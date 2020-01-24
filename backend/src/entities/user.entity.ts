import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserInterface } from './../models/user.interface';
import { FormEntity } from './form.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(type => FormEntity, form => form.user)
  forms: FormEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserInterface {
    const { id, created, email, token, updated } = this;
    const responseObject: UserInterface = {
      id,
      email,
      created,
      updated,
    };

    // if (this.ideas) {
    //   responseObject.ideas = this.ideas;
    // }

    // if (this.bookmarks) {
    //   responseObject.bookmarks = this.bookmarks;
    // }

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, email } = this;

    return jwt.sign(
      {
        id,
        email,
      },
      process.env.SECRET,
      { expiresIn: '1d' },
    );
  }
}
