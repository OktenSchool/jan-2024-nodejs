import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  _id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: RoleEnum;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILogin extends Pick<IUser, "email" | "password"> {}

export interface IUserListQuery {
  limit?: number;
  page?: number;
  search?: string;
}

export interface IUserResponse
  extends Pick<
    IUser,
    | "_id"
    | "name"
    | "age"
    | "email"
    | "phone"
    | "avatar"
    | "role"
    | "isVerified"
    | "createdAt"
    | "updatedAt"
  > {}

export interface IUserResponseList extends IUserListQuery {
  data: IUserResponse[];
  total: number;
}
