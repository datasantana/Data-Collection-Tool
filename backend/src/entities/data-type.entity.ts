import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { FieldEntity } from './field.entity';

@Entity('datatypes')
export class DataTypeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 50, unique: true })
  name: string;

  @Column('varchar', { length: 50, unique: true })
  label: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(
    type => FieldEntity,
    field => field.datatype,
    { cascade: false },
  )
  fields: FieldEntity[];
}
