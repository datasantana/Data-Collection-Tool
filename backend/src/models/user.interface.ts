export interface UserInterface {
  id: number;
  email: string;
  created: Date;
  updated: Date;
  password?: string;
  token?: string;
}
