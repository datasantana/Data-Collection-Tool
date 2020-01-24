import { UserInterface } from './user.interface';
export interface FormInterface {
  id: number;
  tableName: string;
  name: string;
  description: string;
  created: Date;
  updated: Date;
  user: UserInterface;
}
