import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { FormEntity } from './form.entity';
import { DataTypeEntity } from './data-type.entity';

@Entity('fields')
export class FieldEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 50 })
  label: string;

  @Column('varchar', { length: 50 })
  columnName: string;

  @Column('number')
  formId: number;

  @Column('number')
  datatypeId: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(
    type => FormEntity,
    form => form.fields,
  )
  form: FormEntity;

  @ManyToOne(
    type => DataTypeEntity,
    datatype => datatype.fields,
  )
  datatype: DataTypeEntity;
}
