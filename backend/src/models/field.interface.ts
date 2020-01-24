import { FormInterface } from './form.interface';
import { DataTypeInterface } from './data-type.interface';

export interface FieldInterface {
  id: number;
  label: string;
  columnName: string;
  created: Date;
  updated: Date;
  form: FormInterface;
  datatype: DataTypeInterface;
}
