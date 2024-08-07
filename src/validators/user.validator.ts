import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { OrderEnum } from "../enums/order.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";

export class UserValidator {
  private static name = joi.string().min(3).trim();
  private static age = joi.number().min(15).max(50);
  private static email = joi
    .string()
    .lowercase()
    .regex(regexConstant.EMAIL)
    .trim();
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();
  private static phone = joi.string().regex(regexConstant.PHONE).trim();

  public static createUser = joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone.required(),
  });

  public static updateUser = joi.object({
    name: this.name,
    age: this.age,
    email: this.email,
    phone: this.phone,
  });

  public static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  public static forgotPassword = joi.object({
    email: this.email.required(),
  });

  public static forgotPasswordSet = joi.object({
    password: this.password.required(),
  });

  public static changePassword = joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });

  public static listQuery = joi.object({
    limit: joi.number().min(1).max(100).default(10),
    page: joi.number().min(1).default(1),
    search: joi.string().trim(),
    order: joi
      .string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.ASC),
    orderBy: joi
      .string()
      .valid(...Object.values(UserListOrderByEnum))
      .default(UserListOrderByEnum.NAME),
  });
}
