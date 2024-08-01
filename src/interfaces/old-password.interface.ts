import { IUser } from "./user.interface";

export interface IOldPassword {
  _id?: string;
  password: string;
  _userId: string | IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
