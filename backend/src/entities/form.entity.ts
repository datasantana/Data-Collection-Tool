import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { FieldEntity } from './field.entity';

@Entity('forms')
export class FormEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 20 })
  tableName: string;

  @Column('varchar', { length: 50 })
  name: string;

 @Column('varchar', { length: 255 })
 description: string;

  @Column('number')
  userId: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(
    type => UserEntity,
    user => user.forms,
  )
  user: UserEntity;

  @OneToMany(
    type => FieldEntity,
    field => field.form,
    { cascade: true },
  )
  fields: FieldEntity[];
}
