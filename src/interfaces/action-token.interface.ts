import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { IUser } from "./user.interface";

export interface IActionToken {
  _id?: string;
  actionToken: string;
  type: ActionTokenTypeEnum;
  _userId: string | IUser;
}

export interface IForgotSendEmail extends Pick<IUser, "email"> {}

export interface IForgotResetPassword extends Pick<IUser, "password"> {}
